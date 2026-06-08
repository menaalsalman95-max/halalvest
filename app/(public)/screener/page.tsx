import type { Metadata } from "next";
import { ScreenerView } from "@/components/screener/screener-view";

export const metadata: Metadata = {
  title: "Halal Stock Screener",
  description:
    "Filter US stocks by sector, debt ratio, dividend yield, and Shariah compliance status.",
};

export default function ScreenerPage() {
  return <ScreenerView />;
}
