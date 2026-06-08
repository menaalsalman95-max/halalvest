import { analyzeCompany } from "@/lib/stocks/analyzer";
import {
  catalogEntryToRecord,
  CATALOG_SECTORS,
  generateSyntheticCatalog,
} from "@/lib/stocks/generator";
import { CATALOG_ENTRIES } from "@/lib/stocks/seeds/catalog";
import { DETAILED_COMPANIES } from "@/lib/stocks/seeds/detailed";
import type {
  CompanyRecord,
  StockAnalysisResult,
  StockSearchResponse,
} from "@/lib/stocks/types";
import type { Stock, StockSearchResult } from "@/types/stock";

/** Set to true to include 200 synthetic tickers (demo scale toward thousands) */
const INCLUDE_SYNTHETIC = true;
const SYNTHETIC_COUNT = 200;

let recordIndex: Map<string, CompanyRecord> | null = null;
const analysisCache = new Map<string, StockAnalysisResult>();

function buildIndex(): Map<string, CompanyRecord> {
  if (recordIndex) return recordIndex;

  const index = new Map<string, CompanyRecord>();

  for (const record of DETAILED_COMPANIES) {
    index.set(record.ticker.toUpperCase(), record);
  }

  for (const entry of CATALOG_ENTRIES) {
    const key = entry.ticker.toUpperCase();
    if (!index.has(key)) {
      index.set(key, catalogEntryToRecord(entry));
    }
  }

  if (INCLUDE_SYNTHETIC) {
    for (const entry of generateSyntheticCatalog(SYNTHETIC_COUNT, [...CATALOG_SECTORS])) {
      const key = entry.ticker.toUpperCase();
      if (!index.has(key)) {
        index.set(key, catalogEntryToRecord(entry));
      }
    }
  }

  recordIndex = index;
  return index;
}

function scoreSearchMatch(record: CompanyRecord, query: string): number {
  const q = query.toLowerCase();
  const ticker = record.ticker.toLowerCase();
  const name = record.name.toLowerCase();

  if (ticker === q) return 100;
  if (ticker.startsWith(q)) return 90;
  if (name.startsWith(q)) return 80;
  if (ticker.includes(q)) return 70;
  if (name.includes(q)) return 60;
  if (record.sector.toLowerCase().includes(q)) return 40;
  if (record.industry.toLowerCase().includes(q)) return 35;
  return 0;
}

export function getDatabaseSize(): number {
  return buildIndex().size;
}

export function getCompanyRecord(ticker: string): CompanyRecord | undefined {
  return buildIndex().get(ticker.toUpperCase());
}

export function analyzeTicker(ticker: string): StockAnalysisResult | undefined {
  const key = ticker.toUpperCase();
  const cached = analysisCache.get(key);
  if (cached) return { ...cached, cached: true };

  const record = getCompanyRecord(key);
  if (!record) return undefined;

  const result: StockAnalysisResult = {
    stock: analyzeCompany(record),
    source: record.overrides ? "detailed" : "dynamic",
    cached: false,
  };

  analysisCache.set(key, result);
  return result;
}

export function searchCompanies(query: string, limit = 8): StockSearchResponse {
  const normalized = query.trim();
  if (!normalized) {
    return { results: [], total: 0, query: normalized };
  }

  const index = buildIndex();
  const scored: { record: CompanyRecord; score: number }[] = [];

  for (const record of index.values()) {
    const score = scoreSearchMatch(record, normalized);
    if (score > 0) scored.push({ record, score });
  }

  scored.sort((a, b) => b.score - a.score || a.record.ticker.localeCompare(b.record.ticker));

  const total = scored.length;
  const results: StockSearchResult[] = scored.slice(0, limit).map(({ record }) => {
    const analysis = analyzeCompany(record);
    return {
      ticker: record.ticker,
      name: record.name,
      sector: record.sector,
      status: analysis.status,
      score: analysis.complianceScore.overall,
    };
  });

  return { results, total, query: normalized };
}

/** Backward-compatible exports for existing imports */
export function searchStocks(query: string, limit = 8): Stock[] {
  return searchCompanies(query, limit).results.map((r) => {
    const result = analyzeTicker(r.ticker);
    return result!.stock;
  });
}

export function autocompleteStocks(query: string, limit = 6): StockSearchResult[] {
  return searchCompanies(query, limit).results;
}

export function getStockByTicker(ticker: string): Stock | undefined {
  return analyzeTicker(ticker)?.stock;
}

export function getAllTickers(): string[] {
  return [...buildIndex().keys()];
}

export const STOCK_DATABASE: Stock[] = [];

/** Lazy-populated snapshot — prefer searchCompanies/analyzeTicker for scale */
export function getStockDatabaseSnapshot(limit = 50): Stock[] {
  const index = buildIndex();
  return [...index.values()]
    .slice(0, limit)
    .map((record) => analyzeCompany(record));
}

export const SAMPLE_STOCKS = STOCK_DATABASE;
