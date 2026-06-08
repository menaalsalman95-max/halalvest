"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Minimize2,
  Trash2,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatMessageBubble } from "@/components/ai/chat-message";
import { ChatPrivacyNotice } from "@/components/ai/chat-privacy-notice";
import { ChatLoading } from "@/components/ai/chat-loading";
import { SuggestedPrompts, PromptCategories } from "@/components/ai/suggested-prompts";
import { useChat } from "@/hooks/use-chat";
import {
  PROMPT_CATEGORIES,
  getCategoryIcon,
  EDUCATIONAL_DISCLAIMER,
} from "@/lib/chat/prompts";
import { CHAT_LIMITS } from "@/lib/chat/constants";
import type { ChatMessage } from "@/types/chat";
import { cn } from "@/lib/utils";

const WELCOME_MESSAGE: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content: `Assalamu alaikum! I'm **HalalVest AI**, your Islamic fintech education assistant.

I can help you with:
- **Halal investing** principles and Shariah screening
- **Stock compliance** explanations (AAPL, TSLA, NVDA, and more)
- **Islamic finance** concepts like riba, gharar, and zakat

> *Educational information only — not financial, legal, or religious advice.*

What would you like to learn about today?`,
  timestamp: new Date(),
  educational: true,
};

export function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const {
    messages,
    isLoading,
    isStreaming,
    error,
    suggestedPrompts,
    sendMessage,
    clearChat,
    hydrated,
  } = useChat({ welcomeMessage: WELCOME_MESSAGE });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isBusy = isLoading || isStreaming;
  const showCategories = messages.length <= 1 && !isBusy;
  const messageCount = messages.filter((m) => m.id !== "welcome").length;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading, isStreaming, suggestedPrompts]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const handleSubmit = (text: string) => {
    if (!text.trim() || isBusy) return;
    sendMessage(text);
    setInput("");
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm sm:hidden"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={cn(
                "mb-4 flex flex-col overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-2xl shadow-emerald-900/10 dark:border-zinc-700/80 dark:bg-zinc-900",
                "w-[calc(100vw-2rem)] sm:w-[420px]"
              )}
              role="dialog"
              aria-label="HalalVest AI Assistant"
              aria-live="polite"
            >
              {/* Premium header */}
              <div className="relative overflow-hidden border-b border-emerald-700/30 bg-gradient-to-r from-emerald-600 via-emerald-600 to-emerald-700 px-4 py-3.5">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjEiLz48L2c+PC9zdmc+')] opacity-60" />
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 text-xs font-bold text-white shadow-inner backdrop-blur-sm">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">HalalVest AI</p>
                      <p className="text-[11px] text-emerald-100">
                        Islamic fintech advisor
                        {messageCount > 0 && ` · ${Math.floor(messageCount / 2)} exchanges`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearChat}
                      className="text-white/80 hover:bg-white/10 hover:text-white"
                      aria-label="Clear chat history"
                      title="Clear conversation"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setOpen(false)}
                      className="text-white/80 hover:bg-white/10 hover:text-white"
                      aria-label="Minimize chat"
                    >
                      <Minimize2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setOpen(false)}
                      className="text-white/80 hover:bg-white/10 hover:text-white"
                      aria-label="Close chat"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Messages area */}
              <div className="flex h-[460px] flex-col">
                <div className="flex-1 space-y-4 overflow-y-auto p-4 scroll-smooth">
                  {hydrated && (
                    <>
                      <ChatPrivacyNotice />

                      {messages.map((msg, i) => (
                        <ChatMessageBubble key={msg.id} message={msg} index={i} />
                      ))}

                      {isLoading && !isStreaming && (
                        <ChatLoading label="Consulting Shariah screening knowledge..." />
                      )}

                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600 dark:bg-red-950/50 dark:text-red-400"
                        >
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                          {error}
                        </motion.div>
                      )}

                      {/* Contextual follow-ups after responses */}
                      {!isBusy && suggestedPrompts.length > 0 && (
                        <SuggestedPrompts
                          prompts={suggestedPrompts}
                          onSelect={handleSubmit}
                          disabled={isBusy}
                        />
                      )}

                      <div ref={messagesEndRef} />
                    </>
                  )}
                </div>

                {/* Starter prompt categories */}
                {showCategories && hydrated && (
                  <div className="max-h-40 overflow-y-auto border-t border-zinc-100 px-4 py-3 dark:border-zinc-800">
                    <PromptCategories
                      categories={PROMPT_CATEGORIES}
                      onSelect={handleSubmit}
                      disabled={isBusy}
                      getIcon={getCategoryIcon}
                    />
                  </div>
                )}

                {/* Input area */}
                <div className="border-t border-zinc-200 bg-zinc-50/50 p-3 dark:border-zinc-700 dark:bg-zinc-900/50">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSubmit(input);
                    }}
                    className="flex gap-2"
                  >
                    <Input
                      ref={inputRef}
                      value={input}
                      onChange={(e) =>
                        setInput(e.target.value.slice(0, CHAT_LIMITS.maxMessageLength))
                      }
                      placeholder="Ask about halal investing, stocks, or Islamic finance..."
                      disabled={isBusy}
                      maxLength={CHAT_LIMITS.maxMessageLength}
                      className="h-10 border-zinc-200 bg-white text-sm dark:border-zinc-600 dark:bg-zinc-800"
                      aria-label="Chat message"
                    />
                    <Button
                      type="submit"
                      variant="primary"
                      size="sm"
                      disabled={!input.trim() || isBusy}
                      className="h-10 w-10 shrink-0 px-0"
                      aria-label="Send message"
                    >
                      {isBusy ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                        />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </Button>
                  </form>
                  <p className="mt-2 text-center text-[10px] leading-relaxed text-zinc-400">
                    {EDUCATIONAL_DISCLAIMER}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!open && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="primary"
              size="lg"
              onClick={() => setOpen(true)}
              className="relative h-14 w-14 rounded-full shadow-lg shadow-emerald-600/30"
              aria-label="Open AI assistant"
            >
              <MessageCircle className="h-6 w-6" />
              <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
              </span>
            </Button>
          </motion.div>
        )}
      </div>
    </>
  );
}
