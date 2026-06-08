import {
  buildComplianceScore,
  calculateDebtRatio,
  debtRatioStatus,
  formatDebtFormula,
  impureIncomeStatus,
  scoreDebtRatio,
  scoreImpureIncome,
  statusToScore,
} from "@/lib/compliance/scoring-engine";
import { COMPLIANCE_THRESHOLDS } from "@/lib/compliance/constants";
import { classifySector } from "@/lib/stocks/sector-classifier";
import type { CompanyRecord } from "@/lib/stocks/types";
import type { ComplianceStatus, Stock, StockScreening } from "@/types/stock";

function formatMarketCap(billions: number): string {
  if (billions >= 1000) return `$${(billions / 1000).toFixed(1)}T`;
  return `$${billions}B`;
}

function buildReasoning(
  record: CompanyRecord,
  screening: StockScreening,
  classification: ReturnType<typeof classifySector>
): string[] {
  if (record.overrides?.reasoning?.length) {
    return record.overrides.reasoning;
  }

  const reasons: string[] = [
    `${record.name} operates in ${record.sector} (${record.industry}). ${classification.sectorSummary}`,
    `Interest-bearing debt ratio of ${screening.debtRatio.ratio}% vs. ${COMPLIANCE_THRESHOLDS.debtRatio}% AAOIFI threshold — classified as ${screening.debtRatio.status.toUpperCase()}.`,
    `Non-compliant revenue exposure of ${screening.impureIncome.ratio}% — ${screening.impureIncome.status.toUpperCase()} under impure income screening.`,
    `Business activity screening: ${screening.businessActivities.summary}`,
  ];

  if (classification.flags.length > 0) {
    reasons.push(`Sector flags: ${classification.flags.join("; ")}.`);
  }

  reasons.push(
    "This automated screening uses widely accepted criteria — scholarly opinions may vary. Consult a qualified Islamic finance scholar for personal guidance."
  );

  return reasons;
}

/** Run full Shariah screening on any company record — reusable at any scale */
export function analyzeCompany(record: CompanyRecord): Stock {
  const o = record.overrides;
  const debtRatio = calculateDebtRatio(record.interestBearingDebt, record.marketCapValue);
  const debtStatus = debtRatioStatus(debtRatio);
  const impureStatus = impureIncomeStatus(record.impureIncomeRatio);
  const classification = classifySector(record.sector, record.industry, record.impureIncomeRatio);

  const businessStatus: ComplianceStatus =
    o?.businessStatus ?? classification.businessStatus;
  const sectorStatus: ComplianceStatus = o?.sectorStatus ?? classification.sectorStatus;
  const revenueBreakdown =
    o?.revenueBreakdown ?? classification.revenueBreakdown;
  const prohibitedExposure =
    o?.prohibitedExposure ?? record.impureIncomeRatio;

  const screening: StockScreening = {
    businessActivities: {
      status: businessStatus,
      score: statusToScore(businessStatus),
      summary: o?.businessSummary ?? classification.businessSummary,
      details: o?.businessDetails ?? classification.businessDetails,
      revenueBreakdown,
      prohibitedExposure,
    },
    debtRatio: {
      status: debtStatus,
      score: scoreDebtRatio(debtRatio),
      ratio: debtRatio,
      threshold: COMPLIANCE_THRESHOLDS.debtRatio,
      interestBearingDebt: record.interestBearingDebt,
      marketCapValue: record.marketCapValue,
      formula: formatDebtFormula(record.interestBearingDebt, record.marketCapValue),
      summary:
        debtStatus === "halal"
          ? `Interest-bearing debt of ${debtRatio}% is below the ${COMPLIANCE_THRESHOLDS.debtRatio}% AAOIFI threshold.`
          : debtStatus === "questionable"
            ? `Debt ratio of ${debtRatio}% is near the ${COMPLIANCE_THRESHOLDS.debtRatio}% limit — proceed with caution.`
            : `Debt ratio of ${debtRatio}% exceeds the ${COMPLIANCE_THRESHOLDS.debtRatio}% Shariah threshold.`,
    },
    sectorScreening: {
      status: sectorStatus,
      score: statusToScore(sectorStatus),
      sector: record.sector,
      industry: record.industry,
      summary: o?.sectorSummary ?? classification.sectorSummary,
      flags: o?.sectorFlags ?? classification.flags,
      riskLevel: o?.riskLevel ?? classification.riskLevel,
    },
    impureIncome: {
      status: impureStatus,
      score: scoreImpureIncome(record.impureIncomeRatio),
      ratio: record.impureIncomeRatio,
      threshold: COMPLIANCE_THRESHOLDS.impureIncome,
      summary:
        record.impureIncomeRatio <= COMPLIANCE_THRESHOLDS.impureIncome
          ? `Non-compliant revenue of ${record.impureIncomeRatio}% is within the ${COMPLIANCE_THRESHOLDS.impureIncome}% purification threshold.`
          : `Non-compliant revenue of ${record.impureIncomeRatio}% exceeds the ${COMPLIANCE_THRESHOLDS.impureIncome}% threshold.`,
    },
    reasoning: [],
  };

  screening.reasoning = buildReasoning(record, screening, classification);

  const complianceScore = buildComplianceScore(screening);

  return {
    ticker: record.ticker,
    name: record.name,
    exchange: record.exchange,
    sector: record.sector,
    industry: record.industry,
    description: record.description,
    marketCap: formatMarketCap(record.marketCapValue),
    marketCapValue: record.marketCapValue,
    status: complianceScore.status,
    complianceScore,
    screening,
  };
}
