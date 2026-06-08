"use client";

import { BookOpen, CheckCircle2, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface EducationStatsProps {
  totalLessons: number;
  completedCount: number;
  progressPercent: number;
  loaded: boolean;
}

export function EducationStats({
  totalLessons,
  completedCount,
  progressPercent,
  loaded,
}: EducationStatsProps) {
  const cards = [
    {
      label: "Total Lessons",
      value: totalLessons,
      icon: BookOpen,
      accent: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Completed",
      value: completedCount,
      icon: CheckCircle2,
      accent: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-500/10",
    },
    {
      label: "Progress",
      value: `${progressPercent}%`,
      icon: TrendingUp,
      accent: "text-sky-600 dark:text-sky-400",
      bg: "bg-sky-500/10",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {cards.map(({ label, value, icon: Icon, accent, bg }) => (
        <div
          key={label}
          className="glass-card flex items-center gap-4 border-emerald-500/10 p-4 sm:p-5"
        >
          <div className={cn("rounded-xl p-3", bg)}>
            <Icon className={cn("h-5 w-5", accent)} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              {label}
            </p>
            <p
              className={cn(
                "text-2xl font-bold tabular-nums text-zinc-900 dark:text-white",
                !loaded && "animate-pulse text-zinc-400"
              )}
            >
              {loaded ? value : "—"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
