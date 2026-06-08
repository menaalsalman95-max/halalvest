"use client";

import { cn } from "@/lib/utils";
import type { SectorScreening } from "@/types/stock";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ComplianceBadge } from "@/components/ui/badge";
import { RISK_COLORS } from "@/lib/compliance/constants";
import { AlertTriangle, Layers } from "lucide-react";

interface SectorAnalysisCardProps {
  data: SectorScreening;
}

const riskBadgeStyles = {
  low: "bg-emerald-500/10 text-emerald-700 border-emerald-500/25 dark:text-emerald-400",
  medium: "bg-amber-500/10 text-amber-700 border-amber-500/25 dark:text-amber-400",
  high: "bg-red-500/10 text-red-700 border-red-500/25 dark:text-red-400",
};

export function SectorAnalysisCard({ data }: SectorAnalysisCardProps) {
  return (
    <Card glass className="border-emerald-500/10">
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="rounded-xl bg-emerald-500/10 p-2.5 ring-1 ring-emerald-500/20">
              <Layers className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <CardTitle className="text-base">Sector Classification</CardTitle>
              <CardDescription>Industry Shariah screening</CardDescription>
            </div>
          </div>
          <ComplianceBadge status={data.status} />
        </div>
      </CardHeader>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-zinc-50/80 p-3.5 ring-1 ring-zinc-200/60 dark:bg-zinc-800/50 dark:ring-zinc-700/60">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
              Sector
            </p>
            <p className="mt-1 text-sm font-bold text-zinc-900 dark:text-white">{data.sector}</p>
          </div>
          <div className="rounded-xl bg-zinc-50/80 p-3.5 ring-1 ring-zinc-200/60 dark:bg-zinc-800/50 dark:ring-zinc-700/60">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
              Industry
            </p>
            <p className="mt-1 text-sm font-bold text-zinc-900 dark:text-white">
              {data.industry}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-zinc-500">Risk level:</span>
          <span
            className={cn(
              "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize",
              riskBadgeStyles[data.riskLevel]
            )}
          >
            {data.riskLevel}
          </span>
          <span className={cn("text-xs font-medium", RISK_COLORS[data.riskLevel])}>
            Score {data.score}/100
          </span>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-[10px] font-medium uppercase tracking-wider text-zinc-400">
            <span>Low</span>
            <span>High</span>
          </div>
          <div className="relative h-2.5 overflow-hidden rounded-full bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500">
            <div
              className="absolute inset-y-0 w-3.5 -translate-x-1/2 rounded-full border-2 border-white bg-zinc-900 shadow-lg dark:border-zinc-900 dark:bg-white"
              style={{
                left: `${data.riskLevel === "low" ? 15 : data.riskLevel === "medium" ? 50 : 85}%`,
              }}
            />
          </div>
        </div>

        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">{data.summary}</p>

        {data.flags.length > 0 && (
          <ul className="space-y-2">
            {data.flags.map((flag) => (
              <li
                key={flag}
                className="flex items-start gap-2 rounded-lg bg-amber-500/5 px-3 py-2 text-sm text-amber-700 dark:text-amber-400"
              >
                <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                {flag}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Card>
  );
}
