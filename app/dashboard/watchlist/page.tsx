"use client";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { SignInPrompt } from "@/components/dashboard/sign-in-prompt";
import { WatchlistPanel } from "@/components/portfolio/watchlist-panel";
import { usePortfolio } from "@/hooks/use-portfolio";

export default function WatchlistPage() {
  const { data, loading, error, addWatchlist, removeWatchlist } = usePortfolio();
  const needsAuth = error === "Unauthorized";

  return (
    <DashboardShell
      title="Watchlist"
      description="Track halal stocks before you trade"
      loading={loading && !needsAuth}
    >
      {needsAuth && <SignInPrompt />}

      {error && !data && !needsAuth && (
        <div className="glass-card border-red-500/20 bg-red-500/5 py-8 text-center text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      {data && (
        <WatchlistPanel
          items={data.watchlist}
          onAdd={addWatchlist}
          onRemove={removeWatchlist}
        />
      )}
    </DashboardShell>
  );
}
