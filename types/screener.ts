import type { ComplianceStatus, Stock } from "@/types/stock";

export const FEATURED_TICKERS = [
  "AAPL",
  "MSFT",
  "NVDA",
  "AMZN",
  "META",
  "TSLA",
  "JPM",
  "KO",
] as const;

export type MarketCapFilter = "all" | "mega" | "large" | "mid" | "small";
export type HalalStatusFilter = "all" | ComplianceStatus;

export interface HalalScoreBreakdown {
  interestIncome: number;
  debtRatio: number;
  businessActivity: number;
}

export interface ScreenerStock {
  ticker: string;
  name: string;
  price: number;
  marketCap: string;
  marketCapValue: number;
  sector: string;
  industry: string;
  dividendYield: number;
  debtRatio: number;
  halalScore: number;
  status: ComplianceStatus;
  scores: HalalScoreBreakdown;
  stock: Stock;
}

export interface ScreenerFilters {
  query: string;
  sector: string;
  marketCap: MarketCapFilter;
  dividendYieldMax: number;
  debtRatioMax: number;
  halalStatus: HalalStatusFilter;
}

export const DEFAULT_FILTERS: ScreenerFilters = {
  query: "",
  sector: "all",
  marketCap: "all",
  dividendYieldMax: 10,
  debtRatioMax: 100,
  halalStatus: "all",
};

export interface OHLCVBar {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}
