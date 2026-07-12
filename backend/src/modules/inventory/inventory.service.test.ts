import {
  describe,
  it,
  expect,
  beforeAll,
  afterAll,
  afterEach,
  jest,
} from "@jest/globals";

import mongoose from "mongoose";
import { MongoMemoryReplSet } from "mongodb-memory-server";

import { Product } from "../product/product.model";
import { Store } from "../store/store.model";
import { Stock } from "./stock.model";
import { ERROR_CODES } from "../../shared/constants/error_codes";
import inventoryService from "./inventory.service";

jest.setTimeout(60_000);

let replSet: MongoMemoryReplSet;

beforeAll(async () => {
  replSet = await MongoMemoryReplSet.create({
    replSet: { count: 1, storageEngine: "wiredTiger" },
  });
  await mongoose.connect(replSet.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await replSet.stop();
});

afterEach(async () => {
  await Promise.all([
    Product.deleteMany({}),
    Store.deleteMany({}),
    Stock.deleteMany({}),
  ]);
});

async function seedProductWithStock(initialQuantity: number) {
  const product = await Product.create({
    name: "Test Widget",
    sku: `SKU-${Date.now()}-${Math.random().toString(36).slice(2)}`,
  });
  const sourceStore = await Store.create({
    name: "Source Store",
    location: "Test Location A",
  });
  const destinationStore = await Store.create({
    name: "Destination Store",
    location: "Test Location B",
  });

  await Stock.create({
    productId: product._id,
    storeId: sourceStore._id,
    quantity: initialQuantity,
  });

  return {
    productId: product._id.toString(),
    sourceStoreId: sourceStore._id.toString(),
    destinationStoreId: destinationStore._id.toString(),
  };
}

describe("InventoryService", () => {
  it("does not let concurrent transfers push source quantity below zero", async () => {
    const { productId, sourceStoreId, destinationStoreId } =
      await seedProductWithStock(10);

    const attempts = Array.from({ length: 20 }, () =>
      inventoryService
        .transferStock({
          productId,
          sourceStoreId,
          destinationStoreId,
          quantity: 1,
        } as any)
        .then(() => "ok" as const)
        .catch((err) => {
          const isKnownRejection =
            err?.errorCode === ERROR_CODES.INSUFFICIENT_STOCK ||

            err?.errorLabels?.includes("TransientTransactionError") ||
            /Write conflict/i.test(err?.message ?? "");

          if (isKnownRejection) {
            return "rejected" as const;
          }
          throw err;
        })
    );

    const results = await Promise.all(attempts);
    const succeeded = results.filter((r) => r === "ok").length;
    const rejected = results.filter((r) => r === "rejected").length;

    expect(succeeded + rejected).toBe(20);

    const sourceStock = await Stock.findOne({ productId, storeId: sourceStoreId });
    const destinationStock = await Stock.findOne({ productId, storeId: destinationStoreId });

    expect(sourceStock!.quantity).toBeGreaterThanOrEqual(0);
    expect(sourceStock!.quantity).toBe(10 - succeeded);
    expect(destinationStock!.quantity).toBe(succeeded);
  });

  // 2. Correct end-to-end transfer
  it("transfers stock correctly from source to destination", async () => {
    const { productId, sourceStoreId, destinationStoreId } =
      await seedProductWithStock(50);

    const result = await inventoryService.transferStock({
      productId,
      sourceStoreId,
      destinationStoreId,
      quantity: 20,
    } as any);

    expect(result).toMatchObject({
      transferredQuantity: 20,
      productId,
      sourceStoreId,
      destinationStoreId,
    });

    const sourceStock = await Stock.findOne({ productId, storeId: sourceStoreId });
    const destinationStock = await Stock.findOne({ productId, storeId: destinationStoreId });

    expect(sourceStock!.quantity).toBe(30);
    expect(destinationStock!.quantity).toBe(20);
  });

  // 3. Rejects a transfer that exceeds available stock
  it("rejects a transfer that exceeds available stock", async () => {
    const { productId, sourceStoreId, destinationStoreId } =
      await seedProductWithStock(5);

    await expect(
      inventoryService.transferStock({
        productId,
        sourceStoreId,
        destinationStoreId,
        quantity: 6,
      } as any)
    ).rejects.toMatchObject({
      errorCode: ERROR_CODES.INSUFFICIENT_STOCK,
    });

    const sourceStock = await Stock.findOne({ productId, storeId: sourceStoreId });
    expect(sourceStock!.quantity).toBe(5);
  });
});