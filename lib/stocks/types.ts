import type { ComplianceStatus, Stock } from "@/types/stock";

/** Minimal company record — swap repository impl for DB/API at scale */
export interface CompanyRecord {
  ticker: string;
  name: string;
  exchange: string;
  sector: string;
  industry: string;
  description: string;
  marketCapValue: number;
  interestBearingDebt: number;
  impureIncomeRatio: number;
  /** Rich overrides for flagship / manually reviewed companies */
  overrides?: CompanyOverrides;
}

export interface CompanyOverrides {
  businessStatus?: ComplianceStatus;
  businessSummary?: string;
  businessDetails?: string[];
  revenueBreakdown?: { label: string; percentage: number; compliant: boolean }[];
  prohibitedExposure?: number;
  sectorStatus?: ComplianceStatus;
  sectorSummary?: string;
  sectorFlags?: string[];
  riskLevel?: "low" | "medium" | "high";
  reasoning?: string[];
}

export interface CompanyCatalogEntry {
  ticker: string;
  name: string;
  exchange: string;
  sector: string;
  industry: string;
  description: string;
}

export interface StockAnalysisResult {
  stock: Stock;
  source: "detailed" | "dynamic";
  cached: boolean;
}

export interface StockSearchResponse {
  results: import("@/types/stock").StockSearchResult[];
  total: number;
  query: string;
}

export interface StockExplainResponse {
  explanation: string;
  educational: true;
  ticker: string;
}
