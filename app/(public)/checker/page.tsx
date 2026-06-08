import type { Metadata } from "next";
import { StockChecker } from "@/components/checker/stock-checker";
import { BarChart3, Search, Scale, Shield, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Halal Stock Checker",
  description:
    "Premium Shariah compliance analysis with live search, debt ratio screening, sector classification, and AI-powered explanations.",
};

const features = [
  { icon: Search, label: "Live Search" },
  { icon: Scale, label: "Debt Ratio" },
  { icon: BarChart3, label: "Compliance Score" },
  { icon: Shield, label: "AAOIFI Standards" },
  { icon: Sparkles, label: "AI Explanations" },
];

export default function CheckerPage() {
  return (
    <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-emerald-500/8 blur-3xl dark:bg-emerald-500/12"
        aria-hidden
      />

      <div className="relative mb-10 text-center lg:mb-12">
        <div className="mb-5 inline-flex rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/5 p-4 ring-1 ring-emerald-500/25 shadow-[var(--shadow-glow)]">
          <Shield className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
        </div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
          Islamic Fintech · Compliance Engine
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl dark:text-white">
          Premium Shariah Stock Analysis
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-400">
          Live ticker search with autocomplete, dynamic halal screening, confidence scoring, and
          AI-powered compliance explanations — built for Muslim investors in the US.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {features.map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-medium text-zinc-600 sm:px-4 dark:text-zinc-400"
            >
              <Icon className="h-3.5 w-3.5 text-emerald-500" />
              {label}
            </span>
          ))}
        </div>
      </div>

      <StockChecker />
    </div>
  );
}
