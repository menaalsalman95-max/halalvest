"use client";

import { useCallback, useState, useEffect, useRef } from "react";
import { CHAT_LIMITS, FALLBACK_RESPONSE } from "@/lib/chat/constants";
import { getFollowUpPrompts } from "@/lib/chat/prompts";
import { parseChatStream } from "@/lib/chat/stream-parser";
import { useChatSession } from "@/hooks/use-chat-session";
import type { ChatMessage, ChatApiResponse, ChatStatus, QuickPrompt } from "@/types/chat";

interface UseChatOptions {
  welcomeMessage: ChatMessage;
}

interface StoredMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  blocked?: boolean;
  educational?: boolean;
}

/** Persist conversation to sessionStorage (tab-scoped, privacy-friendly) */
function saveConversation(messages: ChatMessage[], welcomeId: string) {
  if (typeof window === "undefined") return;
  const toStore: StoredMessage[] = messages
    .filter((m) => m.id !== welcomeId && !m.streaming)
    .map((m) => ({
      id: m.id,
      role: m.role,
      content: m.content,
      timestamp: m.timestamp.toISOString(),
      blocked: m.blocked,
      educational: m.educational,
    }));
  sessionStorage.setItem(CHAT_LIMITS.memoryStorageKey, JSON.stringify(toStore));
}

function loadConversation(welcomeMessage: ChatMessage): ChatMessage[] {
  if (typeof window === "undefined") return [welcomeMessage];
  try {
    const raw = sessionStorage.getItem(CHAT_LIMITS.memoryStorageKey);
    if (!raw) return [welcomeMessage];
    const stored: StoredMessage[] = JSON.parse(raw);
    const restored = stored.map((m) => ({
      ...m,
      timestamp: new Date(m.timestamp),
    }));
    return [welcomeMessage, ...restored];
  } catch {
    return [welcomeMessage];
  }
}

/**
 * Premium chat hook with streaming, session memory, and contextual suggestions.
 */
export function useChat({ welcomeMessage }: UseChatOptions) {
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage]);
  const [status, setStatus] = useState<ChatStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [suggestedPrompts, setSuggestedPrompts] = useState<QuickPrompt[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const { getSessionId } = useChatSession();
  const messagesRef = useRef(messages);
  messagesRef.current = messages;

  // Restore conversation memory from sessionStorage
  useEffect(() => {
    setMessages(loadConversation(welcomeMessage));
    setHydrated(true);
  }, [welcomeMessage]);

  // Persist after each message update
  useEffect(() => {
    if (!hydrated || status === "streaming" || status === "loading") return;
    saveConversation(messages, welcomeMessage.id);
  }, [messages, hydrated, status, welcomeMessage.id]);

  const updateAssistantMessage = useCallback(
    (id: string, updates: Partial<ChatMessage>) => {
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, ...updates } : m))
      );
    },
    []
  );

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || status === "loading" || status === "streaming") return;

      if (trimmed.length > CHAT_LIMITS.maxMessageLength) {
        setError(`Message too long (max ${CHAT_LIMITS.maxMessageLength} characters).`);
        return;
      }

      setError(null);
      setSuggestedPrompts([]);

      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        role: "user",
        content: trimmed,
        timestamp: new Date(),
      };

      const assistantId = `assistant-${Date.now()}`;
      const placeholderAssistant: ChatMessage = {
        id: assistantId,
        role: "assistant",
        content: "",
        timestamp: new Date(),
        streaming: true,
        educational: true,
      };

      setMessages((prev) => [...prev, userMessage, placeholderAssistant]);
      setStatus("loading");

      const currentMessages = messagesRef.current;
      const history = currentMessages
        .filter((m) => m.id !== welcomeMessage.id && !m.streaming && m.content)
        .slice(-CHAT_LIMITS.maxHistoryMessages)
        .map((m) => ({ role: m.role, content: m.content }));

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: trimmed,
            sessionId: getSessionId(),
            history,
          }),
        });

        const contentType = response.headers.get("content-type") ?? "";

        if (contentType.includes("application/json")) {
          const data: ChatApiResponse = await response.json();
          updateAssistantMessage(assistantId, {
            content: data.message || FALLBACK_RESPONSE,
            streaming: false,
            blocked: data.blocked,
            educational: data.educational ?? true,
          });
          setSuggestedPrompts(getFollowUpPrompts(trimmed));
          setStatus(!response.ok && response.status !== 429 ? "error" : "idle");
          if (!response.ok && response.status !== 429) {
            setError("Something went wrong. Please try again.");
          }
          return;
        }

        if (!response.ok) {
          updateAssistantMessage(assistantId, {
            content: FALLBACK_RESPONSE,
            streaming: false,
            educational: true,
          });
          setError("Something went wrong. Please try again.");
          setStatus("error");
          return;
        }

        setStatus("streaming");

        const result = await parseChatStream(response, (accumulated) => {
          updateAssistantMessage(assistantId, {
            content: accumulated,
            streaming: true,
          });
        });

        updateAssistantMessage(assistantId, {
          content: result.content,
          streaming: false,
          educational: result.educational,
        });

        setSuggestedPrompts(getFollowUpPrompts(trimmed));
        setStatus(result.error ? "error" : "idle");
        if (result.error) {
          setError("Response may be incomplete. Please try again if needed.");
        }
      } catch {
        updateAssistantMessage(assistantId, {
          content: FALLBACK_RESPONSE,
          streaming: false,
          educational: true,
        });
        setError("Unable to connect. Please check your connection and try again.");
        setStatus("error");
      }
    },
    [status, welcomeMessage.id, getSessionId, updateAssistantMessage]
  );

  const clearChat = useCallback(() => {
    setMessages([welcomeMessage]);
    setError(null);
    setStatus("idle");
    setSuggestedPrompts([]);
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(CHAT_LIMITS.memoryStorageKey);
    }
  }, [welcomeMessage]);

  const lastUserMessage =
    [...messages].reverse().find((m) => m.role === "user")?.content ?? "";

  return {
    messages,
    status,
    isLoading: status === "loading",
    isStreaming: status === "streaming",
    error,
    suggestedPrompts,
    lastUserMessage,
    sendMessage,
    clearChat,
    hydrated,
  };
}
