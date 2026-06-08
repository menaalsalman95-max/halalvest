"use client";

import { Wallet } from "lucide-react";
import { ZakatCurrencyInput } from "@/components/zakat/zakat-currency-input";
import { ASSET_FIELD_LABELS } from "@/lib/zakat/constants";
import type { ZakatAssetInputs } from "@/types/zakat";

interface ZakatAssetInputsSectionProps {
  assets: ZakatAssetInputs;
  onChange: (assets: ZakatAssetInputs) => void;
}

const ASSET_HINTS: Partial<Record<keyof ZakatAssetInputs, string>> = {
  stocksInvestments: "Include halal stocks, ETFs, and brokerage cash",
  goldValue: "Current market value of gold you own",
  silverValue: "Current market value of silver you own",
  moneyOwedToYou: "Strong debts likely to be repaid",
};

export function ZakatAssetInputsSection({ assets, onChange }: ZakatAssetInputsSectionProps) {
  const update = (key: keyof ZakatAssetInputs, value: number) => {
    onChange({ ...assets, [key]: value });
  };

  return (
    <div className="glass-card border-emerald-500/10 p-5 sm:p-6">
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-xl bg-emerald-500/10 p-2.5">
          <Wallet className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div>
          <h2 className="font-semibold text-zinc-900 dark:text-white">Zakatable Assets</h2>
          <p className="text-xs text-zinc-500">Enter the current value of each asset category</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {(Object.keys(ASSET_FIELD_LABELS) as (keyof ZakatAssetInputs)[]).map((key) => (
          <ZakatCurrencyInput
            key={key}
            id={`asset-${key}`}
            label={ASSET_FIELD_LABELS[key]}
            hint={ASSET_HINTS[key]}
            value={assets[key]}
            onChange={(value) => update(key, value)}
          />
        ))}
      </div>
    </div>
  );
}
