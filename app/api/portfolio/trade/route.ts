import { NextResponse } from "next/server";
import { requireUserId } from "@/lib/portfolio/auth";
import { executeTrade } from "@/lib/portfolio/service";
import type { TradeAction } from "@/types/portfolio";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const userId = await requireUserId();
    const body = await request.json();
    const action = body.action as TradeAction;
    const ticker = String(body.ticker ?? "");
    const shares = Number(body.shares);

    if (action !== "buy" && action !== "sell") {
      return NextResponse.json({ error: "Invalid action. Use buy or sell." }, { status: 400 });
    }

    const snapshot = await executeTrade(userId, action, ticker, shares);
    return NextResponse.json(snapshot);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Trade failed";
    const status =
      message === "Unauthorized" ? 401 : message.includes("Insufficient") ? 400 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
