import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Product name is required.")
    .max(100),

  sku: z
    .string()
    .trim()
    .min(2, "SKU is required.")
    .max(50),
});

export type ProductFormData = z.infer<
  typeof productSchema
>;