import { NextResponse } from "next/server";
import { analyzeTicker } from "@/lib/stocks/repository";
import { generateStockExplanation } from "@/lib/ai/stock-explanation";
import { isOpenAIConfigured } from "@/lib/env";

export const runtime = "nodejs";

interface RouteParams {
  params: Promise<{ ticker: string }>;
}

export async function POST(_request: Request, { params }: RouteParams) {
  const { ticker } = await params;
  const result = analyzeTicker(ticker);

  if (!result) {
    return NextResponse.json(
      { error: "not_found", message: `Ticker "${ticker.toUpperCase()}" not in database.` },
      { status: 404 }
    );
  }

  const explanation = await generateStockExplanation(result.stock);

  return NextResponse.json({
    ticker: result.stock.ticker,
    explanation,
    educational: true as const,
    aiPowered: isOpenAIConfigured(),
    status: result.stock.status,
    score: result.stock.complianceScore.overall,
  });
}
