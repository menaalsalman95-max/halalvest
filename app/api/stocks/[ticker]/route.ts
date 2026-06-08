import { NextResponse } from "next/server";
import { analyzeTicker, getDatabaseSize } from "@/lib/stocks/repository";

export const runtime = "nodejs";

interface RouteParams {
  params: Promise<{ ticker: string }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { ticker } = await params;
  const result = analyzeTicker(ticker);

  if (!result) {
    return NextResponse.json(
      {
        error: "not_found",
        message: `No company found for ticker "${ticker.toUpperCase()}".`,
        databaseSize: getDatabaseSize(),
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    stock: result.stock,
    source: result.source,
    databaseSize: getDatabaseSize(),
  });
}
