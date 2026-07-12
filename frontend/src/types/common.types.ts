export const UserRole = {
  ADMIN: "ADMIN",
  SHOPPER: "SHOPPER",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];