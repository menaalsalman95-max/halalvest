import "server-only";

import { analyzeTicker, searchCompanies } from "@/lib/stocks/repository";

/**
 * Builds compact stock screening context for the AI system prompt.
 * Searches the scalable company database for tickers and keywords in the message.
 */
export function buildStockContext(userMessage: string): string {
  const found = new Map<string, ReturnType<typeof analyzeTicker>>();

  const tickerPattern = /\b[A-Z]{1,5}(?:\.[A-Z])?\b/g;
  let match: RegExpExecArray | null;
  while ((match = tickerPattern.exec(userMessage.toUpperCase())) !== null) {
    const result = analyzeTicker(match[0]);
    if (result) found.set(result.stock.ticker, result);
  }

  const words = userMessage.toLowerCase().split(/\s+/).filter((w) => w.length >= 3);
  for (const word of words) {
    const { results } = searchCompanies(word, 2);
    for (const r of results) {
      const result = analyzeTicker(r.ticker);
      if (result) found.set(result.stock.ticker, result);
    }
  }

  if (found.size === 0) return "";

  const summaries = [...found.values()]
    .filter((r): r is NonNullable<typeof r> => r != null)
    .slice(0, 5)
    .map(({ stock: s }) => {
      return `- **${s.ticker}** (${s.name}): Status **${s.status.toUpperCase()}** | Score ${s.complianceScore.overall}/100 | Confidence ${s.complianceScore.confidence}% | Debt ${s.screening.debtRatio.ratio}% | Impure income ${s.screening.impureIncome.ratio}% | Sector: ${s.sector}`;
    })
    .join("\n");

  return `\n\nHALALVEST SCREENING DATA (use for stock questions — cite these figures, do not invent data):\n${summaries}\n\nWhen explaining stocks, reference HalalVest screening scores and explain WHY using business activities, debt ratio, and sector analysis. Never guarantee returns or recommend buying/selling.`;
}

/** Detect topics for richer responses */
export function detectTopics(message: string): string[] {
  const lower = message.toLowerCase();
  const topics: string[] = [];
  if (/riba|interest|loan/.test(lower)) topics.push("riba");
  if (/zakat/.test(lower)) topics.push("zakat");
  if (/debt|ratio|aaoifi/.test(lower)) topics.push("debt_screening");
  if (/halal|haram|shariah|sharia/.test(lower)) topics.push("shariah");
  if (/stock|ticker|invest|portfolio/.test(lower)) topics.push("stocks");
  return topics;
}
