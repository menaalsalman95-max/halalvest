import "server-only";

import { CHAT_LIMITS } from "@/lib/chat/constants";
import { INJECTION_BLOCK_RESPONSE, HARAM_REQUEST_RESPONSE } from "@/lib/ai/constants";

/**
 * Security utilities for AI chat input/output.
 * All user content is sanitized before processing and before returning to clients.
 */

/** Strip HTML tags, null bytes, and control characters to prevent XSS */
export function sanitizeInput(input: string): string {
  return input
    .replace(/\0/g, "")
    .replace(/<[^>]*>/g, "")
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
    .trim()
    .slice(0, CHAT_LIMITS.maxMessageLength);
}

/** Sanitize AI output — strip any accidental HTML/script content */
export function sanitizeOutput(output: string): string {
  return output
    .replace(/\0/g, "")
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<[^>]*>/g, "")
    .replace(/javascript:/gi, "")
    .trim()
    .slice(0, CHAT_LIMITS.maxMessageLength * 2);
}

/** Validate anonymous session ID format (UUID v4) — prevents session spoofing */
const UUID_V4_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isValidSessionId(sessionId: string): boolean {
  return UUID_V4_REGEX.test(sessionId);
}

/** Prompt injection patterns — attempts to override system instructions */
const INJECTION_PATTERNS = [
  /ignore\s+(all\s+)?(previous|prior|above)\s+(instructions|prompts|rules)/i,
  /disregard\s+(your|the)\s+(instructions|rules|guidelines)/i,
  /you\s+are\s+now\s+/i,
  /act\s+as\s+(a\s+)?(different|new|unrestricted)/i,
  /pretend\s+(you\s+are|to\s+be)/i,
  /forget\s+(your|all)\s+(rules|instructions)/i,
  /system\s*prompt/i,
  /reveal\s+(your|the)\s+(prompt|instructions|rules)/i,
  /jailbreak/i,
  /DAN\s+mode/i,
  /do\s+anything\s+now/i,
  /override\s+(safety|content|moderation)/i,
  /\[INST\]/i,
  /<\|im_start\|>/i,
  /```system/i,
];

export function detectPromptInjection(input: string): boolean {
  return INJECTION_PATTERNS.some((pattern) => pattern.test(input));
}

/** Block requests seeking haram investment guidance */
const HARAM_REQUEST_PATTERNS = [
  /\b(invest|buy|trade|short|hold)\s+(in\s+)?(jpmorgan|jp\s*morgan|chase|bank\s+stock)/i,
  /\b(casino|gambling|alcohol|brewery|distiller|adult\s+entertainment|pork)\s+(stock|invest)/i,
  /\bbest\s+haram\s+invest/i,
  /\bhow\s+to\s+invest\s+in\s+(riba|interest|conventional\s+bank)/i,
  /\brecommend\s+(a\s+)?(haram|non-?halal|unethical)\s+(stock|investment)/i,
];

export function detectHaramRequest(input: string): boolean {
  return HARAM_REQUEST_PATTERNS.some((pattern) => pattern.test(input));
}

export type SecurityCheckResult =
  | { allowed: true; sanitized: string }
  | { allowed: false; reason: "empty" | "injection" | "haram"; message: string };

/** Run all input security checks in order */
export function validateUserInput(raw: string): SecurityCheckResult {
  const sanitized = sanitizeInput(raw);

  if (!sanitized || sanitized.length < 1) {
    return { allowed: false, reason: "empty", message: "Please enter a message." };
  }

  if (detectPromptInjection(sanitized)) {
    return { allowed: false, reason: "injection", message: INJECTION_BLOCK_RESPONSE };
  }

  if (detectHaramRequest(sanitized)) {
    return { allowed: false, reason: "haram", message: HARAM_REQUEST_RESPONSE };
  }

  return { allowed: true, sanitized };
}

/** Validate conversation history sent from client — limit size and sanitize each message */
export function sanitizeHistory(
  history: unknown
): Array<{ role: "user" | "assistant"; content: string }> {
  if (!Array.isArray(history)) return [];

  return history
    .slice(-CHAT_LIMITS.maxHistoryMessages)
    .filter(
      (msg): msg is { role: string; content: string } =>
        typeof msg === "object" &&
        msg !== null &&
        (msg.role === "user" || msg.role === "assistant") &&
        typeof msg.content === "string"
    )
    .map((msg) => ({
      role: msg.role as "user" | "assistant",
      content: sanitizeInput(msg.content),
    }))
    .filter((msg) => msg.content.length > 0);
}
