import { formatPrice } from "@/lib/screener/format";
import type { ScreenerStock } from "@/types/screener";
import { ComplianceBadge } from "@/components/ui/badge";

interface StockInfoPanelProps {
  stock: ScreenerStock;
}

export function StockInfoPanel({ stock }: StockInfoPanelProps) {
  const fields = [
    { label: "Company", value: stock.name },
    { label: "Ticker", value: stock.ticker },
    { label: "Current Price", value: formatPrice(stock.price) },
    { label: "Market Cap", value: stock.marketCap },
    { label: "Sector", value: stock.sector },
    { label: "Industry", value: stock.industry },
  ];

  return (
    <div className="grid gap-3 border-b border-emerald-500/10 bg-zinc-950/20 px-4 py-4 sm:grid-cols-2 lg:grid-cols-3 sm:px-5">
      {fields.map(({ label, value }) => (
        <div key={label} className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
            {label}
          </p>
          <p className="mt-0.5 truncate text-sm font-semibold text-zinc-900 dark:text-white">
            {value}
          </p>
        </div>
      ))}
      <div className="flex items-end sm:col-span-2 lg:col-span-3">
        <ComplianceBadge status={stock.status} />
      </div>
    </div>
  );
}
