"use client";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { SignInPrompt } from "@/components/dashboard/sign-in-prompt";
import { PortfolioChart } from "@/components/dashboard/portfolio-chart";
import { AllocationChart } from "@/components/dashboard/allocation-chart";
import { PortfolioStats } from "@/components/portfolio/portfolio-stats";
import { HoldingsTable } from "@/components/portfolio/holdings-table";
import { TradePanel } from "@/components/portfolio/trade-panel";
import { usePortfolio } from "@/hooks/use-portfolio";

export default function PortfolioPage() {
  const { data, loading, error, trading, trade } = usePortfolio();
  const needsAuth = error === "Unauthorized";

  return (
    <DashboardShell
      title="Portfolio Simulator"
      description="Buy and sell halal stocks with your $10,000 virtual balance"
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
          {error && (
            <div className="rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          <PortfolioStats data={data} />

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <TradePanel
                cash={data.cash}
                holdings={data.holdings}
                trading={trading}
                onTrade={async (action, ticker, shares) => {
                  await trade(action, ticker, shares);
                }}
              />
            </div>
            <div className="glass-card flex flex-col justify-center p-6">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Simulator Info
              </p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                Prices are simulated for demo purposes. All trades are saved to your account.
                Use the Stock Checker to verify Shariah compliance before buying.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3 text-center">
                <div className="rounded-xl bg-zinc-50/80 p-3 dark:bg-zinc-800/50">
                  <p className="text-[10px] uppercase text-zinc-400">Invested</p>
                  <p className="mt-1 font-bold text-zinc-900 dark:text-white">
                    ${data.investedValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
                <div className="rounded-xl bg-zinc-50/80 p-3 dark:bg-zinc-800/50">
                  <p className="text-[10px] uppercase text-zinc-400">Positions</p>
                  <p className="mt-1 font-bold text-zinc-900 dark:text-white">
                    {data.totalHoldings}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <HoldingsTable holdings={data.holdings} />

          <div className="grid gap-4 lg:grid-cols-2">
            <PortfolioChart
              data={data.performanceHistory}
              returnPct={data.totalReturnPct}
            />
            <AllocationChart segments={data.sectorAllocation} />
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
