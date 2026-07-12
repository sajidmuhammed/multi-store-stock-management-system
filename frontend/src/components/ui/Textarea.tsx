import {
  forwardRef,
  type TextareaHTMLAttributes,
} from "react";
import clsx from "clsx";

interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaProps
>(({ error, className, ...props }, ref) => {
  return (
    <>
      <textarea
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
      />

      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </>
  );
});

Textarea.displayName = "Textarea";

export default Textarea;