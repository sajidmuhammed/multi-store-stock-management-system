import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address."),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters."),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name is required."),

    email: z
      .string()
      .email("Please enter a valid email address."),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters."),

    confirmPassword: z
      .string()
      .min(6),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      path: ["confirmPassword"],
      message: "Passwords do not match.",
    }
  );

export type LoginFormData = z.infer<
  typeof loginSchema
>;

export type RegisterFormData = z.infer<
  typeof registerSchema
>;