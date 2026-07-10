import { z } from "zod";

export const createStoreSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Store name must be at least 2 characters.")
    .max(100, "Store name cannot exceed 100 characters."),
});

export type CreateStoreInput = z.infer<typeof createStoreSchema>;