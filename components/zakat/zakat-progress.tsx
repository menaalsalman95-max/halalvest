"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const STEPS = [
  { id: 1, label: "Assets" },
  { id: 2, label: "Deductions" },
  { id: 3, label: "Nisab" },
  { id: 4, label: "Results" },
] as const;

interface ZakatProgressProps {
  currentStep: number;
}

export function ZakatProgress({ currentStep }: ZakatProgressProps) {
  const progressPercent = ((currentStep - 1) / (STEPS.length - 1)) * 100;

  return (
    <div className="glass-card border-emerald-500/10 p-4 sm:p-5">
      <div className="mb-3 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-zinc-500">
        <span>Calculator Progress</span>
        <span className="text-emerald-600 dark:text-emerald-400">
          Step {currentStep} of {STEPS.length}
        </span>
      </div>

      <div className="mb-4 h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="grid grid-cols-4 gap-2">
        {STEPS.map((step) => {
          const completed = step.id < currentStep;
          const active = step.id === currentStep;

          return (
            <div
              key={step.id}
              className={cn(
                "flex flex-col items-center gap-1.5 text-center",
                active ? "text-emerald-700 dark:text-emerald-400" : "text-zinc-500"
              )}
            >
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border text-xs font-bold transition-all",
                  completed &&
                    "border-emerald-500/40 bg-emerald-500 text-white dark:bg-emerald-600",
                  active &&
                    !completed &&
                    "border-emerald-500/50 bg-emerald-500/10 ring-2 ring-emerald-500/20",
                  !active && !completed && "border-zinc-200 dark:border-zinc-700"
                )}
              >
                {completed ? <Check className="h-4 w-4" /> : step.id}
              </div>
              <span className="text-[10px] font-semibold sm:text-xs">{step.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
