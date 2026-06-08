/** SSE stream event types from /api/chat */
export type ChatStreamEvent =
  | { type: "delta"; content: string }
  | { type: "done"; content: string; educational: true }
  | { type: "error"; message: string };

/**
 * Parses Server-Sent Events from the chat API stream.
 * Returns the final sanitized content when the stream completes.
 */
export async function parseChatStream(
  response: Response,
  onDelta: (accumulated: string) => void
): Promise<{ content: string; educational: boolean; error?: string }> {
  const reader = response.body?.getReader();
  if (!reader) {
    throw new Error("No response stream");
  }

  const decoder = new TextDecoder();
  let buffer = "";
  let accumulated = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith("data:")) continue;

      const payload = trimmed.slice(5).trim();
      if (payload === "[DONE]") continue;

      try {
        const event = JSON.parse(payload) as ChatStreamEvent;

        if (event.type === "delta") {
          accumulated += event.content;
          onDelta(accumulated);
        }

        if (event.type === "done") {
          return { content: event.content, educational: event.educational };
        }

        if (event.type === "error") {
          return { content: event.message, educational: true, error: "stream_error" };
        }
      } catch {
        // Skip malformed SSE lines
      }
    }
  }

  return {
    content: accumulated || "No response received.",
    educational: true,
  };
}
