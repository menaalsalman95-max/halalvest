"use client";

import { StatCard } from "@/components/dashboard/stat-card";
import { formatCurrency, formatPercent } from "@/lib/portfolio/format";
import type { PortfolioSnapshot } from "@/types/portfolio";
import { DollarSign, TrendingUp, Wallet, Shield, PieChart } from "lucide-react";

interface PortfolioStatsProps {
  data: PortfolioSnapshot;
}

export function PortfolioStats({ data }: PortfolioStatsProps) {
  const positiveReturn = data.totalReturn >= 0;
  const positiveDay = data.dayChange >= 0;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        label="Portfolio Value"
        value={formatCurrency(data.totalValue)}
        change={`${formatPercent(data.totalReturnPct)} all time`}
        positive={positiveReturn}
        icon={DollarSign}
      />
      <StatCard
        label="Total Return"
        value={`${positiveReturn ? "+" : ""}${formatCurrency(data.totalReturn, true)}`}
        change={`Started with ${formatCurrency(data.startingBalance)}`}
        positive={positiveReturn}
        icon={TrendingUp}
      />
      <StatCard
        label="Available Cash"
        value={formatCurrency(data.cash)}
        change={`${formatPercent(data.dayChangePct)} today`}
        positive={positiveDay}
        icon={Wallet}
      />
      <StatCard
        label="Halal Holdings"
        value={`${data.halalCount} / ${data.totalHoldings}`}
        change={`${data.sectorCount} sectors`}
        positive={data.halalCount === data.totalHoldings || data.totalHoldings === 0}
        icon={data.totalHoldings > 0 ? Shield : PieChart}
      />
    </div>
  );
}
