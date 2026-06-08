"use client";

import { cn } from "@/lib/utils";

interface ZakatCurrencyInputProps {
  id: string;
  label: string;
  hint?: string;
  value: number;
  onChange: (value: number) => void;
}

export function ZakatCurrencyInput({
  id,
  label,
  hint,
  value,
  onChange,
}: ZakatCurrencyInputProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-xs font-semibold text-zinc-700 dark:text-zinc-300"
      >
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-zinc-400">
          $
        </span>
        <input
          id={id}
          type="number"
          min={0}
          step={0.01}
          inputMode="decimal"
          value={value || ""}
          placeholder="0.00"
          onChange={(e) => {
            const parsed = parseFloat(e.target.value);
            onChange(Number.isFinite(parsed) ? Math.max(0, parsed) : 0);
          }}
          className={cn(
            "h-11 w-full rounded-xl border border-zinc-200/80 bg-white/80 pl-8 pr-4 text-sm tabular-nums",
            "text-zinc-900 backdrop-blur-sm transition-all",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 focus-visible:border-emerald-500/50",
            "dark:border-zinc-700/80 dark:bg-zinc-900/80 dark:text-zinc-100"
          )}
        />
      </div>
      {hint && <p className="mt-1 text-[10px] text-zinc-500">{hint}</p>}
    </div>
  );
}
