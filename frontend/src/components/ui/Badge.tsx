import clsx from "clsx";

type BadgeVariant =
  | "success"
  | "warning"
  | "danger"
  | "info";

interface BadgeProps {
  text: string;
  variant?: BadgeVariant;
}

const badgeClasses = {
  success:
    "bg-green-100 text-green-700",

  warning:
    "bg-yellow-100 text-yellow-700",

  danger:
    "bg-red-100 text-red-700",

  info:
    "bg-blue-100 text-blue-700",
};

export default function Badge({
  text,
  variant = "info",
}: BadgeProps) {
  return (
    <span
      className={clsx(
        "rounded-full px-3 py-1 text-sm font-medium",
        badgeClasses[variant]
      )}
    >
      {text}
    </span>
  );
}

