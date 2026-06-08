"use client";

import { useEffect, useRef } from "react";

interface TradingViewWidgetProps {
  symbol?: string;
  height?: number;
}

declare global {
  interface Window {
    TradingView?: {
      widget: new (config: Record<string, unknown>) => void;
    };
  }
}

const EXCHANGE_MAP: Record<string, string> = {
  NASDAQ: "NASDAQ",
  NYSE: "NYSE",
  AMEX: "AMEX",
};

let scriptPromise: Promise<void> | null = null;

function loadTradingViewScript(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  if (window.TradingView) {
    return Promise.resolve();
  }

  if (scriptPromise) {
    return scriptPromise;
  }

  scriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector('script[data-tradingview="true"]');
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("TradingView script failed")));
      return;
    }

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.dataset.tradingview = "true";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("TradingView script failed"));
    document.head.appendChild(script);
  });

  return scriptPromise;
}

export function TradingViewWidget({ symbol = "NASDAQ:AAPL", height = 480 }: TradingViewWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;
    const containerId = `tv_${symbol.replace(/[^a-zA-Z0-9]/g, "_")}_${Date.now()}`;
    container.innerHTML = `<div id="${containerId}" style="height:${height}px;width:100%"></div>`;

    const init = () => {
      if (cancelled || !window.TradingView || !document.getElementById(containerId)) return;

      new window.TradingView.widget({
        autosize: true,
        symbol,
        interval: "D",
        timezone: "America/New_York",
        theme: "dark",
        style: "1",
        locale: "en",
        toolbar_bg: "#09090b",
        enable_publishing: false,
        hide_top_toolbar: false,
        hide_legend: false,
        save_image: false,
        container_id: containerId,
        backgroundColor: "#09090b",
        gridColor: "rgba(39, 39, 42, 0.8)",
        studies: ["Volume@tv-basicstudies"],
      });
    };

    loadTradingViewScript()
      .then(init)
      .catch(() => {
        if (!cancelled && container) {
          container.innerHTML = `<div style="height:${height}px" class="flex items-center justify-center text-sm text-zinc-500">Chart unavailable — check your network connection.</div>`;
        }
      });

    return () => {
      cancelled = true;
      container.innerHTML = "";
    };
  }, [symbol, height]);

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden rounded-xl"
      style={{ minHeight: height }}
    />
  );
}

export function toTradingViewSymbol(ticker: string, exchange = "NASDAQ"): string {
  const ex = EXCHANGE_MAP[exchange] ?? "NASDAQ";
  return `${ex}:${ticker}`;
}
