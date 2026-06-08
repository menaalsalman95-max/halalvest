"use client";

import { AlertCircle, CheckCircle2, Coins, TrendingDown, TrendingUp } from "lucide-react";
import { formatCurrency } from "@/lib/portfolio/format";
import type { ZakatCalculationResult } from "@/types/zakat";
import { cn } from "@/lib/utils";

interface ZakatResultsPanelProps {
  result: ZakatCalculationResult;
}

export function ZakatResultsPanel({ result }: ZakatResultsPanelProps) {
  const summaryCards = [
    {
      label: "Total Assets",
      value: formatCurrency(result.totalAssets),
      icon: TrendingUp,
      accent: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Total Deductions",
      value: formatCurrency(result.totalDeductions),
      icon: TrendingDown,
      accent: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-500/10",
    },
    {
      label: "Net Wealth",
      value: formatCurrency(result.netWealth),
      icon: Coins,
      accent: "text-sky-600 dark:text-sky-400",
      bg: "bg-sky-500/10",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        {summaryCards.map(({ label, value, icon: Icon, accent, bg }) => (
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
              <p className="text-xl font-bold tabular-nums text-zinc-900 dark:text-white sm:text-2xl">
                {value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div
        className={cn(
          "glass-card overflow-hidden border-emerald-500/15 p-0",
          result.isZakatDue ? "ring-1 ring-emerald-500/20" : ""
        )}
      >
        <div
          className={cn(
            "flex flex-wrap items-center justify-between gap-3 px-5 py-4",
            result.isZakatDue
              ? "bg-gradient-to-r from-emerald-500/15 via-emerald-500/5 to-transparent"
              : "bg-gradient-to-r from-zinc-500/10 via-transparent to-transparent"
          )}
        >
          <div className="flex items-center gap-3">
            {result.isZakatDue ? (
              <CheckCircle2 className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <AlertCircle className="h-6 w-6 text-zinc-500" />
            )}
            <div>
              <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                {result.isZakatDue ? "Zakat is Due" : "Zakat Not Due"}
              </p>
              <p className="text-xs text-zinc-500">
                Nisab ({result.nisabBasis}): {result.nisabGrams}g ·{" "}
                {formatCurrency(result.nisabThreshold)}
              </p>
            </div>
          </div>

          {result.isZakatDue && (
            <div className="text-right">
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Zakat Payable (2.5%)
              </p>
              <p className="text-3xl font-bold tabular-nums text-emerald-600 dark:text-emerald-400">
                {formatCurrency(result.zakatAmount)}
              </p>
            </div>
          )}
        </div>

        <div className="border-t border-emerald-500/10 px-5 py-4 text-sm text-zinc-600 dark:text-zinc-400">
          {result.isZakatDue ? (
            <p>
              Your net wealth of <strong className="text-zinc-900 dark:text-white">{formatCurrency(result.netWealth)}</strong>{" "}
              exceeds the nisab threshold of{" "}
              <strong className="text-zinc-900 dark:text-white">{formatCurrency(result.nisabThreshold)}</strong>.
              Zakat = {formatCurrency(result.netWealth)} × 2.5% ={" "}
              <strong className="text-emerald-600 dark:text-emerald-400">{formatCurrency(result.zakatAmount)}</strong>.
            </p>
          ) : (
            <p>
              Your net wealth of <strong className="text-zinc-900 dark:text-white">{formatCurrency(result.netWealth)}</strong>{" "}
              is below the nisab threshold of{" "}
              <strong className="text-zinc-900 dark:text-white">{formatCurrency(result.nisabThreshold)}</strong>.
              No zakat is due on these assets at this time.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
