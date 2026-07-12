
import {
  forwardRef,
  type SelectHTMLAttributes,
} from "react";
import clsx from "clsx";

interface SelectProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
}

const Select = forwardRef<
  HTMLSelectElement,
  SelectProps
>(({ error, className, children, ...props }, ref) => {
  return (
    <>
      <select
        ref={ref}
        {...props}
        className={clsx(
          "w-full rounded-lg border px-4 py-2",
          "focus:outline-none",
          "focus:ring-2",
          "focus:ring-blue-200",
          "focus:border-blue-500",
          error
            ? "border-red-500"
            : "border-gray-300",
          className
        )}
      >
        {children}
      </select>

      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </>
  );
});

Select.displayName = "Select";

export default Select;
