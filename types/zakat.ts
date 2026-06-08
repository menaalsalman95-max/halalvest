export type NisabBasis = "gold" | "silver";

export interface ZakatAssetInputs {
  cashInBank: number;
  savings: number;
  stocksInvestments: number;
  goldValue: number;
  silverValue: number;
  businessAssets: number;
  moneyOwedToYou: number;
}

export interface ZakatDeductionInputs {
  debts: number;
  billsDueImmediately: number;
}

export interface ZakatMetalPrices {
  goldPricePerGram: number;
  silverPricePerGram: number;
}

export interface ZakatCalculatorInputs {
  assets: ZakatAssetInputs;
  deductions: ZakatDeductionInputs;
  nisabBasis: NisabBasis;
  metalPrices: ZakatMetalPrices;
}

export interface ZakatBreakdownLine {
  label: string;
  value: number;
  type: "asset" | "deduction";
}

export interface ZakatCalculationResult {
  totalAssets: number;
  totalDeductions: number;
  netWealth: number;
  nisabThreshold: number;
  nisabBasis: NisabBasis;
  nisabGrams: number;
  isZakatDue: boolean;
  zakatAmount: number;
  assetBreakdown: ZakatBreakdownLine[];
  deductionBreakdown: ZakatBreakdownLine[];
}

export const EMPTY_ASSETS: ZakatAssetInputs = {
  cashInBank: 0,
  savings: 0,
  stocksInvestments: 0,
  goldValue: 0,
  silverValue: 0,
  businessAssets: 0,
  moneyOwedToYou: 0,
};

export const EMPTY_DEDUCTIONS: ZakatDeductionInputs = {
  debts: 0,
  billsDueImmediately: 0,
};

export const DEFAULT_METAL_PRICES: ZakatMetalPrices = {
  goldPricePerGram: 78,
  silverPricePerGram: 0.92,
};
