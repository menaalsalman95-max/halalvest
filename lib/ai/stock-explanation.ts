import "server-only";

import OpenAI from "openai";
import { isOpenAIConfigured, serverEnv } from "@/lib/env";
import { FALLBACK_RESPONSE } from "@/lib/ai/constants";
import { sanitizeOutput } from "@/lib/ai/security";
import type { Stock } from "@/types/stock";

let openaiClient: OpenAI | null = null;

function getClient(): OpenAI {
  if (!openaiClient) {
    openaiClient = new OpenAI({ apiKey: serverEnv.openaiApiKey });
  }
  return openaiClient;
}

function buildExplanationPrompt(stock: Stock): string {
  const { screening, complianceScore } = stock;
  return `Explain the Shariah compliance classification for ${stock.ticker} (${stock.name}) to a Muslim investor in the US.

Use this HalalVest screening data (cite these figures — do not invent data):
- Overall status: ${complianceScore.status.toUpperCase()} | Score: ${complianceScore.overall}/100 | Confidence: ${complianceScore.confidence}%
- Sector: ${stock.sector} (${stock.industry})
- Debt ratio: ${screening.debtRatio.ratio}% (threshold ${screening.debtRatio.threshold}%) — ${screening.debtRatio.status}
- Impure income: ${screening.impureIncome.ratio}% (threshold ${screening.impureIncome.threshold}%) — ${screening.impureIncome.status}
- Business activities: ${screening.businessActivities.status} — ${screening.businessActivities.summary}
- Sector screening: ${screening.sectorScreening.status} — ${screening.sectorScreening.summary}

Write 3–5 short paragraphs in Markdown:
1. Overall classification and score
2. Business activity & sector analysis
3. Debt ratio (AAOIFI) and impure income screening
4. Scholarly nuance / what to watch
5. Brief educational disclaimer (not financial or religious advice)

Rules: educational only, no buy/sell recommendations, beginner-friendly, define riba if mentioned.`;
}

const FALLBACK_EXPLANATION = (stock: Stock) =>
  `**${stock.ticker}** is classified as **${stock.status.toUpperCase()}** with a compliance score of **${stock.complianceScore.overall}/100**.\n\n` +
  `${stock.screening.businessActivities.summary}\n\n` +
  `Debt ratio: **${stock.screening.debtRatio.ratio}%** (${stock.screening.debtRatio.status}). ` +
  `Impure income: **${stock.screening.impureIncome.ratio}%** (${stock.screening.impureIncome.status}).\n\n` +
  `> This analysis is for educational purposes only. Consult a qualified Islamic finance scholar for personal guidance.`;

/** Generate AI narrative explaining a stock's Shariah classification */
export async function generateStockExplanation(stock: Stock): Promise<string> {
  if (!isOpenAIConfigured()) {
    return FALLBACK_EXPLANATION(stock);
  }

  try {
    const model = serverEnv.openaiModel;
    const isGpt5 = model.startsWith("gpt-5");

    const response = await getClient().chat.completions.create({
      model,
      messages: [
        {
          role: "system",
          content:
            "You are HalalVest AI, an Islamic fintech education assistant. Explain Shariah stock screening clearly using Markdown. Never give buy/sell advice.",
        },
        { role: "user", content: buildExplanationPrompt(stock) },
      ],
      max_tokens: isGpt5 ? undefined : 600,
      max_completion_tokens: isGpt5 ? 600 : undefined,
      ...(isGpt5 ? { reasoning_effort: "low" as const } : { temperature: 0.6 }),
    });

    const raw = response.choices[0]?.message?.content?.trim();
    if (!raw) return FALLBACK_EXPLANATION(stock);
    return sanitizeOutput(raw);
  } catch {
    return FALLBACK_EXPLANATION(stock);
  }
}

export { FALLBACK_RESPONSE };
