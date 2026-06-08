export type ComplianceStatus = "halal" | "questionable" | "haram";

export interface ScoreBreakdownItem {
  id: "businessActivities" | "debtRatio" | "sectorScreening" | "impureIncome";
  label: string;
  score: number;
  weight: number;
  status: ComplianceStatus;
  summary: string;
}

export interface ComplianceScore {
  overall: number;
  confidence: number;
  status: ComplianceStatus;
  breakdown: ScoreBreakdownItem[];
}

export interface BusinessActivityScreening {
  status: ComplianceStatus;
  score: number;
  summary: string;
  details: string[];
  revenueBreakdown: { label: string; percentage: number; compliant: boolean }[];
  prohibitedExposure: number;
}

export interface DebtRatioScreening {
  status: ComplianceStatus;
  score: number;
  ratio: number;
  threshold: number;
  interestBearingDebt: number;
  marketCapValue: number;
  formula: string;
  summary: string;
}

export interface SectorScreening {
  status: ComplianceStatus;
  score: number;
  sector: string;
  industry: string;
  summary: string;
  flags: string[];
  riskLevel: "low" | "medium" | "high";
}

export interface ImpureIncomeScreening {
  status: ComplianceStatus;
  score: number;
  ratio: number;
  threshold: number;
  summary: string;
}

export interface StockScreening {
  businessActivities: BusinessActivityScreening;
  debtRatio: DebtRatioScreening;
  sectorScreening: SectorScreening;
  impureIncome: ImpureIncomeScreening;
  reasoning: string[];
}

export interface Stock {
  ticker: string;
  name: string;
  exchange: string;
  sector: string;
  industry: string;
  description: string;
  marketCap: string;
  marketCapValue: number;
  status: ComplianceStatus;
  complianceScore: ComplianceScore;
  screening: StockScreening;
}

export interface StockSearchResult {
  ticker: string;
  name: string;
  sector: string;
  status: ComplianceStatus;
  score: number;
}
