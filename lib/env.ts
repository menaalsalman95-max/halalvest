/** Client-safe environment values */
export const env = {} as const;

/** Server-only environment values (import from server modules) */
export const serverEnv = {
  openaiApiKey: process.env.OPENAI_API_KEY ?? "",
  openaiModel: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
  rateLimitPerMinute: Number(process.env.RATE_LIMIT_PER_MINUTE ?? 10),
  rateLimitPerSessionHour: Number(process.env.RATE_LIMIT_PER_SESSION_HOUR ?? 50),
} as const;

export function isOpenAIConfigured(): boolean {
  return serverEnv.openaiApiKey.length > 0;
}

export function validateServerEnv(): { valid: boolean; missing: string[] } {
  const missing: string[] = [];
  if (!serverEnv.openaiApiKey) missing.push("OPENAI_API_KEY");
  return { valid: missing.length === 0, missing };
}
