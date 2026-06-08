export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  /** True when the message was blocked by security checks */
  blocked?: boolean;
  /** True when response is educational, not advice */
  educational?: boolean;
  /** True while content is streaming in */
  streaming?: boolean;
}

export interface QuickPrompt {
  label: string;
  prompt: string;
}

/** Client → server chat API request (ephemeral, not stored server-side) */
export interface ChatApiRequest {
  message: string;
  sessionId: string;
  history?: Array<{ role: "user" | "assistant"; content: string }>;
}

/** Server → client chat API response (non-streaming errors/blocks) */
export interface ChatApiResponse {
  message: string;
  source?: "openai" | "fallback";
  blocked?: boolean;
  reason?: "empty" | "injection" | "haram" | "moderation";
  error?: string;
  educational?: boolean;
}

export type ChatStatus = "idle" | "loading" | "streaming" | "error";
