"use client";

import { cn } from "@/lib/utils";
import type { DebtRatioScreening } from "@/types/stock";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ComplianceBadge } from "@/components/ui/badge";
import { Scale } from "lucide-react";

interface DebtRatioChartProps {
  data: DebtRatioScreening;
}

export function DebtRatioChart({ data }: DebtRatioChartProps) {
  const gaugePct = Math.min(data.ratio, 100);
  const thresholdPct = data.threshold;

  return (
    <Card glass className="border-emerald-500/10">
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="rounded-xl bg-emerald-500/10 p-2.5 ring-1 ring-emerald-500/20">
              <Scale className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <CardTitle className="text-base">Debt Ratio</CardTitle>
              <CardDescription>AAOIFI max {data.threshold}%</CardDescription>
            </div>
          </div>
          <ComplianceBadge status={data.status} />
        </div>
      </CardHeader>

      <div className="flex flex-col items-center gap-6 sm:flex-row">
        {/* Radial gauge */}
        <div className="relative flex h-36 w-36 shrink-0 items-center justify-center">
          <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              strokeWidth="8"
              className="stroke-zinc-100 dark:stroke-zinc-800"
            />
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${(gaugePct / 100) * 264} 264`}
              className={cn(
                data.status === "halal" && "stroke-emerald-500",
                data.status === "questionable" && "stroke-amber-500",
                data.status === "haram" && "stroke-red-500"
              )}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span
              className={cn(
                "text-3xl font-bold",
                data.status === "halal" && "text-emerald-600 dark:text-emerald-400",
                data.status === "questionable" && "text-amber-600 dark:text-amber-400",
                data.status === "haram" && "text-red-600 dark:text-red-400"
              )}
            >
              {data.ratio}%
            </span>
            <span className="text-[10px] uppercase tracking-wider text-zinc-400">Debt</span>
          </div>
        </div>

        <div className="w-full flex-1 space-y-4">
          <p className="text-sm text-zinc-600 dark:text-zinc-300">{data.summary}</p>

          <div className="relative h-3 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
            <div
              className="absolute inset-y-0 left-0 bg-emerald-500/20"
              style={{ width: `${thresholdPct}%` }}
            />
            <div
              className={cn(
                "absolute inset-y-0 left-0 rounded-full transition-all duration-700",
                data.status === "halal" && "bg-emerald-500",
                data.status === "questionable" && "bg-amber-500",
                data.status === "haram" && "bg-red-500"
              )}
              style={{ width: `${gaugePct}%` }}
            />
            <div
              className="absolute inset-y-0 w-0.5 bg-zinc-900/50 dark:bg-white/50"
              style={{ left: `${thresholdPct}%` }}
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl bg-zinc-50/80 p-3 dark:bg-zinc-800/50">
              <p className="text-[10px] uppercase tracking-wider text-zinc-400">Interest Debt</p>
              <p className="mt-0.5 text-lg font-bold text-zinc-900 dark:text-white">
                ${data.interestBearingDebt}B
              </p>
            </div>
            <div className="rounded-xl bg-zinc-50/80 p-3 dark:bg-zinc-800/50">
              <p className="text-[10px] uppercase tracking-wider text-zinc-400">Market Cap</p>
              <p className="mt-0.5 text-lg font-bold text-zinc-900 dark:text-white">
                ${data.marketCapValue}B
              </p>
            </div>
          </div>

          <p className="rounded-lg bg-zinc-50/80 px-3 py-2 font-mono text-xs text-zinc-600 dark:bg-zinc-800/50 dark:text-zinc-300">
            {data.formula}
          </p>
        </div>
      </div>
    </Card>
  );
}
