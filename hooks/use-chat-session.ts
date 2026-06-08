"use client";

import { useCallback, useEffect, useRef } from "react";

const SESSION_KEY = "halalvest_chat_session";

/**
 * Manages anonymous chat session IDs in sessionStorage.
 *
 * Privacy: Session IDs are random UUIDs with no PII.
 * Scoped to the browser tab — cleared when the tab closes.
 * Not shared between users or tabs.
 */
export function useChatSession() {
  const sessionIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let id = sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id = crypto.randomUUID();
      sessionStorage.setItem(SESSION_KEY, id);
    }
    sessionIdRef.current = id;
  }, []);

  const getSessionId = useCallback((): string => {
    if (sessionIdRef.current) return sessionIdRef.current;

    if (typeof window !== "undefined") {
      let id = sessionStorage.getItem(SESSION_KEY);
      if (!id) {
        id = crypto.randomUUID();
        sessionStorage.setItem(SESSION_KEY, id);
      }
      sessionIdRef.current = id;
      return id;
    }

    return crypto.randomUUID();
  }, []);

  const resetSession = useCallback(() => {
    const newId = crypto.randomUUID();
    sessionIdRef.current = newId;
    if (typeof window !== "undefined") {
      sessionStorage.setItem(SESSION_KEY, newId);
    }
  }, []);

  return { getSessionId, resetSession };
}
