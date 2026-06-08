/** Nisab weights per common scholarly standards (grams). */
export const NISAB_GOLD_GRAMS = 85;
export const NISAB_SILVER_GRAMS = 595;

/** Zakat rate: 2.5% */
export const ZAKAT_RATE = 0.025;

export const ASSET_FIELD_LABELS: Record<
  keyof import("@/types/zakat").ZakatAssetInputs,
  string
> = {
  cashInBank: "Cash in Bank Accounts",
  savings: "Savings",
  stocksInvestments: "Stocks & Investments",
  goldValue: "Gold Value",
  silverValue: "Silver Value",
  businessAssets: "Business Assets",
  moneyOwedToYou: "Money Owed to You",
};

export const DEDUCTION_FIELD_LABELS: Record<
  keyof import("@/types/zakat").ZakatDeductionInputs,
  string
> = {
  debts: "Debts",
  billsDueImmediately: "Bills Due Immediately",
};
