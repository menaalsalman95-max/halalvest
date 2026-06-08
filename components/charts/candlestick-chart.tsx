"use client";

import { useEffect, useRef } from "react";
import {
  CandlestickSeries,
  ColorType,
  HistogramSeries,
  createChart,
  type IChartApi,
  type Time,
} from "lightweight-charts";
import type { OHLCVBar } from "@/types/screener";

interface CandlestickChartProps {
  data: OHLCVBar[];
  className?: string;
  height?: number;
}

export function CandlestickChart({ data, className, height = 380 }: CandlestickChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (!containerRef.current || data.length === 0) return;

    const chart = createChart(containerRef.current, {
      width: containerRef.current.clientWidth,
      height,
      layout: {
        background: { type: ColorType.Solid, color: "#09090b" },
        textColor: "#a1a1aa",
        fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
      },
      grid: {
        vertLines: { color: "rgba(39, 39, 42, 0.6)" },
        horzLines: { color: "rgba(39, 39, 42, 0.6)" },
      },
      rightPriceScale: {
        borderColor: "rgba(63, 63, 70, 0.5)",
      },
      timeScale: {
        borderColor: "rgba(63, 63, 70, 0.5)",
        timeVisible: true,
        secondsVisible: false,
      },
      crosshair: {
        vertLine: { color: "rgba(16, 185, 129, 0.4)" },
        horzLine: { color: "rgba(16, 185, 129, 0.4)" },
      },
    });

    const candles = chart.addSeries(CandlestickSeries, {
      upColor: "#10b981",
      downColor: "#ef4444",
      borderVisible: false,
      wickUpColor: "#10b981",
      wickDownColor: "#ef4444",
    });

    candles.setData(
      data.map((bar) => ({
        time: bar.time as Time,
        open: bar.open,
        high: bar.high,
        low: bar.low,
        close: bar.close,
      }))
    );

    const volume = chart.addSeries(HistogramSeries, {
      priceFormat: { type: "volume" },
      priceScaleId: "volume",
    });

    chart.priceScale("volume").applyOptions({
      scaleMargins: { top: 0.82, bottom: 0 },
    });

    volume.setData(
      data.map((bar) => ({
        time: bar.time as Time,
        value: bar.volume,
        color: bar.close >= bar.open ? "rgba(16, 185, 129, 0.45)" : "rgba(239, 68, 68, 0.45)",
      }))
    );

    chart.timeScale().fitContent();
    chartRef.current = chart;

    const handleResize = () => {
      if (containerRef.current) {
        chart.applyOptions({ width: containerRef.current.clientWidth });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
      chartRef.current = null;
    };
  }, [data, height]);

  return (
    <div
      className={className}
      ref={containerRef}
      style={{ height }}
      aria-label="Candlestick price chart"
    />
  );
}
