import { analyzeCompany } from "@/lib/stocks/analyzer";
import { catalogEntryToRecord, hashTicker } from "@/lib/stocks/generator";
import { CATALOG_ENTRIES } from "@/lib/stocks/seeds/catalog";
import { DETAILED_COMPANIES } from "@/lib/stocks/seeds/detailed";
import type { CompanyRecord } from "@/lib/stocks/types";
import { getSimulatedPrice } from "@/lib/portfolio/prices";
import type { ScreenerStock } from "@/types/screener";
import { FEATURED_TICKERS } from "@/types/screener";

function getDividendYield(ticker: string): number {
  const hash = hashTicker(`${ticker}:div`);
  return Math.round((hash % 350) / 100) / 100;
}

function recordToScreener(record: CompanyRecord): ScreenerStock {
  const stock = analyzeCompany(record);
  return {
    ticker: stock.ticker,
    name: stock.name,
    price: getSimulatedPrice(stock.ticker, stock.marketCapValue),
    marketCap: stock.marketCap,
    marketCapValue: stock.marketCapValue,
    sector: stock.sector,
    industry: stock.industry,
    dividendYield: getDividendYield(stock.ticker),
    debtRatio: stock.screening.debtRatio.ratio,
    halalScore: stock.complianceScore.overall,
    status: stock.status,
    scores: {
      interestIncome: stock.screening.impureIncome.score,
      debtRatio: stock.screening.debtRatio.score,
      businessActivity: stock.screening.businessActivities.score,
    },
    stock,
  };
}

function buildRecords(): CompanyRecord[] {
  const index = new Map<string, CompanyRecord>();

  for (const record of DETAILED_COMPANIES) {
    index.set(record.ticker.toUpperCase(), record);
  }

  for (const entry of CATALOG_ENTRIES) {
    const key = entry.ticker.toUpperCase();
    if (!index.has(key)) {
      index.set(key, catalogEntryToRecord(entry));
    }
  }

  return [...index.values()];
}

const ALL_RECORDS = buildRecords();

export const SCREENER_DATASET: ScreenerStock[] = ALL_RECORDS.map(recordToScreener).sort(
  (a, b) => b.marketCapValue - a.marketCapValue
);

export const FEATURED_STOCKS: ScreenerStock[] = FEATURED_TICKERS.map((ticker) =>
  SCREENER_DATASET.find((s) => s.ticker === ticker)
).filter((stock): stock is ScreenerStock => Boolean(stock));

export const SCREENER_SECTORS: string[] = [
  "all",
  ...new Set(SCREENER_DATASET.map((s) => s.sector)).values(),
].sort();

export function getScreenerStock(ticker: string): ScreenerStock | undefined {
  return SCREENER_DATASET.find((s) => s.ticker === ticker.toUpperCase());
}

export function filterScreenerStocks(
  stocks: ScreenerStock[],
  filters: import("@/types/screener").ScreenerFilters
): ScreenerStock[] {
  const q = filters.query.trim().toLowerCase();

  return stocks.filter((s) => {
    if (q) {
      const match =
        s.ticker.toLowerCase().includes(q) ||
        s.name.toLowerCase().includes(q) ||
        s.sector.toLowerCase().includes(q);
      if (!match) return false;
    }

    if (filters.sector !== "all" && s.sector !== filters.sector) return false;
    if (filters.halalStatus !== "all" && s.status !== filters.halalStatus) return false;
    if (s.dividendYield > filters.dividendYieldMax) return false;
    if (s.debtRatio > filters.debtRatioMax) return false;

    switch (filters.marketCap) {
      case "mega":
        if (s.marketCapValue < 200) return false;
        break;
      case "large":
        if (s.marketCapValue < 10 || s.marketCapValue >= 200) return false;
        break;
      case "mid":
        if (s.marketCapValue < 2 || s.marketCapValue >= 10) return false;
        break;
      case "small":
        if (s.marketCapValue >= 2) return false;
        break;
    }

    return true;
  });
}
