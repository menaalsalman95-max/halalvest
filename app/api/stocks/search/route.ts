import { NextResponse } from "next/server";
import { searchCompanies, getDatabaseSize } from "@/lib/stocks/repository";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") ?? searchParams.get("query") ?? "";
  const limit = Math.min(Number(searchParams.get("limit") ?? "8"), 20);

  if (!query.trim()) {
    return NextResponse.json({
      results: [],
      total: 0,
      query: "",
      databaseSize: getDatabaseSize(),
    });
  }

  const response = searchCompanies(query, limit);
  return NextResponse.json({
    ...response,
    databaseSize: getDatabaseSize(),
  });
}
