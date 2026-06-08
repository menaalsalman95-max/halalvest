"use client";

import Link from "next/link";
import { ArrowRight, Clock, Sparkles } from "lucide-react";
import type { EducationLesson } from "@/types/education";
import { cn } from "@/lib/utils";

interface FeaturedLessonProps {
  lesson: EducationLesson;
  completed: boolean;
}

export function FeaturedLesson({ lesson, completed }: FeaturedLessonProps) {
  return (
    <div className="glass-card relative overflow-hidden border-emerald-500/20 p-0">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-amber-500/5"
        aria-hidden
      />
      <div className="relative flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div className="max-w-2xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
            <Sparkles className="h-3.5 w-3.5" />
            Featured Lesson
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
            {lesson.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
            {lesson.description}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-zinc-500">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {lesson.readingTimeMinutes} min read
            </span>
            {completed && (
              <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 font-semibold text-emerald-700 dark:text-emerald-400">
                Completed
              </span>
            )}
          </div>
        </div>
        <Link
          href={`/education/${lesson.slug}`}
          className={cn(
            "inline-flex shrink-0 items-center justify-center gap-2 rounded-xl px-6 py-3.5",
            "bg-emerald-600 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20",
            "transition-all hover:bg-emerald-500 hover:shadow-emerald-500/30"
          )}
        >
          Start Lesson
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
