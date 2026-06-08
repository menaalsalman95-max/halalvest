"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "halalvest-education-progress";

function readProgress(): Set<string> {
  if (typeof window === "undefined") {
    return new Set();
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return new Set();
    return new Set(parsed.filter((item): item is string => typeof item === "string"));
  } catch {
    return new Set();
  }
}

function writeProgress(slugs: Set<string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...slugs]));
}

export function useEducationProgress(validSlugs: string[]) {
  const [completedSlugs, setCompletedSlugs] = useState<Set<string>>(new Set());
  const [loaded, setLoaded] = useState(false);
  const totalLessons = validSlugs.length;

  useEffect(() => {
    setCompletedSlugs(readProgress());
    setLoaded(true);
  }, []);

  const toggleComplete = useCallback((slug: string) => {
    setCompletedSlugs((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      writeProgress(next);
      return next;
    });
  }, []);

  const markComplete = useCallback((slug: string) => {
    setCompletedSlugs((prev) => {
      if (prev.has(slug)) return prev;
      const next = new Set(prev).add(slug);
      writeProgress(next);
      return next;
    });
  }, []);

  const isComplete = useCallback(
    (slug: string) => completedSlugs.has(slug),
    [completedSlugs]
  );

  const completedCount = validSlugs.filter((slug) => completedSlugs.has(slug)).length;
  const progressPercent =
    totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  return {
    completedSlugs,
    completedCount,
    progressPercent,
    loaded,
    toggleComplete,
    markComplete,
    isComplete,
  };
}
