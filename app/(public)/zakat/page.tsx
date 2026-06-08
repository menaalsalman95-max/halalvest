import type { Metadata } from "next";
import { ZakatCalculatorView } from "@/components/zakat/zakat-calculator-view";

export const metadata: Metadata = {
  title: "Zakat Calculator",
  description:
    "Calculate your zakat on cash, stocks, gold, silver, and business assets with gold or silver nisab thresholds.",
};

export default function ZakatPage() {
  return <ZakatCalculatorView />;
}
