import { promises as fs } from "fs";
import path from "path";
import type { UserPortfolio } from "@/types/portfolio";
import { STARTING_BALANCE } from "@/types/portfolio";

const DATA_DIR = path.join(process.cwd(), "data", "portfolios");

function portfolioPath(userId: string): string {
  const safeId = userId.replace(/[^a-zA-Z0-9_-]/g, "_");
  return path.join(DATA_DIR, `${safeId}.json`);
}

export function createDefaultPortfolio(userId: string): UserPortfolio {
  const now = new Date().toISOString();
  return {
    userId,
    cash: STARTING_BALANCE,
    startingBalance: STARTING_BALANCE,
    createdAt: now,
    updatedAt: now,
    holdings: {},
    watchlist: ["AAPL", "TSLA", "NVDA", "MSFT"],
    transactions: [],
  };
}

export async function loadPortfolio(userId: string): Promise<UserPortfolio> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const filePath = portfolioPath(userId);

  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as UserPortfolio;
  } catch {
    const portfolio = createDefaultPortfolio(userId);
    await savePortfolio(portfolio);
    return portfolio;
  }
}

export async function savePortfolio(portfolio: UserPortfolio): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  portfolio.updatedAt = new Date().toISOString();
  await fs.writeFile(portfolioPath(portfolio.userId), JSON.stringify(portfolio, null, 2), "utf-8");
}
