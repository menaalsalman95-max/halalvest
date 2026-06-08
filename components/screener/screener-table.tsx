"use client";

import Link from "next/link";
import { ComplianceBadge } from "@/components/ui/badge";
import { formatPercent, formatPrice } from "@/lib/screener/format";
import type { ScreenerStock } from "@/types/screener";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface ScreenerTableProps {
  stocks: ScreenerStock[];
  activeTicker?: string;
  onRowHover?: (ticker: string) => void;
}

export function ScreenerTable({ stocks, activeTicker, onRowHover }: ScreenerTableProps) {
  if (stocks.length === 0) {
    return (
      <div className="glass-card border-dashed py-16 text-center">
        <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
          No stocks match your filters
        </p>
        <p className="mt-1 text-xs text-zinc-500">Try adjusting search or filter criteria.</p>
      </div>
    );
  }

  return (
    <div className="glass-card overflow-hidden p-0">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b border-zinc-200/80 bg-zinc-50/50 dark:border-zinc-800/80 dark:bg-zinc-900/30">
              {["Ticker", "Company", "Price", "Sector", "Halal Score", "Status", ""].map((h) => (
                <th
                  key={h || "action"}
                  className={cn(
                    "px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 sm:px-5",
                    h === "Price" || h === "Halal Score" || h === "Status" || h === ""
                      ? "text-right"
                      : "text-left"
                  )}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock) => (
              <tr
                key={stock.ticker}
                onMouseEnter={() => onRowHover?.(stock.ticker)}
                className={cn(
                  "border-b border-zinc-100/80 transition-colors last:border-0 dark:border-zinc-800/50",
                  "hover:bg-emerald-50/30 dark:hover:bg-emerald-950/10",
                  activeTicker === stock.ticker && "bg-emerald-500/5"
                )}
              >
                <td className="px-4 py-3.5 sm:px-5">
                  <span className="font-bold text-zinc-900 dark:text-white">{stock.ticker}</span>
                </td>
                <td className="max-w-[200px] px-4 py-3.5 sm:px-5">
                  <span className="line-clamp-1 text-zinc-600 dark:text-zinc-400">{stock.name}</span>
                  <span className="block text-[10px] text-zinc-400">{stock.industry}</span>
                </td>
                <td className="px-4 py-3.5 text-right font-medium tabular-nums text-zinc-900 dark:text-white sm:px-5">
                  {formatPrice(stock.price)}
                </td>
                <td className="px-4 py-3.5 text-zinc-600 dark:text-zinc-400 sm:px-5">
                  {stock.sector}
                </td>
                <td className="px-4 py-3.5 text-right sm:px-5">
                  <span
                    className={cn(
                      "text-lg font-bold tabular-nums",
                      stock.halalScore >= 80
                        ? "text-emerald-600 dark:text-emerald-400"
                        : stock.halalScore >= 50
                          ? "text-amber-600 dark:text-amber-400"
                          : "text-red-500"
                    )}
                  >
                    {stock.halalScore}
                  </span>
                  <span className="block text-[10px] text-zinc-400">
                    Debt {formatPercent(stock.debtRatio)}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-right sm:px-5">
                  <ComplianceBadge status={stock.status} className="text-[9px] px-2 py-0.5" />
                </td>
                <td className="px-4 py-3.5 text-right sm:px-5">
                  <Link
                    href={`/screener/${stock.ticker}`}
                    className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold text-emerald-600 transition-colors hover:bg-emerald-500/10 dark:text-emerald-400"
                  >
                    View
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
