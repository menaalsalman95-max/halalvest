"use client";

import { CompanyProfileCard } from "@/components/checker/company-profile-card";
import { DebtRatioChart } from "@/components/checker/debt-ratio-chart";
import { RevenueBreakdownChart } from "@/components/checker/revenue-breakdown-chart";
import { SectorAnalysisCard } from "@/components/checker/sector-analysis-card";
import { ScoreBreakdown } from "@/components/checker/score-breakdown";
import { AIExplanationCard } from "@/components/checker/ai-explanation-card";
import { AnalysisStatCard } from "@/components/checker/analysis-stat-card";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ComplianceBadge } from "@/components/ui/badge";
import { useStockExplanation } from "@/hooks/use-stock-api";
import type { Stock } from "@/types/stock";
import {
  BookOpen,
  Droplets,
  Gauge,
  Scale,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";

interface StockResultProps {
  stock: Stock;
  analysisSource?: "detailed" | "dynamic" | null;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.15em] text-emerald-600 dark:text-emerald-400">
      {children}
    </p>
  );
}

export function StockResult({ stock, analysisSource }: StockResultProps) {
  const { screening, complianceScore } = stock;
  const { explanation, loading: aiLoading, aiPowered, error: aiError } =
    useStockExplanation(stock.ticker);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {analysisSource === "dynamic" && (
        <div className="glass flex items-center gap-2 rounded-xl border-emerald-500/20 px-4 py-2.5 text-xs text-emerald-700 dark:text-emerald-400">
          <Sparkles className="h-3.5 w-3.5 shrink-0" />
          Dynamically screened via sector classification & financial ratios
        </div>
      )}

      {/* Company overview */}
      <section>
        <SectionLabel>Company Overview</SectionLabel>
        <CompanyProfileCard stock={stock} />
      </section>

      {/* Key metrics strip */}
      <section>
        <SectionLabel>Compliance Snapshot</SectionLabel>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <AnalysisStatCard
            label="Compliance Score"
            value={complianceScore.overall}
            subtext={`/ 100 · ${complianceScore.status}`}
            icon={Gauge}
            status={complianceScore.status}
          />
          <AnalysisStatCard
            label="Confidence"
            value={`${complianceScore.confidence}%`}
            subtext="Screening consistency"
            icon={Target}
          />
          <AnalysisStatCard
            label="Debt Ratio"
            value={`${screening.debtRatio.ratio}%`}
            subtext={`Limit ${screening.debtRatio.threshold}%`}
            icon={Scale}
            status={screening.debtRatio.status}
          />
          <AnalysisStatCard
            label="Classification"
            value={stock.status.charAt(0).toUpperCase() + stock.status.slice(1)}
            subtext={stock.sector}
            icon={ShieldCheck}
            status={stock.status}
          />
        </div>
      </section>

      {/* AI explanation */}
      <section>
        <SectionLabel>AI Analysis</SectionLabel>
        <AIExplanationCard
          ticker={stock.ticker}
          explanation={explanation}
          loading={aiLoading}
          aiPowered={aiPowered}
          error={aiError}
        />
      </section>

      {/* Score breakdown */}
      <section>
        <SectionLabel>Score Breakdown</SectionLabel>
        <Card glass className="border-emerald-500/10">
          <CardHeader>
            <CardTitle>Shariah Compliance Score</CardTitle>
            <CardDescription>
              Weighted AAOIFI scoring — business activities, debt, sector, impure income
            </CardDescription>
          </CardHeader>
          <ScoreBreakdown breakdown={complianceScore.breakdown} />
        </Card>
      </section>

      {/* Charts grid */}
      <section>
        <SectionLabel>Screening Analysis</SectionLabel>
        <div className="grid gap-4 lg:grid-cols-2">
          <RevenueBreakdownChart data={screening.businessActivities} />
          <DebtRatioChart data={screening.debtRatio} />
        </div>
      </section>

      <section>
        <div className="grid gap-4 lg:grid-cols-2">
          <SectorAnalysisCard data={screening.sectorScreening} />

          <Card glass className="border-emerald-500/10">
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="rounded-xl bg-emerald-500/10 p-2.5 ring-1 ring-emerald-500/20">
                    <Droplets className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Impure Income</CardTitle>
                    <CardDescription>
                      Threshold: {screening.impureIncome.threshold}%
                    </CardDescription>
                  </div>
                </div>
                <ComplianceBadge status={screening.impureIncome.status} />
              </div>
            </CardHeader>

            <div className="space-y-4">
              <div className="flex items-end gap-2">
                <span className="text-4xl font-bold text-zinc-900 dark:text-white">
                  {screening.impureIncome.ratio}%
                </span>
                <span className="mb-1.5 text-sm text-zinc-500">non-compliant revenue</span>
              </div>
              <div className="relative h-3 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-red-400 to-red-500 transition-all duration-700"
                  style={{
                    width: `${Math.min((screening.impureIncome.ratio / screening.impureIncome.threshold) * 100, 100)}%`,
                  }}
                />
              </div>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                {screening.impureIncome.summary}
              </p>
              <div className="rounded-xl bg-zinc-50/80 px-3 py-2 text-xs text-zinc-500 dark:bg-zinc-800/50">
                Score {screening.impureIncome.score}/100 · Exceeding{" "}
                {screening.impureIncome.threshold}% may require tazkiyah (purification)
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Reasoning */}
      <section>
        <SectionLabel>Detailed Reasoning</SectionLabel>
        <Card glass>
          <CardHeader>
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              <div>
                <CardTitle>Compliance Reasoning</CardTitle>
                <CardDescription>Rule-based AAOIFI analysis</CardDescription>
              </div>
            </div>
          </CardHeader>
          <ul className="space-y-3">
            {screening.reasoning.map((reason, i) => (
              <li
                key={`${i}-${reason.slice(0, 24)}`}
                className="flex items-start gap-3 rounded-xl border border-zinc-200/60 bg-white/40 px-3 py-3 dark:border-zinc-800/60 dark:bg-zinc-900/40"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                  {i + 1}
                </span>
                <span className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                  {reason}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 rounded-xl bg-zinc-50/80 px-4 py-3 text-xs leading-relaxed text-zinc-500 dark:bg-zinc-800/50 dark:text-zinc-400">
            Educational purposes only — not financial or religious advice. Scholarly opinions may
            vary. Consult a qualified Islamic finance scholar for personal guidance.
          </p>
        </Card>
      </section>
    </div>
  );
}
