"use client";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { SignInPrompt } from "@/components/dashboard/sign-in-prompt";
import { TransactionsTable } from "@/components/portfolio/transactions-table";
import { PortfolioStats } from "@/components/portfolio/portfolio-stats";
import { usePortfolio } from "@/hooks/use-portfolio";

export default function TransactionsPage() {
  const { data, loading, error } = usePortfolio();
  const needsAuth = error === "Unauthorized";

  return (
    <DashboardShell
      title="Transaction History"
      description="Full record of your simulated buy and sell orders"
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
          <PortfolioStats data={data} />
          <TransactionsTable transactions={data.transactions} />
        </div>
      )}
    </DashboardShell>
  );
}
