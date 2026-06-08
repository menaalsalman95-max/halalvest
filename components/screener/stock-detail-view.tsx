"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, BarChart3 } from "lucide-react";
import { CompanyProfileCard } from "@/components/checker/company-profile-card";
import { StockResult } from "@/components/checker/stock-result";
import { CandlestickChart } from "@/components/charts/candlestick-chart";
import { HalalScoreCard } from "@/components/screener/halal-score-card";
import { formatPercent, formatPrice } from "@/lib/screener/format";
import { generateOHLCV } from "@/lib/charts/ohlcv";
import type { ScreenerStock } from "@/types/screener";
import { useMemo } from "react";
import { ComplianceBadge } from "@/components/ui/badge";

interface StockDetailViewProps {
  screenerStock: ScreenerStock;
}

export function StockDetailView({ screenerStock }: StockDetailViewProps) {
  const { stock, scores, halalScore, price, dividendYield, debtRatio } = screenerStock;

  const ohlcv = useMemo(
    () => generateOHLCV(stock.ticker, price, 120),
    [stock.ticker, price]
  );

  return (
    <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <Link
        href="/screener"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-emerald-600 transition-colors hover:text-emerald-700 dark:text-emerald-400"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Screener
      </Link>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <CompanyProfileCard stock={stock} />
      </motion.div>

      {/* Quick metrics */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
      >
        {[
          { label: "Price", value: formatPrice(price) },
          { label: "Market Cap", value: stock.marketCap },
          { label: "Sector", value: stock.sector },
          { label: "Dividend Yield", value: formatPercent(dividendYield) },
        ].map(({ label, value }) => (
          <div key={label} className="glass-card p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
              {label}
            </p>
            <p className="mt-1 text-lg font-bold text-zinc-900 dark:text-white">{value}</p>
          </div>
        ))}
      </motion.div>

      {/* Candlestick chart */}
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-8"
      >
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-emerald-500" />
            <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-emerald-600 dark:text-emerald-400">
              Price Chart
            </h2>
          </div>
          <ComplianceBadge status={stock.status} />
        </div>
        <div className="glass-card overflow-hidden border-emerald-500/15 p-0">
          <div className="border-b border-zinc-800/80 px-5 py-3">
            <p className="text-xs text-zinc-500">
              {stock.ticker} · Simulated OHLCV · Green = gain · Red = loss
            </p>
          </div>
          <CandlestickChart data={ohlcv} height={400} />
        </div>
      </motion.section>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mt-8 grid gap-6 lg:grid-cols-2"
      >
        <HalalScoreCard scores={scores} halalScore={halalScore} />
        <div className="glass-card space-y-4 p-5 sm:p-6">
          <h3 className="font-semibold text-zinc-900 dark:text-white">Compliance Metrics</h3>
          <div className="grid grid-cols-2 gap-3">
            <MetricBox label="Debt Ratio" value={formatPercent(debtRatio)} />
            <MetricBox label="Halal Score" value={String(halalScore)} />
            <MetricBox label="Industry" value={stock.industry} />
            <MetricBox label="Exchange" value={stock.exchange} />
          </div>
          <p className="text-xs leading-relaxed text-zinc-500">
            {stock.description}
          </p>
        </div>
      </motion.div>

      {/* Full halal analysis */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-10"
      >
        <StockResult stock={stock} analysisSource="detailed" />
      </motion.div>
    </div>
  );
}

function MetricBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-zinc-50/80 p-3 dark:bg-zinc-800/50">
      <p className="text-[10px] uppercase tracking-wider text-zinc-400">{label}</p>
      <p className="mt-0.5 truncate text-sm font-bold text-zinc-900 dark:text-white">{value}</p>
    </div>
  );
}
