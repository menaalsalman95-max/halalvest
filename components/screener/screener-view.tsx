"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScreenerFiltersBar } from "@/components/screener/screener-filters";
import { ScreenerTable } from "@/components/screener/screener-table";
import { StockInfoPanel } from "@/components/screener/stock-info-panel";
import { toTradingViewSymbol } from "@/components/screener/tradingview-widget";
import {
  FEATURED_STOCKS,
  SCREENER_DATASET,
  SCREENER_SECTORS,
  filterScreenerStocks,
} from "@/lib/screener/dataset";
import { DEFAULT_FILTERS } from "@/types/screener";
import type { ScreenerFilters } from "@/types/screener";
import { ComplianceBadge } from "@/components/ui/badge";

const TradingViewWidget = dynamic(
  () =>
    import("@/components/screener/tradingview-widget").then((mod) => mod.TradingViewWidget),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[460px] items-center justify-center bg-zinc-950/40 text-sm text-zinc-500">
        Loading chart…
      </div>
    ),
  }
);

export function ScreenerView() {
  const [filters, setFilters] = useState<ScreenerFilters>(DEFAULT_FILTERS);
  const [chartTicker, setChartTicker] = useState("AAPL");

  const results = useMemo(
    () => filterScreenerStocks(SCREENER_DATASET, filters),
    [filters]
  );

  const chartStock =
    SCREENER_DATASET.find((s) => s.ticker === chartTicker) ??
    FEATURED_STOCKS[0] ??
    SCREENER_DATASET[0];
  const tvSymbol = toTradingViewSymbol(chartStock.ticker, chartStock.stock.exchange);

  return (
    <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[380px] w-[680px] -translate-x-1/2 rounded-full bg-emerald-500/8 blur-3xl dark:bg-emerald-500/12"
        aria-hidden
      />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative mb-8 text-center lg:mb-10"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
          Islamic Fintech · Stock Discovery
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
          Halal Stock Screener
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-600 dark:text-zinc-400">
          Search {SCREENER_DATASET.length}+ US equities with Shariah compliance scoring, sector
          filters, and live TradingView charts.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="relative mb-6"
      >
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-emerald-500/70" />
        <Input
          placeholder="Search ticker, company name, or sector…"
          value={filters.query}
          onChange={(e) => setFilters((f) => ({ ...f, query: e.target.value }))}
          className="h-14 border-emerald-500/15 bg-white/80 pl-12 text-base shadow-inner dark:bg-zinc-900/80"
        />
      </motion.div>

      <div className="mb-6 flex flex-wrap gap-2">
        {FEATURED_STOCKS.map((stock) => (
          <button
            key={stock.ticker}
            type="button"
            onClick={() => {
              setChartTicker(stock.ticker);
              setFilters((f) => ({ ...f, query: stock.ticker }));
            }}
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-200/80 bg-white/60 px-3 py-2 text-sm backdrop-blur-sm transition-all hover:border-emerald-500/40 hover:bg-emerald-500/5 dark:border-zinc-700/80 dark:bg-zinc-900/60"
          >
            <span className="font-bold text-zinc-900 dark:text-white">{stock.ticker}</span>
            <ComplianceBadge status={stock.status} className="text-[8px] px-1.5 py-0" />
          </button>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card mb-6 overflow-hidden border-emerald-500/15 p-0"
      >
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-500/10 bg-gradient-to-r from-emerald-500/8 via-transparent to-amber-500/5 px-5 py-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-emerald-500" />
            <span className="text-sm font-semibold text-zinc-900 dark:text-white">
              {chartStock.ticker} · {chartStock.name}
            </span>
          </div>
          <span className="text-xs text-zinc-500">TradingView Advanced Chart</span>
        </div>
        <StockInfoPanel stock={chartStock} />
        <TradingViewWidget symbol={tvSymbol} height={460} />
      </motion.div>

      <ScreenerFiltersBar
        filters={filters}
        sectors={SCREENER_SECTORS}
        onChange={setFilters}
        resultCount={results.length}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="mt-6"
      >
        <ScreenerTable
          stocks={results}
          activeTicker={chartTicker}
          onRowHover={setChartTicker}
        />
      </motion.div>

      <p className="mt-6 text-center text-xs text-zinc-500">
        Simulated prices & scores for demo · Not financial or religious advice
      </p>
    </div>
  );
}
