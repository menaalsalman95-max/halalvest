import type { Metadata } from "next";
import { EducationView } from "@/components/education/education-view";

export const metadata: Metadata = {
  title: "Education Center",
  description:
    "Learn halal investing, Shariah screening, riba, zakat, and portfolio strategy with guided lessons.",
};

export default function EducationPage() {
  return <EducationView />;
}
