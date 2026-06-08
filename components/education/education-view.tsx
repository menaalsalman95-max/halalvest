"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { EducationStats } from "@/components/education/education-stats";
import { FeaturedLesson } from "@/components/education/featured-lesson";
import { LessonCard } from "@/components/education/lesson-card";
import { LessonFilters } from "@/components/education/lesson-filters";
import { useEducationProgress } from "@/hooks/use-education-progress";
import {
  EDUCATION_LESSONS,
  filterLessons,
  getFeaturedLesson,
} from "@/lib/education/catalog";
import type { EducationCategory } from "@/types/education";

export function EducationView() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<EducationCategory>("all");

  const lessonSlugs = useMemo(() => EDUCATION_LESSONS.map((lesson) => lesson.slug), []);
  const { completedCount, progressPercent, loaded, isComplete, toggleComplete } =
    useEducationProgress(lessonSlugs);

  const totalLessons = EDUCATION_LESSONS.length;

  const featuredLesson = getFeaturedLesson();
  const filteredLessons = useMemo(
    () => filterLessons(query, category),
    [query, category]
  );

  return (
    <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[380px] w-[680px] -translate-x-1/2 rounded-full bg-emerald-500/8 blur-3xl dark:bg-emerald-500/12"
        aria-hidden
      />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative mb-8 text-center lg:mb-10"
      >
        <div className="mx-auto mb-4 inline-flex rounded-2xl bg-emerald-500/10 p-3 ring-1 ring-emerald-500/20">
          <GraduationCap className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
        </div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
          Islamic Fintech · Learning Hub
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
          Education Center
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-600 dark:text-zinc-400">
          Master halal investing with guided lessons on Shariah principles, portfolio strategy,
          and financial analysis — track your progress as you learn.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="relative mb-8"
      >
        <EducationStats
          totalLessons={totalLessons}
          completedCount={completedCount}
          progressPercent={progressPercent}
          loaded={loaded}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative mb-8"
      >
        <FeaturedLesson
          lesson={featuredLesson}
          completed={isComplete(featuredLesson.slug)}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="relative mb-8"
      >
        <LessonFilters
          query={query}
          category={category}
          onQueryChange={setQuery}
          onCategoryChange={setCategory}
          resultCount={filteredLessons.length}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative"
      >
        {filteredLessons.length === 0 ? (
          <div className="glass-card border-dashed py-16 text-center">
            <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
              No lessons match your search
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              Try a different keyword or category filter.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredLessons.map((lesson) => (
              <LessonCard
                key={lesson.slug}
                lesson={lesson}
                completed={isComplete(lesson.slug)}
                onToggleComplete={toggleComplete}
              />
            ))}
          </div>
        )}
      </motion.div>

      <p className="mt-8 text-center text-xs text-zinc-500">
        Educational content only · Not financial or religious advice · Consult qualified scholars
      </p>
    </div>
  );
}
