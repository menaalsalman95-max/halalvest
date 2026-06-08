import type { ComplianceStatus } from "@/types/stock";

export const STARTING_BALANCE = 10_000;

export type TradeAction = "buy" | "sell";

export interface Holding {
  ticker: string;
  shares: number;
  avgCost: number;
}

export interface Transaction {
  id: string;
  type: TradeAction;
  ticker: string;
  shares: number;
  price: number;
  total: number;
  timestamp: string;
}

export interface UserPortfolio {
  userId: string;
  cash: number;
  startingBalance: number;
  createdAt: string;
  updatedAt: string;
  holdings: Record<string, Holding>;
  watchlist: string[];
  transactions: Transaction[];
}

export interface EnrichedHolding {
  ticker: string;
  name: string;
  sector: string;
  shares: number;
  avgCost: number;
  price: number;
  marketValue: number;
  costBasis: number;
  gainLoss: number;
  gainLossPct: number;
  dayChangePct: number;
  weight: number;
  status: ComplianceStatus;
}

export interface WatchlistItem {
  ticker: string;
  name: string;
  sector: string;
  price: number;
  dayChangePct: number;
  status: ComplianceStatus;
  score: number;
}

export interface PortfolioSnapshot {
  cash: number;
  startingBalance: number;
  investedValue: number;
  totalValue: number;
  totalReturn: number;
  totalReturnPct: number;
  dayChange: number;
  dayChangePct: number;
  halalCount: number;
  totalHoldings: number;
  sectorCount: number;
  holdings: EnrichedHolding[];
  watchlist: WatchlistItem[];
  transactions: Transaction[];
  performanceHistory: { label: string; value: number }[];
  sectorAllocation: { label: string; value: number }[];
}

export interface TradeRequest {
  action: TradeAction;
  ticker: string;
  shares: number;
}
