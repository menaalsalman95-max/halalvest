import { cn } from "@/lib/utils";
import type { ComplianceStatus } from "@/types/stock";

interface BadgeProps {
  status: ComplianceStatus;
  className?: string;
}

const statusConfig = {
  halal: {
    label: "Halal",
    className:
      "bg-emerald-500/10 text-emerald-700 border-emerald-500/20 ring-emerald-500/10 dark:bg-emerald-500/15 dark:text-emerald-400 dark:border-emerald-500/30",
  },
  questionable: {
    label: "Questionable",
    className:
      "bg-amber-500/10 text-amber-700 border-amber-500/20 ring-amber-500/10 dark:bg-amber-500/15 dark:text-amber-400 dark:border-amber-500/30",
  },
  haram: {
    label: "Haram",
    className:
      "bg-red-500/10 text-red-700 border-red-500/20 ring-red-500/10 dark:bg-red-500/15 dark:text-red-400 dark:border-red-500/30",
  },
};

export function ComplianceBadge({ status, className }: BadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ring-1 ring-inset",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
