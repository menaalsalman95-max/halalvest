"use client";

import { cn } from "@/lib/utils";
import type { ScoreBreakdownItem } from "@/types/stock";
import { ComplianceBadge } from "@/components/ui/badge";

interface ScoreBreakdownProps {
  breakdown: ScoreBreakdownItem[];
}

export function ScoreBreakdown({ breakdown }: ScoreBreakdownProps) {
  return (
    <div className="space-y-5">
      {breakdown.map((item) => (
        <div
          key={item.id}
          className="rounded-xl border border-zinc-200/60 bg-white/40 p-4 dark:border-zinc-800/60 dark:bg-zinc-900/30"
        >
          <div className="mb-2 flex items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                {item.label}
              </span>
              <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-medium text-zinc-500 dark:bg-zinc-800">
                {(item.weight * 100).toFixed(0)}% weight
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-zinc-900 dark:text-white">
                {item.score}
              </span>
              <ComplianceBadge status={item.status} className="text-[9px] px-2 py-0" />
            </div>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
            <div
              className={cn(
                "h-full rounded-full bg-gradient-to-r transition-all duration-700",
                item.status === "halal" && "from-emerald-400 to-emerald-600",
                item.status === "questionable" && "from-amber-400 to-amber-600",
                item.status === "haram" && "from-red-400 to-red-600"
              )}
              style={{ width: `${item.score}%` }}
            />
          </div>
          <p className="mt-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
            {item.summary}
          </p>
        </div>
      ))}
    </div>
  );
}
