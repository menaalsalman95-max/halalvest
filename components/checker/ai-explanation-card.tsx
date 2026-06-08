"use client";

import { Sparkles, Loader2 } from "lucide-react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { MarkdownContent } from "@/components/ai/markdown-content";
import { Skeleton } from "@/components/ui/skeleton";

interface AIExplanationCardProps {
  ticker: string;
  explanation: string | null;
  loading: boolean;
  aiPowered: boolean;
  error?: string | null;
}

export function AIExplanationCard({
  ticker,
  explanation,
  loading,
  aiPowered,
  error,
}: AIExplanationCardProps) {
  return (
    <Card glass glow className="overflow-hidden border-emerald-500/20 p-0">
      <div className="border-b border-emerald-500/10 bg-gradient-to-r from-emerald-500/10 via-transparent to-amber-500/5 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-lg shadow-emerald-600/25">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-base">AI Compliance Explanation</CardTitle>
            <CardDescription>
              {aiPowered
                ? `HalalVest AI · ${ticker}`
                : `Educational summary · ${ticker}`}
            </CardDescription>
          </div>
        </div>
      </div>

      <div className="p-6">
        {loading && (
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm text-zinc-500">
              <Loader2 className="h-5 w-5 animate-spin text-emerald-500" />
              Generating Shariah compliance narrative…
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
        )}

        {error && !loading && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        {explanation && !loading && (
          <MarkdownContent content={explanation} />
        )}

        <p className="mt-5 rounded-xl bg-zinc-50/80 px-4 py-3 text-xs leading-relaxed text-zinc-500 dark:bg-zinc-800/50 dark:text-zinc-400">
          AI explanations are for educational purposes only — not financial or religious advice.
        </p>
      </div>
    </Card>
  );
}
