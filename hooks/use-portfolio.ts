"use client";

import { useCallback, useEffect, useState } from "react";
import type { PortfolioSnapshot, TradeAction } from "@/types/portfolio";

export function usePortfolio() {
  const [data, setData] = useState<PortfolioSnapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trading, setTrading] = useState(false);

  const refresh = useCallback(async () => {
    setError(null);
    try {
      const res = await fetch("/api/portfolio");
      if (res.status === 401) {
        throw new Error("Unauthorized");
      }
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? "Failed to load portfolio");
      }
      const snapshot: PortfolioSnapshot = await res.json();
      setData(snapshot);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load portfolio");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const trade = useCallback(
    async (action: TradeAction, ticker: string, shares: number) => {
      setTrading(true);
      setError(null);
      try {
        const res = await fetch("/api/portfolio/trade", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action, ticker, shares }),
        });
        const body = await res.json();
        if (!res.ok) throw new Error(body.error ?? "Trade failed");
        setData(body);
        return body as PortfolioSnapshot;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Trade failed";
        setError(message);
        throw err;
      } finally {
        setTrading(false);
      }
    },
    []
  );

  const addWatchlist = useCallback(async (ticker: string) => {
    setError(null);
    const res = await fetch("/api/portfolio/watchlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ticker }),
    });
    const body = await res.json();
    if (!res.ok) throw new Error(body.error ?? "Failed to add to watchlist");
    setData(body);
  }, []);

  const removeWatchlist = useCallback(async (ticker: string) => {
    setError(null);
    const res = await fetch(`/api/portfolio/watchlist?ticker=${encodeURIComponent(ticker)}`, {
      method: "DELETE",
    });
    const body = await res.json();
    if (!res.ok) throw new Error(body.error ?? "Failed to remove from watchlist");
    setData(body);
  }, []);

  return {
    data,
    loading,
    error,
    trading,
    refresh,
    trade,
    addWatchlist,
    removeWatchlist,
  };
}
