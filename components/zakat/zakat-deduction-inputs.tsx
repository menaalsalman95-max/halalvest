"use client";

import { MinusCircle } from "lucide-react";
import { ZakatCurrencyInput } from "@/components/zakat/zakat-currency-input";
import { DEDUCTION_FIELD_LABELS } from "@/lib/zakat/constants";
import type { ZakatDeductionInputs } from "@/types/zakat";

interface ZakatDeductionInputsSectionProps {
  deductions: ZakatDeductionInputs;
  onChange: (deductions: ZakatDeductionInputs) => void;
}

const DEDUCTION_HINTS: Partial<Record<keyof ZakatDeductionInputs, string>> = {
  debts: "Personal debts due within the year",
  billsDueImmediately: "Rent, utilities, or invoices due now",
};

export function ZakatDeductionInputsSection({
  deductions,
  onChange,
}: ZakatDeductionInputsSectionProps) {
  const update = (key: keyof ZakatDeductionInputs, value: number) => {
    onChange({ ...deductions, [key]: value });
  };

  return (
    <div className="glass-card border-amber-500/10 p-5 sm:p-6">
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-xl bg-amber-500/10 p-2.5">
          <MinusCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
        </div>
        <div>
          <h2 className="font-semibold text-zinc-900 dark:text-white">Deductions</h2>
          <p className="text-xs text-zinc-500">Subtract immediate liabilities from your assets</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {(Object.keys(DEDUCTION_FIELD_LABELS) as (keyof ZakatDeductionInputs)[]).map((key) => (
          <ZakatCurrencyInput
            key={key}
            id={`deduction-${key}`}
            label={DEDUCTION_FIELD_LABELS[key]}
            hint={DEDUCTION_HINTS[key]}
            value={deductions[key]}
            onChange={(value) => update(key, value)}
          />
        ))}
      </div>
    </div>
  );
}
