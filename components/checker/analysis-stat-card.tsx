"use client";

import { cn } from "@/lib/utils";
import type { ComplianceStatus } from "@/types/stock";
import type { LucideIcon } from "lucide-react";

interface AnalysisStatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon: LucideIcon;
  status?: ComplianceStatus;
  className?: string;
}

const statusAccent = {
  halal: "from-emerald-500/20 to-emerald-600/5 border-emerald-500/25 text-emerald-600 dark:text-emerald-400",
  questionable: "from-amber-500/20 to-amber-600/5 border-amber-500/25 text-amber-600 dark:text-amber-400",
  haram: "from-red-500/20 to-red-600/5 border-red-500/25 text-red-600 dark:text-red-400",
};

export function AnalysisStatCard({
  label,
  value,
  subtext,
  icon: Icon,
  status,
  className,
}: AnalysisStatCardProps) {
  return (
    <div
      className={cn(
        "glass-card group relative overflow-hidden p-4 sm:p-5",
        status && `bg-gradient-to-br ${statusAccent[status]}`,
        className
      )}
    >
      <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-emerald-500/5 blur-2xl transition-opacity group-hover:opacity-100" />
      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            {label}
          </p>
          <p className="mt-1 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
            {value}
          </p>
          {subtext && (
            <p className="mt-0.5 truncate text-xs text-zinc-500 dark:text-zinc-400">{subtext}</p>
          )}
        </div>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 ring-1 ring-emerald-500/20">
          <Icon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
        </div>
      </div>
    </div>
  );
}
