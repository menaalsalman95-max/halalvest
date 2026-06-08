import "server-only";

import OpenAI from "openai";
import { serverEnv } from "@/lib/env";
import {
  buildSystemPrompt,
  CHAT_LIMITS,
  FALLBACK_RESPONSE,
} from "@/lib/ai/constants";
import { sanitizeOutput } from "@/lib/ai/security";

/**
 * Server-only OpenAI client with streaming and retry logic.
 * API key is read from environment — never sent to or accessible from the browser.
 */

let openaiClient: OpenAI | null = null;

function getClient(): OpenAI {
  if (!openaiClient) {
    openaiClient = new OpenAI({ apiKey: serverEnv.openaiApiKey });
  }
  return openaiClient;
}

const RETRYABLE_STATUS_CODES = new Set([429, 500, 502, 503, 504]);
const MAX_RETRIES = 3;
const BASE_DELAY_MS = 1000;

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export interface ChatCompletionInput {
  message: string;
  history: Array<{ role: "user" | "assistant"; content: string }>;
}

export type StreamEvent =
  | { type: "delta"; content: string }
  | { type: "done"; content: string; educational: true }
  | { type: "error"; message: string };

function buildMessages(
  input: ChatCompletionInput
): OpenAI.Chat.ChatCompletionMessageParam[] {
  return [
    { role: "system", content: buildSystemPrompt(input.message) },
    ...input.history.map((msg) => ({
      role: msg.role as "user" | "assistant",
      content: msg.content,
    })),
    { role: "user", content: input.message },
  ];
}

/** Build model params — GPT-5.5 uses max_completion_tokens and reasoning_effort */
function buildModelParams(model: string) {
  const isGpt5 = model.startsWith("gpt-5");
  return {
    model,
    max_tokens: isGpt5 ? undefined : CHAT_LIMITS.maxOutputTokens,
    max_completion_tokens: isGpt5 ? CHAT_LIMITS.maxOutputTokens : undefined,
    // Low reasoning effort keeps chat responses fast for a fintech assistant
    ...(isGpt5 ? { reasoning_effort: "low" as const } : {}),
    temperature: isGpt5 ? undefined : 0.7,
    presence_penalty: 0.1,
    frequency_penalty: 0.1,
  };
}

function encodeSSE(event: StreamEvent): Uint8Array {
  return new TextEncoder().encode(`data: ${JSON.stringify(event)}\n\n`);
}

/**
 * Creates a ReadableStream of SSE events for smooth client-side streaming.
 * Output is sanitized once the full response is assembled.
 */
export function createChatStream(input: ChatCompletionInput): ReadableStream<Uint8Array> {
  const client = getClient();
  const messages = buildMessages(input);
  const modelParams = buildModelParams(serverEnv.openaiModel);

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      let attempt = 0;

      while (attempt < MAX_RETRIES) {
        try {
          const stream = await client.chat.completions.create({
            ...modelParams,
            messages,
            stream: true,
          });

          let fullContent = "";

          for await (const chunk of stream) {
            const delta = chunk.choices[0]?.delta?.content ?? "";
            if (delta) {
              fullContent += delta;
              controller.enqueue(encodeSSE({ type: "delta", content: delta }));
            }
          }

          const sanitized = fullContent
            ? sanitizeOutput(fullContent)
            : FALLBACK_RESPONSE;

          controller.enqueue(
            encodeSSE({ type: "done", content: sanitized, educational: true })
          );
          controller.enqueue(new TextEncoder().encode("data: [DONE]\n\n"));
          controller.close();
          return;
        } catch (error) {
          const status =
            error instanceof OpenAI.APIError ? error.status : undefined;
          const isRetryable =
            status !== undefined && RETRYABLE_STATUS_CODES.has(status);
          const isLastAttempt = attempt === MAX_RETRIES - 1;

          if (!isRetryable || isLastAttempt) {
            console.error("[openai] Stream failed:", error);
            controller.enqueue(
              encodeSSE({ type: "error", message: FALLBACK_RESPONSE })
            );
            controller.close();
            return;
          }

          attempt++;
          const delay = BASE_DELAY_MS * Math.pow(2, attempt) + Math.random() * 500;
          await sleep(delay);
        }
      }
    },
  });
}
