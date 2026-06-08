"use client";

import Link from "next/link";
import { CheckCircle2, ChevronRight, Circle, Clock } from "lucide-react";
import type { EducationLesson } from "@/types/education";
import { EDUCATION_CATEGORIES } from "@/lib/education/catalog";
import { cn } from "@/lib/utils";

interface LessonCardProps {
  lesson: EducationLesson;
  completed: boolean;
  onToggleComplete: (slug: string) => void;
}

function categoryLabel(category: EducationLesson["category"]) {
  return EDUCATION_CATEGORIES.find((item) => item.value === category)?.label ?? category;
}

export function LessonCard({ lesson, completed, onToggleComplete }: LessonCardProps) {
  return (
    <article className="glass-card group flex flex-col border-emerald-500/10 p-5 transition-all hover:border-emerald-500/25">
      <div className="mb-3 flex items-start justify-between gap-3">
        <span className="rounded-lg bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
          {categoryLabel(lesson.category)}
        </span>
        <button
          type="button"
          onClick={() => onToggleComplete(lesson.slug)}
          aria-label={completed ? "Mark lesson incomplete" : "Mark lesson complete"}
          className={cn(
            "rounded-lg p-1.5 transition-colors",
            completed
              ? "text-emerald-600 hover:bg-emerald-500/10 dark:text-emerald-400"
              : "text-zinc-400 hover:bg-zinc-500/10 hover:text-zinc-600 dark:hover:text-zinc-300"
          )}
        >
          {completed ? (
            <CheckCircle2 className="h-5 w-5" />
          ) : (
            <Circle className="h-5 w-5" />
          )}
        </button>
      </div>

      <h3 className="text-lg font-bold text-zinc-900 dark:text-white">{lesson.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {lesson.description}
      </p>

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-zinc-200/60 pt-4 dark:border-zinc-800/60">
        <span className="inline-flex items-center gap-1.5 text-xs text-zinc-500">
          <Clock className="h-3.5 w-3.5" />
          {lesson.readingTimeMinutes} min
        </span>
        <Link
          href={`/education/${lesson.slug}`}
          className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-600 transition-colors hover:text-emerald-500 dark:text-emerald-400"
        >
          Read
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}
