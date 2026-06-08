"use client";

import { cn } from "@/lib/utils";

interface DonutSegment {
  label: string;
  percentage: number;
  compliant: boolean;
}

interface RevenueDonutChartProps {
  segments: DonutSegment[];
  size?: number;
  className?: string;
}

const COLORS = {
  compliant: "#10b981",
  nonCompliant: "#f87171",
};

export function RevenueDonutChart({ segments, size = 140, className }: RevenueDonutChartProps) {
  const strokeWidth = 22;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className="stroke-zinc-100 dark:stroke-zinc-800"
        />
        {segments.map((seg) => {
          const dash = (seg.percentage / 100) * circumference;
          const circle = (
            <circle
              key={seg.label}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              strokeWidth={strokeWidth}
              strokeDasharray={`${dash} ${circumference - dash}`}
              strokeDashoffset={-offset}
              stroke={seg.compliant ? COLORS.compliant : COLORS.nonCompliant}
              className="transition-all duration-700"
            />
          );
          offset += dash;
          return circle;
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-2xl font-bold text-zinc-900 dark:text-white">
          {segments.filter((s) => s.compliant).reduce((a, s) => a + s.percentage, 0).toFixed(0)}%
        </span>
        <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-400">
          Halal Revenue
        </span>
      </div>
    </div>
  );
}
