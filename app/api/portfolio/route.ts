import { NextResponse } from "next/server";
import { requireUserId } from "@/lib/portfolio/auth";
import { getPortfolioSnapshot } from "@/lib/portfolio/service";

export const runtime = "nodejs";

export async function GET() {
  try {
    const userId = await requireUserId();
    const snapshot = await getPortfolioSnapshot(userId);
    return NextResponse.json(snapshot);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unauthorized";
    const status = message === "Unauthorized" ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
