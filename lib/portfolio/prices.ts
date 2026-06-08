import { hashTicker } from "@/lib/stocks/generator";

/** Deterministic simulated share price for portfolio trading */
export function getSimulatedPrice(ticker: string, marketCapValue?: number): number {
  const hash = hashTicker(ticker);
  const seed = (hash % 1000) / 1000;

  if (marketCapValue && marketCapValue > 0) {
    const base = Math.sqrt(marketCapValue) * (2.5 + seed * 4);
    return Math.round(Math.max(8, Math.min(980, base)) * 100) / 100;
  }

  return Math.round((20 + seed * 380) * 100) / 100;
}

/** Simulated daily change — stable within the same UTC day */
export function getSimulatedDayChange(ticker: string): number {
  const dayKey = new Date().toISOString().slice(0, 10);
  const hash = hashTicker(`${ticker}:${dayKey}`);
  return Math.round(((hash % 400) - 200) / 100) / 100;
}
