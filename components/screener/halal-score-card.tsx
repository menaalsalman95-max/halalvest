"use client";

import { cn } from "@/lib/utils";
import type { HalalScoreBreakdown } from "@/types/screener";
import { Building2, Landmark, Percent } from "lucide-react";

interface HalalScoreCardProps {
  scores: HalalScoreBreakdown;
  halalScore: number;
}

const CHECKS = [
  {
    key: "businessActivity" as const,
    label: "Business Activity",
    description: "Revenue from permissible vs. prohibited industries",
    icon: Building2,
    weight: "40%",
  },
  {
    key: "debtRatio" as const,
    label: "Debt Ratio",
    description: "Interest-bearing debt vs. AAOIFI 33% threshold",
    icon: Percent,
    weight: "30%",
  },
  {
    key: "interestIncome" as const,
    label: "Interest Income",
    description: "Non-compliant / impure revenue exposure",
    icon: Landmark,
    weight: "30%",
  },
];

export function HalalScoreCard({ scores, halalScore }: HalalScoreCardProps) {
  return (
    <div className="glass-card border-emerald-500/10 p-5 sm:p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-zinc-900 dark:text-white">Halal Scoring System</h3>
          <p className="mt-0.5 text-xs text-zinc-500">AAOIFI-weighted compliance checks</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{halalScore}</p>
          <p className="text-[10px] uppercase tracking-wider text-zinc-400">Overall</p>
        </div>
      </div>

      <div className="space-y-4">
        {CHECKS.map(({ key, label, description, icon: Icon, weight }) => {
          const score = scores[key];
          const color =
            score >= 80
              ? "from-emerald-400 to-emerald-600"
              : score >= 50
                ? "from-amber-400 to-amber-600"
                : "from-red-400 to-red-600";

          return (
            <div
              key={key}
              className="rounded-xl border border-zinc-200/60 bg-white/40 p-4 dark:border-zinc-800/60 dark:bg-zinc-900/40"
            >
              <div className="mb-2 flex items-start justify-between gap-2">
                <div className="flex items-start gap-2">
                  <div className="rounded-lg bg-emerald-500/10 p-2">
                    <Icon className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-900 dark:text-white">{label}</p>
                    <p className="text-xs text-zinc-500">{description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-zinc-900 dark:text-white">{score}</span>
                  <span className="block text-[10px] text-zinc-400">{weight}</span>
                </div>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                <div
                  className={cn("h-full rounded-full bg-gradient-to-r transition-all duration-700", color)}
                  style={{ width: `${score}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
