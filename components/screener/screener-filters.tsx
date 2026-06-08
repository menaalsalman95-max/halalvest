"use client";

import type { HalalStatusFilter, MarketCapFilter, ScreenerFilters } from "@/types/screener";
import { cn } from "@/lib/utils";

interface ScreenerFiltersProps {
  filters: ScreenerFilters;
  sectors: string[];
  onChange: (filters: ScreenerFilters) => void;
  resultCount: number;
}

const MARKET_CAP_OPTIONS: { value: MarketCapFilter; label: string }[] = [
  { value: "all", label: "All Caps" },
  { value: "mega", label: "Mega ($200B+)" },
  { value: "large", label: "Large ($10B–$200B)" },
  { value: "mid", label: "Mid ($2B–$10B)" },
  { value: "small", label: "Small (<$2B)" },
];

const STATUS_OPTIONS: { value: HalalStatusFilter; label: string }[] = [
  { value: "all", label: "All Status" },
  { value: "halal", label: "Halal" },
  { value: "questionable", label: "Questionable" },
  { value: "haram", label: "Non-Compliant" },
];

export function ScreenerFiltersBar({
  filters,
  sectors,
  onChange,
  resultCount,
}: ScreenerFiltersProps) {
  const update = (patch: Partial<ScreenerFilters>) => onChange({ ...filters, ...patch });

  return (
    <div className="glass-card space-y-4 p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-semibold text-zinc-900 dark:text-white">Filters</p>
        <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400">
          {resultCount} result{resultCount !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <FilterSelect
          label="Sector"
          value={filters.sector}
          onChange={(v) => update({ sector: v })}
          options={sectors.map((s) => ({ value: s, label: s === "all" ? "All Sectors" : s }))}
        />
        <FilterSelect
          label="Market Cap"
          value={filters.marketCap}
          onChange={(v) => update({ marketCap: v as MarketCapFilter })}
          options={MARKET_CAP_OPTIONS}
        />
        <FilterSelect
          label="Halal Status"
          value={filters.halalStatus}
          onChange={(v) => update({ halalStatus: v as HalalStatusFilter })}
          options={STATUS_OPTIONS}
        />
        <div>
          <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
            Max Debt Ratio ({filters.debtRatioMax}%)
          </label>
          <input
            type="range"
            min={0}
            max={100}
            step={5}
            value={filters.debtRatioMax}
            onChange={(e) => update({ debtRatioMax: Number(e.target.value) })}
            className="h-2 w-full cursor-pointer accent-emerald-500"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
            Max Dividend ({filters.dividendYieldMax.toFixed(1)}%)
          </label>
          <input
            type="range"
            min={0}
            max={10}
            step={0.5}
            value={filters.dividendYieldMax}
            onChange={(e) => update({ dividendYieldMax: Number(e.target.value) })}
            className="h-2 w-full cursor-pointer accent-emerald-500"
          />
        </div>
      </div>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "h-10 w-full rounded-xl border border-zinc-200/80 bg-white/80 px-3 text-sm",
          "text-zinc-900 backdrop-blur-sm dark:border-zinc-700/80 dark:bg-zinc-900/80 dark:text-white"
        )}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
