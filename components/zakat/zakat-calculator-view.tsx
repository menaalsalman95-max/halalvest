"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Calculator, RotateCcw } from "lucide-react";
import { ZakatAssetInputsSection } from "@/components/zakat/zakat-asset-inputs";
import { ZakatBreakdown } from "@/components/zakat/zakat-breakdown";
import { ZakatDeductionInputsSection } from "@/components/zakat/zakat-deduction-inputs";
import { ZakatEducationSection } from "@/components/zakat/zakat-education";
import { ZakatNisabSelector } from "@/components/zakat/zakat-nisab-selector";
import { ZakatProgress } from "@/components/zakat/zakat-progress";
import { ZakatResultsPanel } from "@/components/zakat/zakat-results-panel";
import { calculateZakat } from "@/lib/zakat/calculator";
import {
  DEFAULT_METAL_PRICES,
  EMPTY_ASSETS,
  EMPTY_DEDUCTIONS,
  type NisabBasis,
  type ZakatAssetInputs,
  type ZakatDeductionInputs,
  type ZakatMetalPrices,
} from "@/types/zakat";

function countFilledAssets(assets: ZakatAssetInputs) {
  return Object.values(assets).filter((value) => value > 0).length;
}

function countFilledDeductions(deductions: ZakatDeductionInputs) {
  return Object.values(deductions).filter((value) => value > 0).length;
}

export function ZakatCalculatorView() {
  const [assets, setAssets] = useState<ZakatAssetInputs>(EMPTY_ASSETS);
  const [deductions, setDeductions] = useState<ZakatDeductionInputs>(EMPTY_DEDUCTIONS);
  const [nisabBasis, setNisabBasis] = useState<NisabBasis>("gold");
  const [metalPrices, setMetalPrices] = useState<ZakatMetalPrices>(DEFAULT_METAL_PRICES);

  const result = useMemo(
    () =>
      calculateZakat({
        assets,
        deductions,
        nisabBasis,
        metalPrices,
      }),
    [assets, deductions, nisabBasis, metalPrices]
  );

  const currentStep = useMemo(() => {
    const assetCount = countFilledAssets(assets);
    const deductionCount = countFilledDeductions(deductions);

    if (assetCount === 0) return 1;
    if (deductionCount === 0) return 2;
    if (result.totalAssets > 0 || result.totalDeductions > 0) return 4;
    return 3;
  }, [assets, deductions, result.totalAssets, result.totalDeductions]);

  const resetCalculator = () => {
    setAssets(EMPTY_ASSETS);
    setDeductions(EMPTY_DEDUCTIONS);
    setNisabBasis("gold");
    setMetalPrices(DEFAULT_METAL_PRICES);
  };

  return (
    <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[380px] w-[680px] -translate-x-1/2 rounded-full bg-emerald-500/8 blur-3xl dark:bg-emerald-500/12"
        aria-hidden
      />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative mb-8 text-center lg:mb-10"
      >
        <div className="mx-auto mb-4 inline-flex rounded-2xl bg-emerald-500/10 p-3 ring-1 ring-emerald-500/20">
          <Calculator className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
        </div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
          Islamic Fintech · Wealth Purification
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
          Zakat Calculator
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-600 dark:text-zinc-400">
          Calculate your zakat obligation on cash, investments, gold, silver, and business assets.
          Choose gold or silver nisab and see your 2.5% zakat amount instantly.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="relative mb-6"
      >
        <ZakatProgress currentStep={currentStep} />
      </motion.div>

      <div className="relative grid gap-6 lg:grid-cols-5 lg:gap-8">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6 lg:col-span-3"
        >
          <ZakatAssetInputsSection assets={assets} onChange={setAssets} />
          <ZakatDeductionInputsSection deductions={deductions} onChange={setDeductions} />
          <ZakatNisabSelector
            nisabBasis={nisabBasis}
            metalPrices={metalPrices}
            onBasisChange={setNisabBasis}
            onMetalPricesChange={setMetalPrices}
          />

          <button
            type="button"
            onClick={resetCalculator}
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-200/80 bg-white/60 px-4 py-2.5 text-sm font-semibold text-zinc-600 transition-colors hover:border-emerald-500/30 hover:text-emerald-600 dark:border-zinc-700/80 dark:bg-zinc-900/60 dark:text-zinc-400 dark:hover:text-emerald-400"
          >
            <RotateCcw className="h-4 w-4" />
            Reset Calculator
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="space-y-6 lg:col-span-2"
        >
          <ZakatResultsPanel result={result} />
          <ZakatBreakdown result={result} />
          <ZakatEducationSection />
        </motion.div>
      </div>

      <p className="relative mt-8 text-center text-xs text-zinc-500">
        For guidance only · Consult a qualified Islamic scholar · Does not replace professional advice
      </p>
    </div>
  );
}
