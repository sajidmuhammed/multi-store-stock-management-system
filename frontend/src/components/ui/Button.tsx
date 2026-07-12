import type { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import { Loading } from "../shared";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "success"
  | "outline";

type ButtonSize =
  | "sm"
  | "md"
  | "lg";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
}

const variantClasses = {
  primary:
    "bg-blue-600 hover:bg-blue-700 text-white",

  secondary:
    "bg-gray-600 hover:bg-gray-700 text-white",

  danger:
    "bg-red-600 hover:bg-red-700 text-white",

  success:
    "bg-green-600 hover:bg-green-700 text-white",

  outline:
    "border border-gray-300 bg-white hover:bg-gray-100 text-gray-800",
};

const sizeClasses = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-2",
  lg: "px-5 py-3 text-lg",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  fullWidth = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={clsx(
        "rounded-lg font-medium transition-all duration-200",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && "w-full",
        className
      )}
    >
      {loading ? "loading..." : children}
    </button>
  );
}
