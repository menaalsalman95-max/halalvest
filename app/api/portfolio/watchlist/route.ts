import { NextResponse } from "next/server";
import { requireUserId } from "@/lib/portfolio/auth";
import {
  addToWatchlist,
  getPortfolioSnapshot,
  removeFromWatchlist,
} from "@/lib/portfolio/service";

export const runtime = "nodejs";

export async function GET() {
  try {
    const userId = await requireUserId();
    const snapshot = await getPortfolioSnapshot(userId);
    return NextResponse.json({ watchlist: snapshot.watchlist });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unauthorized";
    return NextResponse.json({ error: message }, { status: message === "Unauthorized" ? 401 : 500 });
  }
}

export async function POST(request: Request) {
  try {
    const userId = await requireUserId();
    const body = await request.json();
    const ticker = String(body.ticker ?? "");
    const snapshot = await addToWatchlist(userId, ticker);
    return NextResponse.json(snapshot);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to add to watchlist";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    const userId = await requireUserId();
    const { searchParams } = new URL(request.url);
    const ticker = searchParams.get("ticker") ?? "";
    const snapshot = await removeFromWatchlist(userId, ticker);
    return NextResponse.json(snapshot);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to remove from watchlist";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
