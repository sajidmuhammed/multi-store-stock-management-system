import { z } from "zod";

export const adjustStockSchema = z.object({

  productId: z.string().trim(),

  storeId: z.string().trim(),

  change: z
    .number()
    .refine((value) => value !== 0, {
      message: "Change cannot be zero.",
    }),

});

export const transferStockSchema = z.object({

  productId: z.string().trim(),

  sourceStoreId: z.string().trim(),

  destinationStoreId: z.string().trim(),

  quantity: z
    .number()
    .positive("Quantity must be greater than zero."),

}).refine(
  (data) =>
    data.sourceStoreId !== data.destinationStoreId,
  {
    message:
      "Source and destination store cannot be the same.",
    path: ["destinationStoreId"],
  }
);

export const inventoryQuerySchema = z.object({
  threshold: z
    .string()
    .optional()
    .transform((value) =>
      value ? Number(value) : undefined
    )
    .refine(
      (value) =>
        value === undefined ||
        (!Number.isNaN(value) && value >= 0),
      {
        message:
          "Threshold must be a non-negative number.",
      }
    ),
});

export type AdjustStockInput =
  z.infer<typeof adjustStockSchema>;

export type TransferStockInput =
  z.infer<typeof transferStockSchema>;

export type InventoryQuery =
  z.infer<typeof inventoryQuerySchema>;  

