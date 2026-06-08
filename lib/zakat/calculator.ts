import { NISAB_GOLD_GRAMS, NISAB_SILVER_GRAMS, ZAKAT_RATE } from "@/lib/zakat/constants";
import type {
  NisabBasis,
  ZakatAssetInputs,
  ZakatBreakdownLine,
  ZakatCalculationResult,
  ZakatCalculatorInputs,
  ZakatDeductionInputs,
  ZakatMetalPrices,
} from "@/types/zakat";

function sumAssets(assets: ZakatAssetInputs): { total: number; breakdown: ZakatBreakdownLine[] } {
  const entries = Object.entries(assets) as [keyof ZakatAssetInputs, number][];
  const breakdown: ZakatBreakdownLine[] = entries
    .filter(([, value]) => value > 0)
    .map(([key, value]) => ({
      label: key,
      value,
      type: "asset" as const,
    }));

  const total = entries.reduce((sum, [, value]) => sum + Math.max(0, value), 0);
  return { total, breakdown };
}

function sumDeductions(deductions: ZakatDeductionInputs): {
  total: number;
  breakdown: ZakatBreakdownLine[];
} {
  const entries = Object.entries(deductions) as [keyof ZakatDeductionInputs, number][];
  const breakdown: ZakatBreakdownLine[] = entries
    .filter(([, value]) => value > 0)
    .map(([key, value]) => ({
      label: key,
      value,
      type: "deduction" as const,
    }));

  const total = entries.reduce((sum, [, value]) => sum + Math.max(0, value), 0);
  return { total, breakdown };
}

export function getNisabThreshold(
  basis: NisabBasis,
  metalPrices: ZakatMetalPrices
): { threshold: number; grams: number } {
  if (basis === "gold") {
    return {
      threshold: NISAB_GOLD_GRAMS * metalPrices.goldPricePerGram,
      grams: NISAB_GOLD_GRAMS,
    };
  }

  return {
    threshold: NISAB_SILVER_GRAMS * metalPrices.silverPricePerGram,
    grams: NISAB_SILVER_GRAMS,
  };
}

export function calculateZakat(inputs: ZakatCalculatorInputs): ZakatCalculationResult {
  const { total: totalAssets, breakdown: assetBreakdown } = sumAssets(inputs.assets);
  const { total: totalDeductions, breakdown: deductionBreakdown } = sumDeductions(
    inputs.deductions
  );

  const netWealth = Math.max(0, totalAssets - totalDeductions);
  const { threshold: nisabThreshold, grams: nisabGrams } = getNisabThreshold(
    inputs.nisabBasis,
    inputs.metalPrices
  );

  const isZakatDue = netWealth >= nisabThreshold;
  const zakatAmount = isZakatDue ? netWealth * ZAKAT_RATE : 0;

  return {
    totalAssets,
    totalDeductions,
    netWealth,
    nisabThreshold,
    nisabBasis: inputs.nisabBasis,
    nisabGrams,
    isZakatDue,
    zakatAmount,
    assetBreakdown,
    deductionBreakdown,
  };
}
