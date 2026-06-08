import { randomUUID } from "crypto";
import { analyzeTicker } from "@/lib/stocks/repository";
import { getSimulatedDayChange, getSimulatedPrice } from "@/lib/portfolio/prices";
import { loadPortfolio, savePortfolio } from "@/lib/portfolio/store";
import type {
  EnrichedHolding,
  PortfolioSnapshot,
  TradeAction,
  Transaction,
  UserPortfolio,
  WatchlistItem,
} from "@/types/portfolio";

function enrichHolding(
  holding: { ticker: string; shares: number; avgCost: number },
  investedTotal: number
): EnrichedHolding | null {
  const result = analyzeTicker(holding.ticker);
  if (!result) return null;

  const { stock } = result;
  const price = getSimulatedPrice(stock.ticker, stock.marketCapValue);
  const marketValue = price * holding.shares;
  const costBasis = holding.avgCost * holding.shares;
  const gainLoss = marketValue - costBasis;
  const gainLossPct = costBasis > 0 ? (gainLoss / costBasis) * 100 : 0;

  return {
    ticker: stock.ticker,
    name: stock.name,
    sector: stock.sector,
    shares: holding.shares,
    avgCost: holding.avgCost,
    price,
    marketValue,
    costBasis,
    gainLoss,
    gainLossPct,
    dayChangePct: getSimulatedDayChange(stock.ticker),
    weight: investedTotal > 0 ? (marketValue / investedTotal) * 100 : 0,
    status: stock.status,
  };
}

function enrichWatchlistItem(ticker: string): WatchlistItem | null {
  const result = analyzeTicker(ticker);
  if (!result) return null;

  const { stock } = result;
  return {
    ticker: stock.ticker,
    name: stock.name,
    sector: stock.sector,
    price: getSimulatedPrice(stock.ticker, stock.marketCapValue),
    dayChangePct: getSimulatedDayChange(stock.ticker),
    status: stock.status,
    score: stock.complianceScore.overall,
  };
}

function buildPerformanceHistory(
  portfolio: UserPortfolio,
  totalValue: number
): { label: string; value: number }[] {
  const points: { label: string; value: number }[] = [];
  const txs = [...portfolio.transactions].reverse();

  if (txs.length === 0) {
    return [
      { label: "Start", value: portfolio.startingBalance },
      { label: "Now", value: totalValue },
    ];
  }

  let runningCash = portfolio.startingBalance;
  const holdings: Record<string, { shares: number }> = {};

  points.push({ label: "Start", value: portfolio.startingBalance });

  txs.forEach((tx, index) => {
    if (tx.type === "buy") {
      runningCash -= tx.total;
      holdings[tx.ticker] = { shares: (holdings[tx.ticker]?.shares ?? 0) + tx.shares };
    } else {
      runningCash += tx.total;
      const current = holdings[tx.ticker]?.shares ?? 0;
      if (current - tx.shares <= 0) delete holdings[tx.ticker];
      else holdings[tx.ticker] = { shares: current - tx.shares };
    }

    let invested = 0;
    for (const [ticker, h] of Object.entries(holdings)) {
      const result = analyzeTicker(ticker);
      if (result) {
        invested += getSimulatedPrice(ticker, result.stock.marketCapValue) * h.shares;
      }
    }

    points.push({
      label: `#${index + 1}`,
      value: Math.round((runningCash + invested) * 100) / 100,
    });
  });

  points.push({ label: "Now", value: totalValue });
  return points.slice(-8);
}

function buildSectorAllocation(holdings: EnrichedHolding[]): { label: string; value: number }[] {
  const sectors = new Map<string, number>();
  for (const h of holdings) {
    sectors.set(h.sector, (sectors.get(h.sector) ?? 0) + h.marketValue);
  }

  const total = holdings.reduce((sum, h) => sum + h.marketValue, 0);
  if (total === 0) return [];

  return [...sectors.entries()]
    .map(([label, value]) => ({
      label,
      value: Math.round((value / total) * 1000) / 10,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);
}

export function buildPortfolioSnapshot(portfolio: UserPortfolio): PortfolioSnapshot {
  const holdingsList = Object.values(portfolio.holdings);
  const preliminary = holdingsList
    .map((h) => {
      const result = analyzeTicker(h.ticker);
      if (!result) return 0;
      return getSimulatedPrice(h.ticker, result.stock.marketCapValue) * h.shares;
    })
    .reduce((sum, v) => sum + v, 0);

  const holdings = holdingsList
    .map((h) => enrichHolding(h, preliminary))
    .filter((h): h is EnrichedHolding => h !== null)
    .sort((a, b) => b.marketValue - a.marketValue);

  const investedValue = holdings.reduce((sum, h) => sum + h.marketValue, 0);
  const totalValue = portfolio.cash + investedValue;
  const totalReturn = totalValue - portfolio.startingBalance;
  const totalReturnPct =
    portfolio.startingBalance > 0 ? (totalReturn / portfolio.startingBalance) * 100 : 0;

  const dayChange = holdings.reduce(
    (sum, h) => sum + h.marketValue * (h.dayChangePct / 100),
    0
  );
  const dayChangePct = investedValue > 0 ? (dayChange / investedValue) * 100 : 0;

  const watchlist = portfolio.watchlist
    .map(enrichWatchlistItem)
    .filter((w): w is WatchlistItem => w !== null);

  const halalCount = holdings.filter((h) => h.status === "halal").length;
  const sectors = new Set(holdings.map((h) => h.sector));

  return {
    cash: portfolio.cash,
    startingBalance: portfolio.startingBalance,
    investedValue,
    totalValue,
    totalReturn,
    totalReturnPct,
    dayChange,
    dayChangePct,
    halalCount,
    totalHoldings: holdings.length,
    sectorCount: sectors.size,
    holdings,
    watchlist,
    transactions: portfolio.transactions,
    performanceHistory: buildPerformanceHistory(portfolio, totalValue),
    sectorAllocation: buildSectorAllocation(holdings),
  };
}

export async function getPortfolioSnapshot(userId: string): Promise<PortfolioSnapshot> {
  const portfolio = await loadPortfolio(userId);
  return buildPortfolioSnapshot(portfolio);
}

export async function executeTrade(
  userId: string,
  action: TradeAction,
  ticker: string,
  shares: number
): Promise<PortfolioSnapshot> {
  if (shares <= 0 || !Number.isFinite(shares)) {
    throw new Error("Share quantity must be a positive number.");
  }

  const upper = ticker.toUpperCase().trim();
  const result = analyzeTicker(upper);
  if (!result) {
    throw new Error(`"${upper}" is not in the HalalVest stock database.`);
  }

  const price = getSimulatedPrice(upper, result.stock.marketCapValue);
  const total = Math.round(price * shares * 100) / 100;
  const portfolio = await loadPortfolio(userId);

  if (action === "buy") {
    if (total > portfolio.cash + 0.001) {
      throw new Error(
        `Insufficient cash. Need ${total.toFixed(2)} but only ${portfolio.cash.toFixed(2)} available.`
      );
    }

    const existing = portfolio.holdings[upper];
    if (existing) {
      const newShares = existing.shares + shares;
      existing.avgCost = Math.round(((existing.avgCost * existing.shares + total) / newShares) * 100) / 100;
      existing.shares = Math.round(newShares * 10000) / 10000;
    } else {
      portfolio.holdings[upper] = { ticker: upper, shares, avgCost: price };
    }
    portfolio.cash = Math.round((portfolio.cash - total) * 100) / 100;
  } else {
    const existing = portfolio.holdings[upper];
    if (!existing || existing.shares < shares - 0.0001) {
      throw new Error(`Insufficient shares. You own ${existing?.shares ?? 0} ${upper}.`);
    }

    existing.shares = Math.round((existing.shares - shares) * 10000) / 10000;
    if (existing.shares <= 0.0001) {
      delete portfolio.holdings[upper];
    }
    portfolio.cash = Math.round((portfolio.cash + total) * 100) / 100;
  }

  const tx: Transaction = {
    id: randomUUID(),
    type: action,
    ticker: upper,
    shares,
    price,
    total,
    timestamp: new Date().toISOString(),
  };

  portfolio.transactions.unshift(tx);
  portfolio.transactions = portfolio.transactions.slice(0, 100);

  await savePortfolio(portfolio);
  return buildPortfolioSnapshot(portfolio);
}

export async function addToWatchlist(userId: string, ticker: string): Promise<PortfolioSnapshot> {
  const upper = ticker.toUpperCase().trim();
  if (!analyzeTicker(upper)) {
    throw new Error(`"${upper}" is not in the HalalVest stock database.`);
  }

  const portfolio = await loadPortfolio(userId);
  if (!portfolio.watchlist.includes(upper)) {
    portfolio.watchlist.unshift(upper);
    portfolio.watchlist = portfolio.watchlist.slice(0, 20);
    await savePortfolio(portfolio);
  }
  return buildPortfolioSnapshot(portfolio);
}

export async function removeFromWatchlist(
  userId: string,
  ticker: string
): Promise<PortfolioSnapshot> {
  const upper = ticker.toUpperCase().trim();
  const portfolio = await loadPortfolio(userId);
  portfolio.watchlist = portfolio.watchlist.filter((t) => t !== upper);
  await savePortfolio(portfolio);
  return buildPortfolioSnapshot(portfolio);
}

export async function resetPortfolio(userId: string): Promise<PortfolioSnapshot> {
  const { createDefaultPortfolio, savePortfolio: save } = await import("@/lib/portfolio/store");
  const portfolio = createDefaultPortfolio(userId);
  await save(portfolio);
  return buildPortfolioSnapshot(portfolio);
}
