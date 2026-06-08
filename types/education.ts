export type EducationCategory =
  | "all"
  | "fundamentals"
  | "islamic-finance"
  | "products"
  | "strategy"
  | "analysis";

export interface EducationLesson {
  slug: string;
  title: string;
  description: string;
  category: Exclude<EducationCategory, "all">;
  readingTimeMinutes: number;
  featured: boolean;
  content: string;
}

export interface EducationCategoryOption {
  value: EducationCategory;
  label: string;
}
