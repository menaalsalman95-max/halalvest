/** Client-safe chat limits — used for UI validation */
export const CHAT_LIMITS = {
  maxMessageLength: 1000,
  maxHistoryMessages: 20,
  maxOutputTokens: 800,
  sessionIdLength: 36,
  /** sessionStorage key for conversation memory (tab-scoped, not permanent) */
  memoryStorageKey: "halalvest_chat_memory",
} as const;

export const FALLBACK_RESPONSE =
  "I'm temporarily unable to process your request. Please try again in a moment. Remember: HalalVest provides educational information only — not financial advice.";

export const EDUCATIONAL_DISCLAIMER =
  "Educational information only · Not financial, legal, or religious advice";
