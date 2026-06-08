"use client";

import { Loader2, Shield } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const STEPS = [
  "Screening business activities",
  "Calculating debt ratio (AAOIFI)",
  "Classifying sector & industry",
  "Scoring impure income exposure",
];

export function CheckerLoadingState() {
  return (
    <div className="glass-card overflow-hidden border-emerald-500/20 p-0">
      <div className="border-b border-emerald-500/10 bg-gradient-to-r from-emerald-500/10 via-transparent to-amber-500/5 px-6 py-8 text-center">
        <div className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center">
          <div className="absolute inset-0 animate-ping rounded-full bg-emerald-500/20" />
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-lg shadow-emerald-600/30">
            <Loader2 className="h-7 w-7 animate-spin text-white" />
          </div>
        </div>
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
          Running Shariah Analysis
        </h3>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Applying AAOIFI screening criteria across 4 compliance pillars
        </p>
      </div>

      <div className="space-y-4 p-6">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <div
              key={step}
              className="flex items-center gap-2 rounded-xl border border-zinc-200/60 bg-white/50 px-3 py-2.5 dark:border-zinc-700/60 dark:bg-zinc-900/50"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <Shield className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
              <span className="text-xs text-zinc-600 dark:text-zinc-300">{step}</span>
            </div>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="glass-card p-5 lg:col-span-1">
            <Skeleton className="mb-4 h-32 w-full rounded-xl" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="mt-2 h-3 w-1/2" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="glass-card p-4">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="mt-3 h-8 w-16" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
