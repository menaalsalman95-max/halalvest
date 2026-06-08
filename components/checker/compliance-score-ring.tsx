"use client";

import { cn } from "@/lib/utils";
import type { ComplianceStatus } from "@/types/stock";

interface ComplianceScoreRingProps {
  score: number;
  confidence: number;
  status: ComplianceStatus;
  size?: number;
  className?: string;
}

const statusColors: Record<ComplianceStatus, { stroke: string; text: string }> = {
  halal: {
    stroke: "stroke-emerald-500",
    text: "text-emerald-600 dark:text-emerald-400",
  },
  questionable: {
    stroke: "stroke-amber-500",
    text: "text-amber-600 dark:text-amber-400",
  },
  haram: {
    stroke: "stroke-red-500",
    text: "text-red-600 dark:text-red-400",
  },
};

export function ComplianceScoreRing({
  score,
  confidence,
  status,
  size = 140,
  className,
}: ComplianceScoreRingProps) {
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const colors = statusColors[status];

  return (
    <div className={cn("relative inline-flex flex-col items-center", className)}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className="stroke-zinc-100 dark:stroke-zinc-800"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={cn(colors.stroke, "transition-all duration-1000 ease-out")}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={cn("text-3xl font-bold", colors.text)}>{score}</span>
        <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-400">
          Score
        </span>
      </div>
      <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
        {confidence}% confidence
      </p>
    </div>
  );
}
