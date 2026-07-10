import { Product } from "../product/product.model";
import { Store } from "../store/store.model";

import { Stock } from "./stock.model";

import { mapInventory } from "./inventory.mapper";

import {
  AdjustStockInput, TransferStockInput
} from "./inventory.validation";

import { AppError } from "../../shared/errors/app_error";

import { HTTP_STATUS } from "../../shared/constants/http_status";

import { ERROR_CODES } from "../../shared/constants/error_codes";

import { logger } from "../../shared/logger/logger";
import mongoose from "mongoose";

class InventoryService {

  async adjustStock(data: AdjustStockInput) {

    const product = await Product.exists({
      _id: data.productId,
    });

    if (!product) {
      throw new AppError(
        HTTP_STATUS.NOT_FOUND,
        "Product not found.",
        ERROR_CODES.PRODUCT_NOT_FOUND
      );
    }

    const store = await Store.exists({
      _id: data.storeId,
    });

    if (!store) {
      throw new AppError(
        HTTP_STATUS.NOT_FOUND,
        "Store not found.",
        ERROR_CODES.STORE_NOT_FOUND
      );
    }


    if (data.change > 0) {

      const stock = await Stock.findOneAndUpdate(
        {
          productId: data.productId,
          storeId: data.storeId,
        },
        {
          $inc: {
            quantity: data.change,
          },
        },
        {
          upsert: true,
          new: true,
          setDefaultsOnInsert: true,
        }
      );

      logger.info(
        `Stock adjusted +${data.change}`
      );

      return mapInventory(stock!);

    }


    const stock = await Stock.findOneAndUpdate(
      {
        productId: data.productId,
        storeId: data.storeId,

        quantity: {
          $gte: Math.abs(data.change),
        },
      },
      {
        $inc: {
          quantity: data.change,
        },
      },
      {
        new: true,
      }
    );

    if (!stock) {
      throw new AppError(
        HTTP_STATUS.BAD_REQUEST,
        "Insufficient stock.",
        ERROR_CODES.INSUFFICIENT_STOCK
      );
    }

    logger.info(
      `Stock adjusted ${data.change}`
    );

    return mapInventory(stock);

}

async transferStock(data: TransferStockInput) {

    const session = await mongoose.startSession();

    session.startTransaction();

    try {

        const product = await Product.exists({
            _id: data.productId,
        });

        if (!product) {
            throw new AppError(
                HTTP_STATUS.NOT_FOUND,
                "Product not found.",
                ERROR_CODES.PRODUCT_NOT_FOUND
            );
        }

        const sourceStore = await Store.exists({
            _id: data.sourceStoreId,
        });

        if (!sourceStore) {
            throw new AppError(
                HTTP_STATUS.NOT_FOUND,
                "Source store not found.",
                ERROR_CODES.STORE_NOT_FOUND
            );
        }

        const destinationStore = await Store.exists({
            _id: data.destinationStoreId,
        });

        if (!destinationStore) {
            throw new AppError(
                HTTP_STATUS.NOT_FOUND,
                "Destination store not found.",
                ERROR_CODES.STORE_NOT_FOUND
            );
        }

        const sourceStock =
            await Stock.findOneAndUpdate(

                {
                    productId: data.productId,

                    storeId: data.sourceStoreId,

                    quantity: {
                        $gte: data.quantity,
                    },
                },

                {
                    $inc: {
                        quantity: -data.quantity,
                    },
                },

                {
                    new: true,
                    session,
                }

            );

        if (!sourceStock) {

            throw new AppError(
                HTTP_STATUS.BAD_REQUEST,
                "Insufficient stock.",
                ERROR_CODES.INSUFFICIENT_STOCK
            );

        }

        await Stock.findOneAndUpdate(

            {
                productId: data.productId,

                storeId: data.destinationStoreId,
            },

            {
                $inc: {
                    quantity: data.quantity,
                },
            },

            {
                upsert: true,
                new: true,
                session,
                setDefaultsOnInsert: true,
            }

        );

        await session.commitTransaction();

        logger.info(
            `Transferred ${data.quantity} units`
        );

        return {
            transferredQuantity: data.quantity,
            productId: data.productId,
            sourceStoreId: data.sourceStoreId,
            destinationStoreId:
                data.destinationStoreId,
        };

    } catch (error) {

        await session.abortTransaction();

        throw error;

    } finally {

        session.endSession();

    }

}

async getInventory(
        threshold?: number
    ) {

        const filter: Record<string, unknown> = {};

        if (threshold !== undefined) {

            filter.quantity = {
                $lte: threshold,
            };

        }

        const inventory =
            await Stock.find(filter)

                .populate(
                    "productId",
                    "name sku"
                )

                .populate(
                    "storeId",
                    "name"
                )

                .sort({
                    quantity: 1,
                });

        return inventory.map((stock) => ({

            id: stock._id,

            quantity: stock.quantity,

            product: stock.productId,

            store: stock.storeId,

            createdAt: stock.createdAt,

            updatedAt: stock.updatedAt,

        }));

    }

}

export default new InventoryService();

