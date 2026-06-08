"use client";

import { cn } from "@/lib/utils";
import type { BusinessActivityScreening } from "@/types/stock";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ComplianceBadge } from "@/components/ui/badge";
import { RevenueDonutChart } from "@/components/checker/revenue-donut-chart";
import { Building2 } from "lucide-react";

interface RevenueBreakdownChartProps {
  data: BusinessActivityScreening;
}

export function RevenueBreakdownChart({ data }: RevenueBreakdownChartProps) {
  return (
    <Card glass className="border-emerald-500/10">
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="rounded-xl bg-emerald-500/10 p-2.5 ring-1 ring-emerald-500/20">
              <Building2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <CardTitle className="text-base">Business Activity</CardTitle>
              <CardDescription>Revenue source compliance</CardDescription>
            </div>
          </div>
          <ComplianceBadge status={data.status} />
        </div>
      </CardHeader>

      <p className="mb-5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
        {data.summary}
      </p>

      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
        <RevenueDonutChart segments={data.revenueBreakdown} size={150} />

        <div className="w-full flex-1 space-y-2">
          {data.revenueBreakdown.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between gap-2 rounded-lg bg-zinc-50/80 px-3 py-2 dark:bg-zinc-800/50"
            >
              <div className="flex min-w-0 items-center gap-2">
                <span
                  className={cn(
                    "h-2.5 w-2.5 shrink-0 rounded-full",
                    item.compliant ? "bg-emerald-500" : "bg-red-400"
                  )}
                />
                <span className="truncate text-sm text-zinc-700 dark:text-zinc-300">
                  {item.label}
                </span>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <span className="text-sm font-bold text-zinc-900 dark:text-white">
                  {item.percentage}%
                </span>
                <span
                  className={cn(
                    "text-[9px] font-semibold uppercase",
                    item.compliant
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-red-600 dark:text-red-400"
                  )}
                >
                  {item.compliant ? "Halal" : "Haram"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-zinc-200/60 bg-white/50 px-4 py-3 dark:border-zinc-700/60 dark:bg-zinc-900/50">
        <p className="text-xs text-zinc-500">
          Prohibited exposure:{" "}
          <span className="font-bold text-zinc-900 dark:text-white">
            {data.prohibitedExposure}%
          </span>
        </p>
      </div>

      <ul className="mt-4 space-y-2">
        {data.details.map((detail) => (
          <li
            key={detail}
            className="flex items-start gap-2 text-sm text-zinc-500 dark:text-zinc-400"
          >
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-emerald-500" />
            {detail}
          </li>
        ))}
      </ul>
    </Card>
  );
}
