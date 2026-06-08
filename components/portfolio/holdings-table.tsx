"use client";

import { ComplianceBadge } from "@/components/ui/badge";
import { formatCurrency, formatPercent } from "@/lib/portfolio/format";
import type { EnrichedHolding } from "@/types/portfolio";
import { cn } from "@/lib/utils";

interface HoldingsTableProps {
  holdings: EnrichedHolding[];
  compact?: boolean;
}

export function HoldingsTable({ holdings, compact }: HoldingsTableProps) {
  if (holdings.length === 0) {
    return (
      <div className="glass-card border-dashed py-16 text-center">
        <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
          No holdings yet
        </p>
        <p className="mt-1 text-xs text-zinc-500">
          Use the trade panel to buy your first halal stock.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-card overflow-hidden p-0">
      <div className="border-b border-zinc-200/80 px-5 py-4 dark:border-zinc-800/80 sm:px-6">
        <h3 className="font-semibold tracking-tight text-zinc-900 dark:text-white">
          Holdings
        </h3>
        <p className="mt-0.5 text-xs text-zinc-500">
          {holdings.length} position{holdings.length !== 1 ? "s" : ""} · simulated market prices
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-200/80 bg-zinc-50/50 dark:border-zinc-800/80 dark:bg-zinc-900/30">
              {["Ticker", "Company", ...(compact ? [] : ["Shares"]), "Value", "P/L", "Status"].map(
                (h) => (
                  <th
                    key={h}
                    className={cn(
                      "px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 sm:px-6",
                      h === "Value" || h === "P/L" || h === "Status" || h === "Shares"
                        ? "text-right"
                        : "text-left"
                    )}
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {holdings.map((h) => (
              <tr
                key={h.ticker}
                className="border-b border-zinc-100/80 transition-colors last:border-0 hover:bg-emerald-50/30 dark:border-zinc-800/50 dark:hover:bg-emerald-950/10"
              >
                <td className="px-4 py-3.5 sm:px-6">
                  <span className="font-bold text-zinc-900 dark:text-white">{h.ticker}</span>
                  {compact && (
                    <span className="ml-2 text-xs text-zinc-400">{h.shares} sh</span>
                  )}
                </td>
                <td className="px-4 py-3.5 text-zinc-600 dark:text-zinc-400 sm:px-6">
                  <span className="line-clamp-1">{h.name}</span>
                </td>
                {!compact && (
                  <td className="px-4 py-3.5 text-right tabular-nums text-zinc-500 sm:px-6">
                    {h.shares}
                  </td>
                )}
                <td className="px-4 py-3.5 text-right font-medium tabular-nums text-zinc-900 dark:text-white sm:px-6">
                  {formatCurrency(h.marketValue)}
                  <span className="block text-[10px] font-normal text-zinc-400">
                    {h.weight.toFixed(1)}%
                  </span>
                </td>
                <td
                  className={cn(
                    "px-4 py-3.5 text-right font-semibold tabular-nums sm:px-6",
                    h.gainLoss >= 0
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-red-500"
                  )}
                >
                  {h.gainLoss >= 0 ? "+" : ""}
                  {formatCurrency(h.gainLoss, true)}
                  <span className="block text-[10px] font-normal">
                    {formatPercent(h.gainLossPct)}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-right sm:px-6">
                  <ComplianceBadge status={h.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
