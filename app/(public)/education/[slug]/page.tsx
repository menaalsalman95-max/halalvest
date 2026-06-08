import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LessonDetailView } from "@/components/education/lesson-detail-view";
import { getLessonBySlug, getLessonSlugs } from "@/lib/education/catalog";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getLessonSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const lesson = getLessonBySlug(slug);
  if (!lesson) return { title: "Lesson Not Found" };
  return {
    title: lesson.title,
    description: lesson.description,
  };
}

export default async function LessonPage({ params }: PageProps) {
  const { slug } = await params;
  const lesson = getLessonBySlug(slug);

  if (!lesson) {
    notFound();
  }

  return <LessonDetailView lesson={lesson} />;
}
