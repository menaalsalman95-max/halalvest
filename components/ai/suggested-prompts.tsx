"use client";

import type { ComponentType } from "react";
import { cn } from "@/lib/utils";
import type { QuickPrompt } from "@/types/chat";
import type { PromptCategory } from "@/lib/chat/prompts";
import { Lightbulb } from "lucide-react";

interface SuggestedPromptsProps {
  prompts: QuickPrompt[];
  onSelect: (prompt: string) => void;
  disabled?: boolean;
  title?: string;
  className?: string;
}

export function SuggestedPrompts({
  prompts,
  onSelect,
  disabled,
  title = "Suggested follow-ups",
  className,
}: SuggestedPromptsProps) {
  if (prompts.length === 0) return null;

  return (
    <div className={cn("space-y-2", className)}>
      <p className="flex items-center gap-1.5 text-[11px] font-medium text-zinc-400">
        <Lightbulb className="h-3 w-3" />
        {title}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {prompts.map((qp) => (
          <button
            key={qp.label}
            type="button"
            onClick={() => onSelect(qp.prompt)}
            disabled={disabled}
            className="rounded-full border border-emerald-200/60 bg-emerald-50/50 px-2.5 py-1 text-[11px] text-emerald-800 transition-all hover:border-emerald-400 hover:bg-emerald-100 hover:shadow-sm disabled:opacity-50 dark:border-emerald-800/60 dark:bg-emerald-950/30 dark:text-emerald-300 dark:hover:bg-emerald-950/50"
          >
            {qp.label}
          </button>
        ))}
      </div>
    </div>
  );
}

interface PromptCategoriesProps {
  categories: PromptCategory[];
  onSelect: (prompt: string) => void;
  disabled?: boolean;
  getIcon: (icon: PromptCategory["icon"]) => ComponentType<{ className?: string }>;
}

export function PromptCategories({
  categories,
  onSelect,
  disabled,
  getIcon,
}: PromptCategoriesProps) {
  return (
    <div className="space-y-3">
      {categories.map((cat) => {
        const Icon = getIcon(cat.icon);
        return (
          <div key={cat.id}>
            <p className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-zinc-400">
              <Icon className="h-3 w-3" />
              {cat.label}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {cat.prompts.map((qp) => (
                <button
                  key={qp.label}
                  type="button"
                  onClick={() => onSelect(qp.prompt)}
                  disabled={disabled}
                  className="rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-[11px] text-zinc-600 transition-all hover:border-emerald-500/40 hover:bg-emerald-50/50 hover:text-emerald-700 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-400 dark:hover:border-emerald-700 dark:hover:bg-emerald-950/30 dark:hover:text-emerald-400"
                >
                  {qp.label}
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
