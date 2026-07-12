import { z } from "zod";

export const adjustStockSchema = z.object({
  productId: z
    .string()
    .min(1, "Please select a product."),

  storeId: z
    .string()
    .min(1, "Please select a store."),

  change: z
    .number({
      error: "Please enter a stock change.",
    })
    .int("Stock change must be a whole number.")
    .refine((value) => value !== 0, {
      message: "Change cannot be zero.",
    }),
});

export const transferStockSchema = z
  .object({
    productId: z
      .string()
      .min(1, "Please select a product."),

    sourceStoreId: z
      .string()
      .min(1, "Please select source store."),

    destinationStoreId: z
      .string()
      .min(1, "Please select destination store."),

    quantity: z
      .number({
        error: "Please enter quantity.",
      })
      .int("Quantity must be a whole number.")
      .positive("Quantity must be greater than zero."),
  })
  .refine(
    (data) =>
      data.sourceStoreId !== data.destinationStoreId,
    {
      path: ["destinationStoreId"],
      message:
        "Source and destination store cannot be the same.",
    }
  );

export type AdjustStockFormData = z.infer<
  typeof adjustStockSchema
>;

export type TransferStockFormData = z.infer<
  typeof transferStockSchema
>;