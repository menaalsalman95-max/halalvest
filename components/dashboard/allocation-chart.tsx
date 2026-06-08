"use client";

import { cn } from "@/lib/utils";

const DEFAULT_COLORS = ["#10b981", "#14b8a6", "#06b6d4", "#34d399", "#059669", "#a1a1aa"];

interface AllocationChartProps {
  className?: string;
  segments?: { label: string; value: number }[];
}

export function AllocationChart({ className, segments }: AllocationChartProps) {
  const data =
    segments && segments.length > 0
      ? segments
      : [{ label: "Cash", value: 100 }];

  const circumference = 2 * Math.PI * 15.9155;
  let offset = 0;

  return (
    <div className={cn("glass-card p-5 sm:p-6", className)}>
      <div className="mb-6">
        <h3 className="font-semibold tracking-tight text-zinc-900 dark:text-white">
          Sector Allocation
        </h3>
        <p className="mt-0.5 text-xs text-zinc-500">
          {data.length} sector{data.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
        <div className="relative h-36 w-36 shrink-0">
          <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
            {data.map((seg, i) => {
              const dash = (seg.value / 100) * circumference;
              const dashOffset = -((offset / 100) * circumference);
              offset += seg.value;
              return (
                <circle
                  key={seg.label}
                  cx="18"
                  cy="18"
                  r="15.9155"
                  fill="none"
                  stroke={DEFAULT_COLORS[i % DEFAULT_COLORS.length]}
                  strokeWidth="3.2"
                  strokeDasharray={`${dash} ${circumference}`}
                  strokeDashoffset={dashOffset}
                  strokeLinecap="round"
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-bold text-zinc-900 dark:text-white">
              {data.length}
            </span>
            <span className="text-[10px] text-zinc-500">sectors</span>
          </div>
        </div>

        <div className="flex-1 space-y-2.5">
          {data.map((seg, i) => (
            <div key={seg.label} className="flex items-center justify-between gap-2">
              <div className="flex min-w-0 items-center gap-2">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: DEFAULT_COLORS[i % DEFAULT_COLORS.length] }}
                />
                <span className="truncate text-sm text-zinc-600 dark:text-zinc-400">
                  {seg.label}
                </span>
              </div>
              <span className="shrink-0 text-sm font-semibold text-zinc-900 dark:text-white">
                {seg.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
