import {
  COMPLIANCE_THRESHOLDS,
  SCORE_WEIGHTS,
  STATUS_SCORES,
  STATUS_THRESHOLDS,
} from "@/lib/compliance/constants";
import type {
  ComplianceScore,
  ComplianceStatus,
  ScoreBreakdownItem,
  StockScreening,
} from "@/types/stock";

/** Map a compliance status to a numeric score (0–100) */
export function statusToScore(status: ComplianceStatus): number {
  return STATUS_SCORES[status];
}

/**
 * Score debt ratio on a 0–100 scale.
 * 0% debt → 100; at 33% threshold → ~65; above threshold drops sharply.
 */
export function scoreDebtRatio(ratio: number, threshold = COMPLIANCE_THRESHOLDS.debtRatio): number {
  if (ratio <= 0) return 100;
  if (ratio <= threshold) {
    return Math.round(100 - (ratio / threshold) * 35);
  }
  return Math.max(0, Math.round(65 - ((ratio - threshold) / (100 - threshold)) * 65));
}

/** Score impure income ratio — AAOIFI 5% threshold */
export function scoreImpureIncome(ratio: number, threshold = COMPLIANCE_THRESHOLDS.impureIncome): number {
  if (ratio <= 0) return 100;
  if (ratio <= threshold) {
    return Math.round(100 - (ratio / threshold) * 40);
  }
  return Math.max(0, Math.round(60 - ((ratio - threshold) / 10) * 60));
}

/** Derive overall compliance status from weighted score */
export function scoreToStatus(overall: number): ComplianceStatus {
  if (overall >= STATUS_THRESHOLDS.halal) return "halal";
  if (overall >= STATUS_THRESHOLDS.questionable) return "questionable";
  return "haram";
}

/**
 * Calculate confidence based on score clarity and screening consistency.
 * High confidence when all categories agree; lower when mixed signals.
 */
export function calculateConfidence(
  breakdown: ScoreBreakdownItem[],
  overall: number
): number {
  const statuses = breakdown.map((b) => b.status);
  const allSame = statuses.every((s) => s === statuses[0]);
  const spread = Math.max(...breakdown.map((b) => b.score)) - Math.min(...breakdown.map((b) => b.score));

  let confidence = 75;

  if (allSame) confidence += 15;
  else if (spread <= 30) confidence += 8;
  else confidence -= 10;

  if (overall >= 90 || overall <= 15) confidence += 10;
  if (spread > 60) confidence -= 12;

  return Math.min(98, Math.max(62, Math.round(confidence)));
}

/** Build full compliance score from screening data */
export function buildComplianceScore(screening: StockScreening): ComplianceScore {
  const breakdown: ScoreBreakdownItem[] = [
    {
      id: "businessActivities",
      label: "Business Activities",
      score: screening.businessActivities.score,
      weight: SCORE_WEIGHTS.businessActivities,
      status: screening.businessActivities.status,
      summary: screening.businessActivities.summary,
    },
    {
      id: "debtRatio",
      label: "Debt Ratio",
      score: screening.debtRatio.score,
      weight: SCORE_WEIGHTS.debtRatio,
      status: screening.debtRatio.status,
      summary: screening.debtRatio.summary,
    },
    {
      id: "sectorScreening",
      label: "Sector Analysis",
      score: screening.sectorScreening.score,
      weight: SCORE_WEIGHTS.sectorScreening,
      status: screening.sectorScreening.status,
      summary: screening.sectorScreening.summary,
    },
    {
      id: "impureIncome",
      label: "Impure Income",
      score: screening.impureIncome.score,
      weight: SCORE_WEIGHTS.impureIncome,
      status: screening.impureIncome.status,
      summary: screening.impureIncome.summary,
    },
  ];

  const overall = Math.round(
    breakdown.reduce((sum, item) => sum + item.score * item.weight, 0)
  );

  const status = scoreToStatus(overall);
  const confidence = calculateConfidence(breakdown, overall);

  return { overall, confidence, status, breakdown };
}

/** Format debt ratio formula for display */
export function formatDebtFormula(debt: number, marketCap: number): string {
  const ratio = marketCap > 0 ? ((debt / marketCap) * 100).toFixed(1) : "0.0";
  return `($${debt}B ÷ $${marketCap}B) × 100 = ${ratio}%`;
}

/** Calculate debt ratio from raw values */
export function calculateDebtRatio(interestBearingDebt: number, marketCapValue: number): number {
  if (marketCapValue <= 0) return 0;
  return Math.round((interestBearingDebt / marketCapValue) * 1000) / 10;
}

/** Determine debt ratio compliance status */
export function debtRatioStatus(ratio: number): ComplianceStatus {
  if (ratio > COMPLIANCE_THRESHOLDS.debtRatio) return "haram";
  if (ratio > COMPLIANCE_THRESHOLDS.debtRatio * 0.85) return "questionable";
  return "halal";
}

/** Determine impure income compliance status */
export function impureIncomeStatus(ratio: number): ComplianceStatus {
  if (ratio > COMPLIANCE_THRESHOLDS.impureIncome) return "haram";
  if (ratio > COMPLIANCE_THRESHOLDS.impureIncome * 0.6) return "questionable";
  return "halal";
}
