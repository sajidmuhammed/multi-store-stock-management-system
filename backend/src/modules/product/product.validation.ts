import { z } from "zod";

export const createProductSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Product name must be at least 2 characters.")
    .max(100, "Product name cannot exceed 100 characters."),

  sku: z
    .string()
    .trim()
    .min(2, "SKU is required.")
    .max(50, "SKU cannot exceed 50 characters.")
    .transform((value) => value.toUpperCase()),
});

export type CreateProductInput = z.infer<
  typeof createProductSchema
>;