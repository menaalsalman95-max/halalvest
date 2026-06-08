"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ComplianceBadge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/portfolio/format";
import { getSimulatedPrice } from "@/lib/portfolio/prices";
import type { EnrichedHolding, TradeAction } from "@/types/portfolio";
import { ArrowDownCircle, ArrowUpCircle, Loader2, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface TradePanelProps {
  cash: number;
  holdings: EnrichedHolding[];
  trading: boolean;
  onTrade: (action: TradeAction, ticker: string, shares: number) => Promise<void>;
}

export function TradePanel({ cash, holdings, trading, onTrade }: TradePanelProps) {
  const [ticker, setTicker] = useState("");
  const [shares, setShares] = useState("1");
  const [action, setAction] = useState<TradeAction>("buy");
  const [localError, setLocalError] = useState<string | null>(null);
  const [lookupPrice, setLookupPrice] = useState<number | null>(null);
  const [lookupStatus, setLookupStatus] = useState<EnrichedHolding["status"] | null>(null);

  const upper = ticker.toUpperCase().trim();
  const holding = holdings.find((h) => h.ticker === upper);
  const shareNum = parseFloat(shares) || 0;
  const estPrice = holding?.price ?? lookupPrice ?? 0;
  const estTotal = estPrice * shareNum;

  useEffect(() => {
    if (upper.length < 1) {
      setLookupPrice(null);
      setLookupStatus(null);
      return;
    }
    if (holding) {
      setLookupPrice(holding.price);
      setLookupStatus(holding.status);
      return;
    }

    let cancelled = false;
    fetch(`/api/stocks/${encodeURIComponent(upper)}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("not found");
        const data = await res.json();
        if (cancelled) return;
        const cap = data.stock?.marketCapValue as number | undefined;
        setLookupPrice(getSimulatedPrice(upper, cap));
        setLookupStatus(data.stock?.status ?? null);
      })
      .catch(() => {
        if (!cancelled) {
          setLookupPrice(null);
          setLookupStatus(null);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [upper, holding]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    if (!upper) {
      setLocalError("Enter a ticker symbol.");
      return;
    }
    if (shareNum <= 0) {
      setLocalError("Enter a valid share quantity.");
      return;
    }
    try {
      await onTrade(action, upper, shareNum);
      setShares("1");
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : "Trade failed");
    }
  };

  return (
    <div className="glass-card border-emerald-500/15 p-0 shadow-[var(--shadow-glow)]">
      <div className="border-b border-emerald-500/10 bg-gradient-to-r from-emerald-500/8 via-transparent to-amber-500/5 px-5 py-4 sm:px-6">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-white">
          <Search className="h-4 w-4 text-emerald-500" />
          Trade Simulator
        </h3>
        <p className="mt-0.5 text-xs text-zinc-500">
          Available cash: {formatCurrency(cash)}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 p-5 sm:p-6">
        <div className="flex gap-2">
          {(["buy", "sell"] as const).map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => setAction(a)}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-semibold capitalize transition-all",
                action === a
                  ? a === "buy"
                    ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                    : "border-red-500/40 bg-red-500/10 text-red-600 dark:text-red-400"
                  : "border-zinc-200/80 text-zinc-500 hover:bg-zinc-50 dark:border-zinc-700/80 dark:hover:bg-zinc-800/60"
              )}
            >
              {a === "buy" ? (
                <ArrowDownCircle className="h-4 w-4" />
              ) : (
                <ArrowUpCircle className="h-4 w-4" />
              )}
              {a}
            </button>
          ))}
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-zinc-500">
            Ticker
          </label>
          <Input
            placeholder="e.g. AAPL, NVDA, TSLA"
            value={ticker}
            onChange={(e) => setTicker(e.target.value.toUpperCase())}
            className="h-12 border-emerald-500/15 font-bold uppercase"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-zinc-500">
            Shares
          </label>
          <Input
            type="number"
            min="0.0001"
            step="any"
            value={shares}
            onChange={(e) => setShares(e.target.value)}
            className="h-12 border-emerald-500/15"
          />
        </div>

        {estPrice > 0 && (
          <div className="flex items-center justify-between rounded-xl bg-zinc-50/80 px-3 py-2 text-xs dark:bg-zinc-800/50">
            <span className="text-zinc-500">Est. price</span>
            <span className="font-semibold text-zinc-900 dark:text-white">
              {formatCurrency(estPrice)}/sh
            </span>
          </div>
        )}

        {shareNum > 0 && estPrice > 0 && (
          <div className="flex items-center justify-between rounded-xl bg-emerald-500/5 px-3 py-2 text-xs ring-1 ring-emerald-500/15">
            <span className="text-zinc-500">Est. total</span>
            <span className="font-bold text-emerald-700 dark:text-emerald-400">
              {formatCurrency(estTotal)}
            </span>
          </div>
        )}

        {(holding || lookupStatus) && (
          <div className="flex items-center gap-2">
            {lookupStatus && <ComplianceBadge status={lookupStatus} />}
            {holding && (
              <span className="text-xs text-zinc-500">
                You own {holding.shares} shares
              </span>
            )}
          </div>
        )}

        {(localError) && (
          <p className="rounded-lg bg-red-500/10 px-3 py-2 text-xs text-red-600 dark:text-red-400">
            {localError}
          </p>
        )}

        <Button
          type="submit"
          variant="primary"
          className="w-full"
          disabled={trading}
        >
          {trading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Processing…
            </>
          ) : (
            `${action === "buy" ? "Buy" : "Sell"} ${upper || "Stock"}`
          )}
        </Button>
      </form>
    </div>
  );
}
