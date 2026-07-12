import { forwardRef, type InputHTMLAttributes } from "react";
import clsx from "clsx";

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, className, ...props }, ref) => {
    return (
      <>
        <input
          ref={ref}
          {...props}
          className={clsx(
            "w-full rounded-lg border px-4 py-2",
            "focus:border-blue-500",
            "focus:outline-none",
            "focus:ring-2",
            "focus:ring-blue-200",
            error
              ? "border-red-500"
              : "border-gray-300",
            className
          )}
        />

        {error && (
          <p className="mt-1 text-sm text-red-500">
            {error}
          </p>
        )}
      </>
    );
  }
);

Input.displayName = "Input";

export default Input;