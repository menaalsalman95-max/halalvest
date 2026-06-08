"use client";

import { useState, useCallback, useEffect } from "react";
import { Search, Database, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ComplianceBadge } from "@/components/ui/badge";
import { StockAutocomplete } from "@/components/checker/stock-autocomplete";
import { StockResult } from "@/components/checker/stock-result";
import { CheckerLoadingState } from "@/components/checker/checker-loading-state";
import { CheckerEmptyState } from "@/components/checker/checker-empty-state";
import { useStockAnalysis, useStockSearch } from "@/hooks/use-stock-api";
import type { Stock } from "@/types/stock";
import { cn } from "@/lib/utils";

const FEATURED = [
  { ticker: "AAPL", sector: "Tech" },
  { ticker: "TSLA", sector: "Auto" },
  { ticker: "NVDA", sector: "Chips" },
  { ticker: "GOOGL", sector: "Tech" },
  { ticker: "JPM", sector: "Bank" },
  { ticker: "WMT", sector: "Retail" },
  { ticker: "BAC", sector: "Bank" },
  { ticker: "KO", sector: "Staples" },
];

export function StockChecker() {
  const [selected, setSelected] = useState<Stock | null>(null);
  const [analysisSource, setAnalysisSource] = useState<"detailed" | "dynamic" | null>(null);
  const [multiResults, setMultiResults] = useState<
    { ticker: string; name: string; status: Stock["status"]; score: number; sector: string }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [lastQuery, setLastQuery] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { analyze } = useStockAnalysis();
  const { search, databaseSize } = useStockSearch();

  useEffect(() => {
    search("", 1).catch(() => {});
  }, [search]);

  const runAnalysis = useCallback(
    async (ticker: string) => {
      setLoading(true);
      setSearched(true);
      setMultiResults([]);
      setSelected(null);
      setAnalysisSource(null);
      setError(null);
      setLastQuery(ticker);

      try {
        const result = await analyze(ticker);
        setSelected(result.stock);
        setAnalysisSource(result.source);
      } catch {
        setError(`Could not analyze "${ticker.toUpperCase()}". Try another ticker.`);
      } finally {
        setLoading(false);
      }
    },
    [analyze]
  );

  const handleSearch = useCallback(
    async (query: string) => {
      const q = query.trim();
      if (!q) return;

      setLastQuery(q);
      setLoading(true);
      setSearched(true);
      setSelected(null);
      setMultiResults([]);
      setError(null);

      let delegated = false;
      try {
        const { results } = await search(q, 8);

        if (results.length === 0) {
          setError(null);
        } else if (
          results.length === 1 ||
          results[0].ticker.toLowerCase() === q.toLowerCase()
        ) {
          delegated = true;
          await runAnalysis(results[0].ticker);
        } else {
          setMultiResults(results);
        }
      } catch {
        setError("Search failed. Please try again.");
      } finally {
        if (!delegated) setLoading(false);
      }
    },
    [search, runAnalysis]
  );

  return (
    <div className="space-y-8">
      {/* Live search panel */}
      <div className="glass-card overflow-hidden border-emerald-500/15 p-0 shadow-[var(--shadow-glow)]">
        <div className="border-b border-emerald-500/10 bg-gradient-to-r from-emerald-500/8 via-transparent to-amber-500/5 px-5 py-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-white">
                <Search className="h-4 w-4 text-emerald-500" />
                Live Stock Search
              </h2>
              <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                Ticker · company name · sector · autocomplete
              </p>
            </div>
            {databaseSize !== null && (
              <div className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-700 ring-1 ring-emerald-500/20 dark:text-emerald-400">
                <Database className="h-3.5 w-3.5" />
                {databaseSize.toLocaleString()} companies
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3 p-4 sm:flex-row sm:p-5">
          <div className="flex-1">
            <StockAutocomplete
              onSelect={runAnalysis}
              onSearch={handleSearch}
              onQueryChange={setLastQuery}
              loading={loading}
            />
          </div>
          <Button
            variant="primary"
            size="lg"
            className="h-14 shrink-0 px-8 sm:h-[3.25rem]"
            onClick={() => lastQuery.trim() && handleSearch(lastQuery)}
            disabled={loading || !lastQuery.trim()}
          >
            <Sparkles className="h-4 w-4" />
            Analyze
          </Button>
        </div>

        <div className="border-t border-zinc-200/60 px-4 py-3 dark:border-zinc-800/60 sm:px-5">
          <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
            Quick access
          </p>
          <div className="flex flex-wrap gap-2">
            {FEATURED.map(({ ticker, sector }) => (
              <button
                key={ticker}
                onClick={() => runAnalysis(ticker)}
                disabled={loading}
                className={cn(
                  "inline-flex items-center gap-2 rounded-xl border border-zinc-200/80 bg-white/60 px-3 py-2 text-sm backdrop-blur-sm transition-all",
                  "hover:border-emerald-500/40 hover:bg-emerald-500/5 hover:shadow-md",
                  "disabled:opacity-50 dark:border-zinc-700/80 dark:bg-zinc-900/60"
                )}
              >
                <span className="font-bold text-zinc-900 dark:text-white">{ticker}</span>
                <span className="text-[10px] text-zinc-400">{sector}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Multi-result picker */}
      {multiResults.length > 1 && !selected && !loading && (
        <div className="glass-card p-5">
          <p className="mb-4 text-sm font-medium text-zinc-700 dark:text-zinc-300">
            {multiResults.length} matches for &ldquo;{lastQuery}&rdquo; — select a company:
          </p>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {multiResults.map((item) => (
              <button
                key={item.ticker}
                onClick={() => runAnalysis(item.ticker)}
                className="flex items-center justify-between rounded-xl border border-zinc-200/80 bg-white/50 px-4 py-3.5 text-left transition-all hover:border-emerald-500/40 hover:bg-emerald-500/5 dark:border-zinc-700/80 dark:bg-zinc-900/50"
              >
                <div className="min-w-0">
                  <span className="font-bold text-zinc-900 dark:text-white">{item.ticker}</span>
                  <p className="truncate text-xs text-zinc-500">{item.name}</p>
                  <p className="text-[10px] text-zinc-400">{item.sector}</p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                    {item.score}
                  </span>
                  <ComplianceBadge status={item.status} className="text-[9px] px-1.5 py-0" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {loading && <CheckerLoadingState />}

      {!loading && selected && (
        <StockResult stock={selected} analysisSource={analysisSource} />
      )}

      {!loading && searched && !selected && multiResults.length === 0 && !error && lastQuery && (
        <CheckerEmptyState query={lastQuery} onSuggestionClick={runAnalysis} />
      )}

      {error && !loading && (
        <div className="glass-card border-red-500/20 bg-red-500/5 py-10 text-center">
          <p className="text-sm font-medium text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}
    </div>
  );
}
