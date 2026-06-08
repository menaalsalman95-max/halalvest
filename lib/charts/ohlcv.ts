import { hashTicker } from "@/lib/stocks/generator";
import type { OHLCVBar } from "@/types/screener";

function seeded(seed: string, min: number, max: number): number {
  const hash = hashTicker(seed);
  return min + ((hash % 1000) / 1000) * (max - min);
}

/** Deterministic simulated daily OHLCV for demo charts */
export function generateOHLCV(ticker: string, basePrice: number, days = 90): OHLCVBar[] {
  const bars: OHLCVBar[] = [];
  let price = basePrice * (0.85 + seeded(ticker, 0, 0.15));
  const start = new Date();
  start.setDate(start.getDate() - days);

  for (let i = 0; i < days; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    if (date.getDay() === 0 || date.getDay() === 6) continue;

    const time = date.toISOString().slice(0, 10);
    const drift = seeded(`${ticker}:${time}`, -0.03, 0.03);
    const open = Math.round(price * 100) / 100;
    const close = Math.round(price * (1 + drift) * 100) / 100;
    const high = Math.round(Math.max(open, close) * (1 + seeded(`${time}:h`, 0, 0.015)) * 100) / 100;
    const low = Math.round(Math.min(open, close) * (1 - seeded(`${time}:l`, 0, 0.015)) * 100) / 100;
    const volume = Math.round(seeded(`${ticker}:v:${time}`, 500_000, 8_000_000));

    bars.push({ time, open, high, low, close, volume });
    price = close;
  }

  return bars;
}
