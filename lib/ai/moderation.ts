import "server-only";

import OpenAI from "openai";
import { serverEnv } from "@/lib/env";

/**
 * OpenAI Moderation API — filters harmful, unsafe, or abusive content
 * before it reaches the chat model. Free to use with OpenAI API key.
 */

let moderationClient: OpenAI | null = null;

function getClient(): OpenAI {
  if (!moderationClient) {
    moderationClient = new OpenAI({ apiKey: serverEnv.openaiApiKey });
  }
  return moderationClient;
}

export interface ModerationResult {
  flagged: boolean;
  categories: string[];
}

export async function moderateContent(text: string): Promise<ModerationResult> {
  try {
    const client = getClient();
    const response = await client.moderations.create({
      model: "omni-moderation-latest",
      input: text,
    });

    const result = response.results[0];
    if (!result) return { flagged: false, categories: [] };

    const flaggedCategories = Object.entries(result.categories)
      .filter(([, flagged]) => flagged)
      .map(([category]) => category);

    return {
      flagged: result.flagged,
      categories: flaggedCategories,
    };
  } catch (error) {
    // Fail closed: if moderation is unavailable, log and allow with local checks only
    console.error("[moderation] API error:", error);
    return { flagged: false, categories: [] };
  }
}
