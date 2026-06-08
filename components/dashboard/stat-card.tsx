"use client";

import { cn } from "@/lib/utils";
import type { ElementType } from "react";

interface StatCardProps {
  label: string;
  value: string;
  change: string;
  icon: ElementType;
  positive?: boolean;
  className?: string;
}

export function StatCard({ label, value, change, icon: Icon, positive = true, className }: StatCardProps) {
  return (
    <div
      className={cn(
        "glass-card group p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-500/25 hover:shadow-lg hover:shadow-emerald-500/5 sm:p-6",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            {label}
          </p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
            {value}
          </p>
          <p
            className={cn(
              "mt-1 text-xs font-semibold",
              positive ? "text-emerald-600 dark:text-emerald-400" : "text-red-500"
            )}
          >
            {change}
          </p>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-emerald-500/15 to-emerald-600/5 p-2.5 ring-1 ring-emerald-500/10 transition-transform group-hover:scale-105">
          <Icon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
        </div>
      </div>
    </div>
  );
}
