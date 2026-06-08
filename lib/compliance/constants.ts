import type { ComplianceStatus } from "@/types/stock";

/** AAOIFI & widely accepted Shariah screening thresholds */
export const COMPLIANCE_THRESHOLDS = {
  debtRatio: 33,
  impureIncome: 5,
  prohibitedRevenue: 5,
} as const;

export const SCORE_WEIGHTS = {
  businessActivities: 0.4,
  debtRatio: 0.3,
  sectorScreening: 0.2,
  impureIncome: 0.1,
} as const;

export const STATUS_THRESHOLDS = {
  halal: 80,
  questionable: 50,
} as const;

export const STATUS_SCORES: Record<ComplianceStatus, number> = {
  halal: 100,
  questionable: 55,
  haram: 0,
};

export const STATUS_LABELS: Record<ComplianceStatus, string> = {
  halal: "Halal",
  questionable: "Questionable",
  haram: "Haram",
};

export const RISK_COLORS = {
  low: "text-emerald-600 dark:text-emerald-400",
  medium: "text-amber-600 dark:text-amber-400",
  high: "text-red-600 dark:text-red-400",
} as const;
