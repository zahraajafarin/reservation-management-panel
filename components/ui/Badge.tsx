import type { BadgeProps } from "@/types/common/badge";

function Badge({ title, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${className}`}
    >
      {title}
    </span>
  );
}

export default Badge;