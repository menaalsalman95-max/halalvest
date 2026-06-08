"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Stock, StockSearchResult } from "@/types/stock";

interface SearchResponse {
  results: StockSearchResult[];
  total: number;
  query: string;
  databaseSize?: number;
}

interface AnalyzeResponse {
  stock: Stock;
  source: "detailed" | "dynamic";
  databaseSize?: number;
}

interface ExplainResponse {
  ticker: string;
  explanation: string;
  educational: true;
  aiPowered: boolean;
  status: string;
  score: number;
}

export function useStockSearch() {
  const [databaseSize, setDatabaseSize] = useState<number | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const search = useCallback(async (query: string, limit = 8): Promise<SearchResponse> => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    const params = new URLSearchParams({ q: query, limit: String(limit) });
    const res = await fetch(`/api/stocks/search?${params}`, { signal: controller.signal });

    if (!res.ok) throw new Error("Search failed");
    const data: SearchResponse = await res.json();
    if (data.databaseSize) setDatabaseSize(data.databaseSize);
    return data;
  }, []);

  return { search, databaseSize };
}

export function useStockAnalysis() {
  const analyze = useCallback(async (ticker: string): Promise<AnalyzeResponse> => {
    const res = await fetch(`/api/stocks/${encodeURIComponent(ticker.toUpperCase())}`);
    if (res.status === 404) throw new Error("not_found");
    if (!res.ok) throw new Error("Analysis failed");
    return res.json();
  }, []);

  return { analyze };
}

export function useStockExplanation(ticker: string | null) {
  const [explanation, setExplanation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [aiPowered, setAiPowered] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ticker) {
      setExplanation(null);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);
    setExplanation(null);

    fetch(`/api/stocks/${encodeURIComponent(ticker.toUpperCase())}/explain`, {
      method: "POST",
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to load explanation");
        const data: ExplainResponse = await res.json();
        if (!cancelled) {
          setExplanation(data.explanation);
          setAiPowered(data.aiPowered);
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : "Error");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [ticker]);

  return { explanation, loading, aiPowered, error };
}
