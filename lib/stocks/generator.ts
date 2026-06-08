import type { CompanyCatalogEntry, CompanyRecord } from "@/lib/stocks/types";

/** Deterministic pseudo-random from ticker — stable financials per symbol */
export function hashTicker(ticker: string): number {
  let hash = 0;
  for (let i = 0; i < ticker.length; i++) {
    hash = (hash << 5) - hash + ticker.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function seededValue(ticker: string, min: number, max: number, salt = 0): number {
  const hash = hashTicker(ticker + String(salt));
  const normalized = (hash % 1000) / 1000;
  return Math.round((min + normalized * (max - min)) * 10) / 10;
}

/** Generate financial fields for catalog entries without manual data */
export function generateFinancials(ticker: string, sector: string): Pick<
  CompanyRecord,
  "marketCapValue" | "interestBearingDebt" | "impureIncomeRatio"
> {
  const marketCapValue = seededValue(ticker, 5, 3500, 1);
  const baseDebtRatio =
    sector === "Financial Services"
      ? seededValue(ticker, 45, 95, 2)
      : sector === "Utilities" || sector === "Real Estate"
        ? seededValue(ticker, 20, 55, 2)
        : seededValue(ticker, 2, 38, 2);

  const interestBearingDebt =
    Math.round(((baseDebtRatio / 100) * marketCapValue) * 10) / 10;

  const impureIncomeRatio =
    sector === "Financial Services"
      ? seededValue(ticker, 60, 90, 3)
      : sector === "Consumer Staples"
        ? seededValue(ticker, 1, 8, 3)
        : seededValue(ticker, 0.2, 4, 3);

  return { marketCapValue, interestBearingDebt, impureIncomeRatio };
}

export function catalogEntryToRecord(entry: CompanyCatalogEntry): CompanyRecord {
  const financials = generateFinancials(entry.ticker, entry.sector);
  return { ...entry, ...financials };
}

/**
 * Expand catalog to N synthetic companies for load testing / demo scale.
 * Real tickers take priority; synthetic ones use sector templates.
 */
export function generateSyntheticCatalog(
  count: number,
  sectors: string[]
): CompanyCatalogEntry[] {
  const entries: CompanyCatalogEntry[] = [];
  for (let i = 0; i < count; i++) {
    const sector = sectors[i % sectors.length];
    const ticker = `HV${String(i + 1).padStart(4, "0")}`;
    entries.push({
      ticker,
      name: `${sector} Holdings ${i + 1}`,
      exchange: i % 2 === 0 ? "NASDAQ" : "NYSE",
      sector,
      industry: `${sector} Services`,
      description: `Mock ${sector.toLowerCase()} company for HalalVest screening demo (synthetic ticker).`,
    });
  }
  return entries;
}

export const CATALOG_SECTORS = [
  "Technology",
  "Healthcare",
  "Financial Services",
  "Consumer Discretionary",
  "Consumer Staples",
  "Energy",
  "Industrials",
  "Communication Services",
  "Utilities",
  "Real Estate",
  "Materials",
  "Automotive",
] as const;
