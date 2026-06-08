import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StockDetailView } from "@/components/screener/stock-detail-view";
import { getScreenerStock } from "@/lib/screener/dataset";

interface PageProps {
  params: Promise<{ ticker: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { ticker } = await params;
  const stock = getScreenerStock(ticker);
  if (!stock) return { title: "Stock Not Found" };
  return {
    title: `${stock.ticker} — ${stock.name}`,
    description: `Shariah compliance analysis for ${stock.name} (${stock.ticker})`,
  };
}

export default async function StockDetailPage({ params }: PageProps) {
  const { ticker } = await params;
  const screenerStock = getScreenerStock(ticker);

  if (!screenerStock) {
    notFound();
  }

  return <StockDetailView screenerStock={screenerStock} />;
}
