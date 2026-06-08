"use client";

import { cn } from "@/lib/utils";

interface PortfolioChartProps {
  className?: string;
  data?: { label: string; value: number }[];
  returnPct?: number;
}

export function PortfolioChart({ className, data, returnPct = 0 }: PortfolioChartProps) {
  const chartData =
    data && data.length >= 2
      ? data
      : [
          { label: "Start", value: 10000 },
          { label: "Now", value: 10000 },
        ];

  const max = Math.max(...chartData.map((d) => d.value));
  const min = Math.min(...chartData.map((d) => d.value)) * 0.98;
  const range = max - min || 1;
  const positive = returnPct >= 0;

  const points = chartData
    .map((d, i) => {
      const x = (i / (chartData.length - 1)) * 100;
      const y = 100 - ((d.value - min) / range) * 100;
      return `${x},${y}`;
    })
    .join(" ");

  const areaPoints = `0,100 ${points} 100,100`;

  return (
    <div className={cn("glass-card p-5 sm:p-6", className)}>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="font-semibold tracking-tight text-zinc-900 dark:text-white">
            Portfolio Performance
          </h3>
          <p className="mt-0.5 text-xs text-zinc-500">Simulated value over time</p>
        </div>
        <span
          className={cn(
            "rounded-full px-2.5 py-1 text-xs font-semibold",
            positive
              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
              : "bg-red-500/10 text-red-500"
          )}
        >
          {positive ? "+" : ""}
          {returnPct.toFixed(2)}%
        </span>
      </div>

      <div className="relative h-[180px] w-full sm:h-[200px]">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgb(16, 185, 129)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="rgb(16, 185, 129)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points={areaPoints} fill="url(#areaGradient)" />
          <polyline
            points={points}
            fill="none"
            stroke="rgb(16, 185, 129)"
            strokeWidth="0.8"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      <div className="mt-4 flex justify-between text-[10px] text-zinc-400">
        {chartData.map((d) => (
          <span key={d.label}>{d.label}</span>
        ))}
      </div>
    </div>
  );
}
