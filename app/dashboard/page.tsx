"use client";

import Link from "next/link";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { SignInPrompt } from "@/components/dashboard/sign-in-prompt";
import { PortfolioChart } from "@/components/dashboard/portfolio-chart";
import { AllocationChart } from "@/components/dashboard/allocation-chart";
import { PortfolioStats } from "@/components/portfolio/portfolio-stats";
import { HoldingsTable } from "@/components/portfolio/holdings-table";
import { Button } from "@/components/ui/button";
import { usePortfolio } from "@/hooks/use-portfolio";
import { ArrowRight, LineChart } from "lucide-react";

export default function DashboardPage() {
  const { data, loading, error } = usePortfolio();
  const needsAuth = error === "Unauthorized";

  return (
    <DashboardShell
      title="Portfolio Overview"
      description="Track your halal investments and Shariah compliance status"
      loading={loading && !needsAuth}
    >
      {needsAuth && <SignInPrompt />}

      {error && !data && !needsAuth && (
        <div className="glass-card border-red-500/20 bg-red-500/5 py-8 text-center text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      {data && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-zinc-500">
              Virtual simulator · ${data.startingBalance.toLocaleString()} starting balance
            </p>
            <Link href="/dashboard/portfolio">
              <Button variant="primary" size="sm" className="gap-2">
                <LineChart className="h-4 w-4" />
                Trade Stocks
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>

          <PortfolioStats data={data} />

          <div className="grid gap-4 lg:grid-cols-2">
            <PortfolioChart
              data={data.performanceHistory}
              returnPct={data.totalReturnPct}
            />
            <AllocationChart segments={data.sectorAllocation} />
          </div>

          <HoldingsTable holdings={data.holdings} compact />

          <div className="flex flex-wrap gap-3">
            <Link href="/dashboard/watchlist">
              <Button variant="outline" size="sm">
                View Watchlist
              </Button>
            </Link>
            <Link href="/dashboard/transactions">
              <Button variant="outline" size="sm">
                Transaction History
              </Button>
            </Link>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
