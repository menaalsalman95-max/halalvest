import { NextResponse } from "next/server";
import { isOpenAIConfigured, serverEnv, validateServerEnv } from "@/lib/env";
import {
  MODERATION_BLOCK_RESPONSE,
  RATE_LIMIT_RESPONSE,
  FALLBACK_RESPONSE,
} from "@/lib/ai/constants";
import {
  validateUserInput,
  sanitizeHistory,
  isValidSessionId,
} from "@/lib/ai/security";
import { getClientIp, checkRateLimit } from "@/lib/ai/rate-limit";
import { moderateContent } from "@/lib/ai/moderation";
import { createChatStream } from "@/lib/ai/openai-client";
import type { ChatApiRequest, ChatApiResponse } from "@/types/chat";

/**
 * POST /api/chat
 *
 * Secure server-side AI chat endpoint with SSE streaming.
 *
 * Security layers (in order):
 * 1. Method restriction (POST only)
 * 2. Session ID format validation (UUID v4)
 * 3. Rate limiting (IP + session)
 * 4. Input sanitization (XSS prevention)
 * 5. Prompt injection detection
 * 6. Haram request blocking
 * 7. OpenAI Moderation API
 * 8. OpenAI Chat Completions stream (server-side only)
 * 9. Output sanitization on stream completion
 *
 * Privacy: No chat data is persisted to disk or database.
 */

export const runtime = "nodejs";

/** JSON helper for blocked/error responses (non-streaming) */
function jsonResponse(body: ChatApiResponse, status = 200) {
  return NextResponse.json<ChatApiResponse>(body, { status });
}

export async function POST(request: Request) {
  try {
    // --- Layer 1: Parse and validate request body ---
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return jsonResponse(
        { message: "Invalid request format.", error: "invalid_json", educational: true },
        400
      );
    }

    const { message, sessionId, history } = body as ChatApiRequest;

    if (typeof sessionId !== "string" || !isValidSessionId(sessionId)) {
      return jsonResponse(
        { message: "Invalid session.", error: "invalid_session", educational: true },
        400
      );
    }

    // --- Layer 2: Rate limiting ---
    const clientIp = getClientIp(request);
    const rateCheck = checkRateLimit(clientIp, sessionId, {
      perMinute: serverEnv.rateLimitPerMinute,
      perSessionHour: serverEnv.rateLimitPerSessionHour,
    });

    if (!rateCheck.allowed) {
      return NextResponse.json<ChatApiResponse>(
        {
          message: RATE_LIMIT_RESPONSE,
          error: "rate_limited",
          educational: true,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateCheck.retryAfterSeconds ?? 60),
          },
        }
      );
    }

    // --- Layer 3: Input security checks (no API key required) ---
    if (typeof message !== "string") {
      return jsonResponse(
        { message: "Please enter a valid message.", error: "invalid_message", educational: true },
        400
      );
    }

    const inputCheck = validateUserInput(message);
    if (!inputCheck.allowed) {
      return jsonResponse({
        message: inputCheck.message,
        blocked: true,
        reason: inputCheck.reason,
        educational: true,
      });
    }

    const sanitizedHistory = sanitizeHistory(history);

    // --- Layer 4: Validate OpenAI configuration (required for AI responses) ---
    const envCheck = validateServerEnv();
    if (!envCheck.valid) {
      console.error("[chat] Missing env vars:", envCheck.missing);
      return jsonResponse(
        {
          message: FALLBACK_RESPONSE,
          error: "service_unavailable",
          educational: true,
        },
        503
      );
    }

    // --- Layer 5: AI moderation (OpenAI Moderation API) ---
    if (isOpenAIConfigured()) {
      const moderation = await moderateContent(inputCheck.sanitized);
      if (moderation.flagged) {
        console.warn("[chat] Moderation flagged:", moderation.categories, "IP:", clientIp);
        return jsonResponse({
          message: MODERATION_BLOCK_RESPONSE,
          blocked: true,
          reason: "moderation",
          educational: true,
        });
      }
    }

    // --- Layer 6: Stream OpenAI response via SSE ---
    const stream = createChatStream({
      message: inputCheck.sanitized,
      history: sanitizedHistory,
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("[chat] Unhandled error:", error);
    return jsonResponse(
      {
        message: FALLBACK_RESPONSE,
        error: "internal_error",
        educational: true,
      },
      500
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export async function PUT() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
