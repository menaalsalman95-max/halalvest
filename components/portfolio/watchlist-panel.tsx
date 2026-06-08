"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ComplianceBadge } from "@/components/ui/badge";
import { formatCurrency, formatPercent } from "@/lib/portfolio/format";
import type { WatchlistItem } from "@/types/portfolio";
import { Eye, Loader2, Plus, Trash2, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface WatchlistPanelProps {
  items: WatchlistItem[];
  onAdd: (ticker: string) => Promise<void>;
  onRemove: (ticker: string) => Promise<void>;
}

export function WatchlistPanel({ items, onAdd, onRemove }: WatchlistPanelProps) {
  const [ticker, setTicker] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const t = ticker.toUpperCase().trim();
    if (!t) return;
    setLoading(true);
    setError(null);
    try {
      await onAdd(t);
      setTicker("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="space-y-4">
        <AddForm
          ticker={ticker}
          setTicker={setTicker}
          loading={loading}
          error={error}
          onSubmit={handleAdd}
        />
        <div className="glass-card border-dashed py-16 text-center">
          <Eye className="mx-auto h-8 w-8 text-zinc-400" />
          <p className="mt-3 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            Your watchlist is empty
          </p>
          <p className="mt-1 text-xs text-zinc-500">Add tickers to track halal stocks.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <AddForm
        ticker={ticker}
        setTicker={setTicker}
        loading={loading}
        error={error}
        onSubmit={handleAdd}
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.ticker}
            className="glass-card group relative overflow-hidden p-4 transition-all hover:border-emerald-500/25 hover:shadow-lg hover:shadow-emerald-500/5"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-lg font-bold text-zinc-900 dark:text-white">
                    {item.ticker}
                  </span>
                  <ComplianceBadge status={item.status} className="text-[9px] px-1.5 py-0" />
                </div>
                <p className="mt-0.5 line-clamp-1 text-xs text-zinc-500">{item.name}</p>
                <p className="text-[10px] text-zinc-400">{item.sector}</p>
              </div>
              <button
                type="button"
                onClick={() => onRemove(item.ticker)}
                className="rounded-lg p-1.5 text-zinc-400 opacity-0 transition-all hover:bg-red-500/10 hover:text-red-500 group-hover:opacity-100"
                aria-label={`Remove ${item.ticker}`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 flex items-end justify-between">
              <div>
                <p className="text-xl font-bold text-zinc-900 dark:text-white">
                  {formatCurrency(item.price)}
                </p>
                <p
                  className={cn(
                    "text-xs font-semibold",
                    item.dayChangePct >= 0
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-red-500"
                  )}
                >
                  {formatPercent(item.dayChangePct)} today
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="flex items-center gap-1 text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  <TrendingUp className="h-3 w-3" />
                  {item.score}
                </span>
                <Link href="/dashboard/portfolio">
                  <Button variant="outline" size="sm" className="h-7 text-[10px]">
                    Trade
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AddForm({
  ticker,
  setTicker,
  loading,
  error,
  onSubmit,
}: {
  ticker: string;
  setTicker: (v: string) => void;
  loading: boolean;
  error: string | null;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <form onSubmit={onSubmit} className="glass-card flex flex-col gap-3 p-4 sm:flex-row sm:items-end">
      <div className="flex-1">
        <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-zinc-500">
          Add to watchlist
        </label>
        <Input
          placeholder="Ticker symbol"
          value={ticker}
          onChange={(e) => setTicker(e.target.value.toUpperCase())}
          className="h-11 font-bold uppercase"
        />
      </div>
      <Button type="submit" variant="primary" disabled={loading} className="h-11 shrink-0">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
        Add
      </Button>
      {error && (
        <p className="w-full text-xs text-red-500 sm:col-span-2">{error}</p>
      )}
    </form>
  );
}
