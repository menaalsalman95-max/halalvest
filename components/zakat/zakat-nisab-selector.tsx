"use client";

import { Scale } from "lucide-react";
import { getNisabThreshold } from "@/lib/zakat/calculator";
import { NISAB_GOLD_GRAMS, NISAB_SILVER_GRAMS } from "@/lib/zakat/constants";
import { formatCurrency } from "@/lib/portfolio/format";
import type { NisabBasis, ZakatMetalPrices } from "@/types/zakat";
import { cn } from "@/lib/utils";

interface ZakatNisabSelectorProps {
  nisabBasis: NisabBasis;
  metalPrices: ZakatMetalPrices;
  onBasisChange: (basis: NisabBasis) => void;
  onMetalPricesChange: (prices: ZakatMetalPrices) => void;
}

export function ZakatNisabSelector({
  nisabBasis,
  metalPrices,
  onBasisChange,
  onMetalPricesChange,
}: ZakatNisabSelectorProps) {
  const goldNisab = getNisabThreshold("gold", metalPrices);
  const silverNisab = getNisabThreshold("silver", metalPrices);

  return (
    <div className="glass-card border-emerald-500/10 p-5 sm:p-6">
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-xl bg-emerald-500/10 p-2.5">
          <Scale className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div>
          <h2 className="font-semibold text-zinc-900 dark:text-white">Nisab Threshold</h2>
          <p className="text-xs text-zinc-500">
            Choose gold or silver basis — zakat is due when net wealth exceeds nisab
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => onBasisChange("gold")}
          className={cn(
            "rounded-xl border p-4 text-left transition-all",
            nisabBasis === "gold"
              ? "border-emerald-500/40 bg-emerald-500/10 ring-1 ring-emerald-500/20"
              : "border-zinc-200/80 bg-white/40 hover:border-emerald-500/20 dark:border-zinc-700/80 dark:bg-zinc-900/40"
          )}
        >
          <p className="text-sm font-bold text-zinc-900 dark:text-white">Gold Nisab</p>
          <p className="mt-1 text-xs text-zinc-500">{NISAB_GOLD_GRAMS}g of gold</p>
          <p className="mt-2 text-lg font-bold tabular-nums text-emerald-600 dark:text-emerald-400">
            {formatCurrency(goldNisab.threshold)}
          </p>
        </button>

        <button
          type="button"
          onClick={() => onBasisChange("silver")}
          className={cn(
            "rounded-xl border p-4 text-left transition-all",
            nisabBasis === "silver"
              ? "border-emerald-500/40 bg-emerald-500/10 ring-1 ring-emerald-500/20"
              : "border-zinc-200/80 bg-white/40 hover:border-emerald-500/20 dark:border-zinc-700/80 dark:bg-zinc-900/40"
          )}
        >
          <p className="text-sm font-bold text-zinc-900 dark:text-white">Silver Nisab</p>
          <p className="mt-1 text-xs text-zinc-500">{NISAB_SILVER_GRAMS}g of silver</p>
          <p className="mt-2 text-lg font-bold tabular-nums text-emerald-600 dark:text-emerald-400">
            {formatCurrency(silverNisab.threshold)}
          </p>
        </button>
      </div>

      <div className="mt-4 grid gap-4 border-t border-zinc-200/60 pt-4 sm:grid-cols-2 dark:border-zinc-800/60">
        <div>
          <label
            htmlFor="gold-price"
            className="mb-1.5 block text-xs font-semibold text-zinc-700 dark:text-zinc-300"
          >
            Gold Price ($/gram)
          </label>
          <input
            id="gold-price"
            type="number"
            min={0}
            step={0.01}
            value={metalPrices.goldPricePerGram || ""}
            onChange={(e) => {
              const parsed = parseFloat(e.target.value);
              onMetalPricesChange({
                ...metalPrices,
                goldPricePerGram: Number.isFinite(parsed) ? Math.max(0, parsed) : 0,
              });
            }}
            className="h-10 w-full rounded-xl border border-zinc-200/80 bg-white/80 px-3 text-sm tabular-nums dark:border-zinc-700/80 dark:bg-zinc-900/80 dark:text-zinc-100"
          />
        </div>
        <div>
          <label
            htmlFor="silver-price"
            className="mb-1.5 block text-xs font-semibold text-zinc-700 dark:text-zinc-300"
          >
            Silver Price ($/gram)
          </label>
          <input
            id="silver-price"
            type="number"
            min={0}
            step={0.01}
            value={metalPrices.silverPricePerGram || ""}
            onChange={(e) => {
              const parsed = parseFloat(e.target.value);
              onMetalPricesChange({
                ...metalPrices,
                silverPricePerGram: Number.isFinite(parsed) ? Math.max(0, parsed) : 0,
              });
            }}
            className="h-10 w-full rounded-xl border border-zinc-200/80 bg-white/80 px-3 text-sm tabular-nums dark:border-zinc-700/80 dark:bg-zinc-900/80 dark:text-zinc-100"
          />
        </div>
      </div>
    </div>
  );
}
