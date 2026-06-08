import type { QuickPrompt } from "@/types/chat";
import {
  BookOpen,
  Scale,
  Search,
  Sparkles,
  TrendingUp,
  Calculator,
} from "lucide-react";

export interface PromptCategory {
  id: string;
  label: string;
  icon: "sparkles" | "search" | "scale" | "book" | "trending" | "calculator";
  prompts: QuickPrompt[];
}

export const PROMPT_CATEGORIES: PromptCategory[] = [
  {
    id: "basics",
    label: "Getting Started",
    icon: "sparkles",
    prompts: [
      { label: "What is halal investing?", prompt: "What is halal investing and how does it differ from conventional investing?" },
      { label: "Shariah principles", prompt: "What are the core Shariah principles for halal investing?" },
    ],
  },
  {
    id: "stocks",
    label: "Stock Screening",
    icon: "search",
    prompts: [
      { label: "Is Apple halal?", prompt: "Explain why Apple (AAPL) is classified as questionable on HalalVest." },
      { label: "Compare TSLA vs NVDA", prompt: "Compare the Shariah compliance of Tesla and Nvidia stocks." },
      { label: "Why is JPM haram?", prompt: "Why is JPMorgan classified as haram? Explain in detail." },
    ],
  },
  {
    id: "screening",
    label: "Screening Methods",
    icon: "scale",
    prompts: [
      { label: "Debt ratio explained", prompt: "How does the AAOIFI debt ratio screening work for halal stocks?" },
      { label: "Impure income", prompt: "What is impure income screening and the 5% threshold?" },
      { label: "Sector screening", prompt: "Which sectors are generally haram for Muslim investors?" },
    ],
  },
  {
    id: "education",
    label: "Islamic Finance",
    icon: "book",
    prompts: [
      { label: "Explain riba", prompt: "Explain riba (interest) and why it's prohibited in Islam." },
      { label: "What is gharar?", prompt: "What is gharar (excessive uncertainty) in Islamic finance?" },
      { label: "Zakat on stocks", prompt: "How do I calculate zakat on my stock portfolio?" },
    ],
  },
];

/** Contextual follow-up suggestions based on conversation topic */
export const FOLLOW_UP_PROMPTS: Record<string, QuickPrompt[]> = {
  riba: [
    { label: "Halal alternatives to bonds", prompt: "What are Shariah-compliant alternatives to conventional bonds?" },
    { label: "Debt ratio screening", prompt: "How does debt ratio relate to riba in stock screening?" },
  ],
  stocks: [
    { label: "Build a halal portfolio", prompt: "What should I look for when building a Shariah-compliant portfolio? (educational only)" },
    { label: "Questionable stocks", prompt: "How should I handle questionable-rated stocks as a Muslim investor?" },
  ],
  zakat: [
    { label: "Zakat on ETFs", prompt: "How is zakat calculated on halal ETFs and mutual funds?" },
    { label: "Nisab threshold", prompt: "What is the nisab threshold for zakat on investments?" },
  ],
  shariah: [
    { label: "AAOIFI standards", prompt: "What are AAOIFI standards for stock screening?" },
    { label: "Scholar opinions", prompt: "Why do scholarly opinions differ on some stocks like Apple?" },
  ],
  default: [
    { label: "Screen a stock", prompt: "How do I use HalalVest to screen a stock for Shariah compliance?" },
    { label: "Common haram sectors", prompt: "What industries should Muslim investors avoid?" },
  ],
};

const ICON_MAP = {
  sparkles: Sparkles,
  search: Search,
  scale: Scale,
  book: BookOpen,
  trending: TrendingUp,
  calculator: Calculator,
};

export function getCategoryIcon(icon: PromptCategory["icon"]) {
  return ICON_MAP[icon];
}

export function getFollowUpPrompts(lastUserMessage: string): QuickPrompt[] {
  const lower = lastUserMessage.toLowerCase();
  if (/riba|interest/.test(lower)) return FOLLOW_UP_PROMPTS.riba;
  if (/zakat/.test(lower)) return FOLLOW_UP_PROMPTS.zakat;
  if (/aapl|tsla|nvda|stock|ticker|portfolio|jpm|halal stock/.test(lower))
    return FOLLOW_UP_PROMPTS.stocks;
  if (/shariah|sharia|halal invest/.test(lower)) return FOLLOW_UP_PROMPTS.shariah;
  return FOLLOW_UP_PROMPTS.default;
}

export const PRIVACY_NOTICE =
  "Messages are processed securely and stored only in your browser session — never permanently on our servers.";

export { EDUCATIONAL_DISCLAIMER } from "@/lib/chat/constants";
