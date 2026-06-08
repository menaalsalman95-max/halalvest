"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { EDUCATION_CATEGORIES } from "@/lib/education/catalog";
import type { EducationCategory } from "@/types/education";
import { cn } from "@/lib/utils";

interface LessonFiltersProps {
  query: string;
  category: EducationCategory;
  onQueryChange: (query: string) => void;
  onCategoryChange: (category: EducationCategory) => void;
  resultCount: number;
}

export function LessonFilters({
  query,
  category,
  onQueryChange,
  onCategoryChange,
  resultCount,
}: LessonFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-emerald-500/70" />
        <Input
          placeholder="Search lessons by title or topic…"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          className="h-12 border-emerald-500/15 bg-white/80 pl-12 dark:bg-zinc-900/80"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {EDUCATION_CATEGORIES.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => onCategoryChange(item.value)}
            className={cn(
              "rounded-xl border px-3.5 py-2 text-xs font-semibold transition-all",
              category === item.value
                ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                : "border-zinc-200/80 bg-white/60 text-zinc-600 hover:border-emerald-500/20 dark:border-zinc-700/80 dark:bg-zinc-900/60 dark:text-zinc-400"
            )}
          >
            {item.label}
          </button>
        ))}
        <span className="ml-auto text-xs text-zinc-500">
          {resultCount} lesson{resultCount !== 1 ? "s" : ""}
        </span>
      </div>
    </div>
  );
}
