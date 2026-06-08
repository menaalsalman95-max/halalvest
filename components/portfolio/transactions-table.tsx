"use client";

import { formatCurrency, formatDate, formatShares } from "@/lib/portfolio/format";
import type { Transaction } from "@/types/portfolio";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface TransactionsTableProps {
  transactions: Transaction[];
}

export function TransactionsTable({ transactions }: TransactionsTableProps) {
  if (transactions.length === 0) {
    return (
      <div className="glass-card border-dashed py-16 text-center">
        <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
          No transactions yet
        </p>
        <p className="mt-1 text-xs text-zinc-500">
          Buy or sell stocks to build your transaction history.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-card overflow-hidden p-0">
      <div className="border-b border-zinc-200/80 px-5 py-4 dark:border-zinc-800/80 sm:px-6">
        <h3 className="font-semibold tracking-tight text-zinc-900 dark:text-white">
          Transaction History
        </h3>
        <p className="mt-0.5 text-xs text-zinc-500">
          {transactions.length} trade{transactions.length !== 1 ? "s" : ""} · newest first
        </p>
      </div>

      <div className="divide-y divide-zinc-100/80 dark:divide-zinc-800/50">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-emerald-50/20 sm:flex-row sm:items-center sm:justify-between sm:px-6 dark:hover:bg-emerald-950/10"
          >
            <div className="flex items-start gap-3">
              <div
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                  tx.type === "buy"
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : "bg-red-500/10 text-red-500"
                )}
              >
                {tx.type === "buy" ? (
                  <ArrowDownCircle className="h-5 w-5" />
                ) : (
                  <ArrowUpCircle className="h-5 w-5" />
                )}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold uppercase text-zinc-900 dark:text-white">
                    {tx.type} {tx.ticker}
                  </span>
                  <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-medium uppercase text-zinc-500 dark:bg-zinc-800">
                    {formatShares(tx.shares)} @ {formatCurrency(tx.price)}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-zinc-500">{formatDate(tx.timestamp)}</p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
              <span
                className={cn(
                  "text-lg font-bold tabular-nums",
                  tx.type === "buy" ? "text-red-500" : "text-emerald-600 dark:text-emerald-400"
                )}
              >
                {tx.type === "buy" ? "-" : "+"}
                {formatCurrency(tx.total)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
