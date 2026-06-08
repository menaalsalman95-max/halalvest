"use client";

import { formatCurrency } from "@/lib/portfolio/format";
import { ASSET_FIELD_LABELS, DEDUCTION_FIELD_LABELS } from "@/lib/zakat/constants";
import type { ZakatCalculationResult } from "@/types/zakat";

interface ZakatBreakdownProps {
  result: ZakatCalculationResult;
}

function labelForKey(key: string, type: "asset" | "deduction") {
  if (type === "asset") {
    return ASSET_FIELD_LABELS[key as keyof typeof ASSET_FIELD_LABELS] ?? key;
  }
  return DEDUCTION_FIELD_LABELS[key as keyof typeof DEDUCTION_FIELD_LABELS] ?? key;
}

export function ZakatBreakdown({ result }: ZakatBreakdownProps) {
  const hasAssets = result.assetBreakdown.length > 0;
  const hasDeductions = result.deductionBreakdown.length > 0;

  return (
    <div className="glass-card border-emerald-500/10 p-5 sm:p-6">
      <h2 className="mb-4 font-semibold text-zinc-900 dark:text-white">Wealth Breakdown</h2>

      {!hasAssets && !hasDeductions ? (
        <p className="text-sm text-zinc-500">
          Enter asset and deduction values above to see a detailed breakdown.
        </p>
      ) : (
        <div className="space-y-5">
          {hasAssets && (
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Assets
              </p>
              <ul className="space-y-2">
                {result.assetBreakdown.map((line) => (
                  <li
                    key={line.label}
                    className="flex items-center justify-between rounded-lg bg-emerald-500/5 px-3 py-2 text-sm"
                  >
                    <span className="text-zinc-600 dark:text-zinc-400">
                      {labelForKey(line.label, "asset")}
                    </span>
                    <span className="font-semibold tabular-nums text-zinc-900 dark:text-white">
                      {formatCurrency(line.value)}
                    </span>
                  </li>
                ))}
                <li className="flex items-center justify-between border-t border-emerald-500/10 px-3 pt-2 text-sm font-bold">
                  <span className="text-zinc-900 dark:text-white">Total Assets</span>
                  <span className="tabular-nums text-emerald-600 dark:text-emerald-400">
                    {formatCurrency(result.totalAssets)}
                  </span>
                </li>
              </ul>
            </div>
          )}

          {hasDeductions && (
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Deductions
              </p>
              <ul className="space-y-2">
                {result.deductionBreakdown.map((line) => (
                  <li
                    key={line.label}
                    className="flex items-center justify-between rounded-lg bg-amber-500/5 px-3 py-2 text-sm"
                  >
                    <span className="text-zinc-600 dark:text-zinc-400">
                      {labelForKey(line.label, "deduction")}
                    </span>
                    <span className="font-semibold tabular-nums text-zinc-900 dark:text-white">
                      −{formatCurrency(line.value)}
                    </span>
                  </li>
                ))}
                <li className="flex items-center justify-between border-t border-amber-500/10 px-3 pt-2 text-sm font-bold">
                  <span className="text-zinc-900 dark:text-white">Total Deductions</span>
                  <span className="tabular-nums text-amber-600 dark:text-amber-400">
                    −{formatCurrency(result.totalDeductions)}
                  </span>
                </li>
              </ul>
            </div>
          )}

          <div className="rounded-xl border border-zinc-200/60 bg-zinc-50/50 px-4 py-3 dark:border-zinc-800/60 dark:bg-zinc-900/30">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-zinc-600 dark:text-zinc-400">Net Wealth</span>
              <span className="text-lg font-bold tabular-nums text-zinc-900 dark:text-white">
                {formatCurrency(result.netWealth)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
