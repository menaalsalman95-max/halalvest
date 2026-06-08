"use client";

import { Search, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CheckerEmptyStateProps {
  query: string;
  suggestions?: string[];
  onSuggestionClick?: (ticker: string) => void;
}

const DEFAULT_SUGGESTIONS = ["AAPL", "GOOGL", "TSLA", "JPM", "WMT"];

export function CheckerEmptyState({
  query,
  suggestions = DEFAULT_SUGGESTIONS,
  onSuggestionClick,
}: CheckerEmptyStateProps) {
  return (
    <div className="glass-card flex flex-col items-center border-dashed border-zinc-300/80 px-6 py-16 text-center dark:border-zinc-700/80">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100 ring-1 ring-zinc-200 dark:bg-zinc-800 dark:ring-zinc-700">
        <Search className="h-7 w-7 text-zinc-400" />
      </div>
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
        No matches for &ldquo;{query}&rdquo;
      </h3>
      <p className="mt-2 max-w-md text-sm text-zinc-500 dark:text-zinc-400">
        Try a ticker symbol (e.g. NVDA), company name, or sector. Our database covers 300+ US
        equities with dynamic Shariah screening.
      </p>

      {onSuggestionClick && (
        <div className="mt-8 w-full max-w-md">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-zinc-400">
            Popular searches
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {suggestions.map((ticker) => (
              <Button
                key={ticker}
                variant="outline"
                size="sm"
                onClick={() => onSuggestionClick(ticker)}
                className="gap-1.5"
              >
                <TrendingUp className="h-3 w-3 text-emerald-500" />
                {ticker}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
