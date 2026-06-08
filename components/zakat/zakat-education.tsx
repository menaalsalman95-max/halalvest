"use client";

import Link from "next/link";
import { BookOpen, ChevronRight } from "lucide-react";

export function ZakatEducationSection() {
  return (
    <div className="glass-card border-emerald-500/10 p-5 sm:p-6">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-xl bg-emerald-500/10 p-2.5">
          <BookOpen className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div>
          <h2 className="font-semibold text-zinc-900 dark:text-white">Understanding Nisab & Zakat</h2>
          <p className="text-xs text-zinc-500">Key concepts for calculating your obligation</p>
        </div>
      </div>

      <div className="space-y-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        <div className="rounded-xl border border-emerald-500/10 bg-emerald-500/5 p-4">
          <h3 className="mb-2 font-semibold text-zinc-900 dark:text-white">What is Nisab?</h3>
          <p>
            <strong className="text-emerald-700 dark:text-emerald-400">Nisab</strong> is the minimum
            amount of wealth a Muslim must hold for one lunar year before zakat becomes obligatory.
            It is measured against the value of gold or silver:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>
              <strong>Gold basis:</strong> 85 grams of gold
            </li>
            <li>
              <strong>Silver basis:</strong> 595 grams of silver
            </li>
          </ul>
          <p className="mt-2">
            Many scholars recommend using the <strong>lower threshold</strong> (silver nisab) to
            benefit those in need, while others use gold. This calculator lets you choose either
            basis.
          </p>
        </div>

        <div className="rounded-xl border border-zinc-200/60 bg-white/40 p-4 dark:border-zinc-800/60 dark:bg-zinc-900/40">
          <h3 className="mb-2 font-semibold text-zinc-900 dark:text-white">What is Zakat?</h3>
          <p>
            <strong className="text-emerald-700 dark:text-emerald-400">Zakat</strong> is an obligatory
            act of worship — a purification of wealth. When your net zakatable assets exceed nisab for
            one full lunar year (hawl), you pay{" "}
            <strong className="text-emerald-700 dark:text-emerald-400">2.5%</strong> of your net
            wealth to eligible recipients.
          </p>
          <p className="mt-2">
            This calculator estimates zakat on cash, investments, gold, silver, and business assets
            minus immediate debts. It does not account for hawl (holding period) — confirm timing with
            a qualified scholar.
          </p>
        </div>

        <div className="rounded-xl border border-zinc-200/60 bg-white/40 p-4 dark:border-zinc-800/60 dark:bg-zinc-900/40">
          <h3 className="mb-2 font-semibold text-zinc-900 dark:text-white">How We Calculate</h3>
          <ol className="list-decimal space-y-1 pl-5">
            <li>Sum all zakatable assets</li>
            <li>Subtract debts and bills due immediately</li>
            <li>Compare net wealth to your chosen nisab threshold</li>
            <li>If net wealth ≥ nisab, zakat = net wealth × 0.025</li>
          </ol>
        </div>
      </div>

      <Link
        href="/education/zakat-on-investments"
        className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-emerald-600 transition-colors hover:text-emerald-500 dark:text-emerald-400"
      >
        Read our full lesson on Zakat on Investments
        <ChevronRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
