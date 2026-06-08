"use client";

import type { Stock } from "@/types/stock";
import { ComplianceBadge } from "@/components/ui/badge";
import { ComplianceScoreRing } from "@/components/checker/compliance-score-ring";
import { Building2, Globe, TrendingUp, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

interface CompanyProfileCardProps {
  stock: Stock;
}

const TICKER_COLORS: Record<string, string> = {
  AAPL: "from-zinc-700 to-zinc-900",
  TSLA: "from-red-600 to-red-800",
  NVDA: "from-emerald-600 to-green-800",
  MSFT: "from-blue-600 to-blue-800",
  AMZN: "from-amber-500 to-orange-700",
  META: "from-blue-500 to-indigo-700",
  JPM: "from-slate-600 to-slate-800",
  KO: "from-red-500 to-red-700",
  GOOGL: "from-blue-500 to-cyan-700",
  GOOG: "from-blue-500 to-cyan-700",
};

export function CompanyProfileCard({ stock }: CompanyProfileCardProps) {
  const gradient = TICKER_COLORS[stock.ticker] ?? "from-emerald-600 to-emerald-900";

  return (
    <div className="glass-card overflow-hidden border-emerald-500/20 p-0 shadow-[var(--shadow-glow)]">
      <div className={cn("relative bg-gradient-to-br px-6 py-6 text-white sm:px-8 sm:py-7", gradient)}>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblluaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDBoMzB2MzBIMHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0uMDMiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IGZpbGw9InVybCgjYSkiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiLz48L3N2Zz4=')] opacity-40" />

        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-xl font-bold backdrop-blur-md ring-1 ring-white/20">
              {stock.ticker.slice(0, 2)}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{stock.ticker}</h2>
                <ComplianceBadge status={stock.status} />
              </div>
              <p className="mt-1 text-base text-white/90 sm:text-lg">{stock.name}</p>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/75">
                <span className="flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5" />
                  {stock.exchange}
                </span>
                <span className="flex items-center gap-1.5">
                  <Building2 className="h-3.5 w-3.5" />
                  {stock.sector}
                </span>
                <span className="flex items-center gap-1.5">
                  <Briefcase className="h-3.5 w-3.5" />
                  {stock.industry}
                </span>
                <span className="flex items-center gap-1.5">
                  <TrendingUp className="h-3.5 w-3.5" />
                  {stock.marketCap}
                </span>
              </div>
            </div>
          </div>

          <div className="flex shrink-0 justify-center lg:justify-end">
            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-md ring-1 ring-white/20">
              <ComplianceScoreRing
                score={stock.complianceScore.overall}
                confidence={stock.complianceScore.confidence}
                status={stock.complianceScore.status}
                size={130}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-200/60 bg-white/40 px-6 py-5 dark:border-zinc-800/60 dark:bg-zinc-900/40 sm:px-8">
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {stock.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-zinc-100/80 px-3 py-1 text-xs font-medium text-zinc-600 ring-1 ring-zinc-200/60 dark:bg-zinc-800/80 dark:text-zinc-400 dark:ring-zinc-700">
            {stock.industry}
          </span>
          <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-500/20 dark:text-emerald-400">
            AAOIFI Screening
          </span>
          <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-700 ring-1 ring-amber-500/20 dark:text-amber-400">
            {stock.complianceScore.confidence}% confidence
          </span>
        </div>
      </div>
    </div>
  );
}
