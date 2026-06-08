"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  Clock,
  GraduationCap,
} from "lucide-react";
import { LessonMarkdown } from "@/components/education/lesson-markdown";
import { useEducationProgress } from "@/hooks/use-education-progress";
import { EDUCATION_CATEGORIES, EDUCATION_LESSONS } from "@/lib/education/catalog";
import type { EducationLesson } from "@/types/education";
import { cn } from "@/lib/utils";

interface LessonDetailViewProps {
  lesson: EducationLesson;
}

function categoryLabel(category: EducationLesson["category"]) {
  return EDUCATION_CATEGORIES.find((item) => item.value === category)?.label ?? category;
}

export function LessonDetailView({ lesson }: LessonDetailViewProps) {
  const lessonSlugs = EDUCATION_LESSONS.map((lesson) => lesson.slug);
  const { isComplete, toggleComplete } = useEducationProgress(lessonSlugs);
  const completed = isComplete(lesson.slug);

  return (
    <div className="relative mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[320px] w-[560px] -translate-x-1/2 rounded-full bg-emerald-500/8 blur-3xl dark:bg-emerald-500/12"
        aria-hidden
      />

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <Link
          href="/education"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-zinc-600 transition-colors hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Education Center
        </Link>

        <div className="glass-card mb-8 border-emerald-500/15 p-6 sm:p-8">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              <GraduationCap className="h-3 w-3" />
              {categoryLabel(lesson.category)}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-zinc-500">
              <Clock className="h-3.5 w-3.5" />
              {lesson.readingTimeMinutes} min read
            </span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
            {lesson.title}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            {lesson.description}
          </p>

          <button
            type="button"
            onClick={() => toggleComplete(lesson.slug)}
            className={cn(
              "mt-6 inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all",
              completed
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                : "border-zinc-200/80 bg-white/60 text-zinc-700 hover:border-emerald-500/30 dark:border-zinc-700/80 dark:bg-zinc-900/60 dark:text-zinc-300"
            )}
          >
            {completed ? (
              <>
                <CheckCircle2 className="h-4 w-4" />
                Lesson Completed
              </>
            ) : (
              <>
                <Circle className="h-4 w-4" />
                Mark as Complete
              </>
            )}
          </button>
        </div>

        <div className="glass-card border-emerald-500/10 p-6 sm:p-8">
          <LessonMarkdown content={lesson.content} />
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/education"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-200/80 bg-white/60 px-5 py-3 text-sm font-semibold text-zinc-700 transition-colors hover:border-emerald-500/30 dark:border-zinc-700/80 dark:bg-zinc-900/60 dark:text-zinc-300"
          >
            <ArrowLeft className="h-4 w-4" />
            All Lessons
          </Link>
          <button
            type="button"
            onClick={() => toggleComplete(lesson.slug)}
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-all",
              completed
                ? "bg-zinc-600 hover:bg-zinc-500"
                : "bg-emerald-600 shadow-lg shadow-emerald-500/20 hover:bg-emerald-500"
            )}
          >
            {completed ? "Mark Incomplete" : "Complete Lesson"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
