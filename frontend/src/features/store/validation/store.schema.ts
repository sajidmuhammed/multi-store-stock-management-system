import { z } from "zod";

export const storeSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Store name is required.")
    .max(100),

  location: z
    .string()
    .trim()
    .min(2, "Location is required.")
    .max(150),
});

export type StoreFormData = z.infer<typeof storeSchema>;