"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/types/chat";
import { MarkdownContent } from "@/components/ai/markdown-content";
import { ChatTypingIndicator } from "@/components/ai/chat-loading";
import { BookOpen, Shield } from "lucide-react";

interface ChatMessageBubbleProps {
  message: ChatMessage;
  index?: number;
}

function formatTimestamp(date: Date): string {
  return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

export function ChatMessageBubble({ message, index = 0 }: ChatMessageBubbleProps) {
  const isUser = message.role === "user";
  const isEmptyStreaming = message.streaming && !message.content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.03 }}
      className={cn("flex gap-2.5", isUser ? "flex-row-reverse" : "flex-row")}
    >
      {!isUser && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 text-[10px] font-bold text-white shadow-md shadow-emerald-500/20">
          HV
        </div>
      )}
      <div className={cn("max-w-[88%]", isUser ? "items-end" : "items-start")}>
        <div
          className={cn(
            "rounded-2xl px-4 py-2.5",
            isUser
              ? "rounded-tr-sm bg-gradient-to-br from-emerald-600 to-emerald-700 text-white shadow-md shadow-emerald-600/15"
              : "rounded-tl-sm border border-zinc-200/80 bg-white text-zinc-800 shadow-sm dark:border-zinc-700/80 dark:bg-zinc-800/80 dark:text-zinc-200",
            message.blocked && !isUser && "border-amber-300 dark:border-amber-700"
          )}
        >
          {isEmptyStreaming ? (
            <ChatTypingIndicator />
          ) : isUser ? (
            <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">{message.content}</p>
          ) : (
            <MarkdownContent content={message.content} streaming={message.streaming} />
          )}
        </div>

        {!message.streaming && (
          <div
            className={cn(
              "mt-1 flex flex-wrap items-center gap-1.5 px-1",
              isUser ? "justify-end" : "justify-start"
            )}
          >
            <time dateTime={message.timestamp.toISOString()} className="text-[10px] text-zinc-400">
              {formatTimestamp(message.timestamp)}
            </time>
            {message.educational && !isUser && (
              <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 px-1.5 py-0.5 text-[9px] font-medium text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                <BookOpen className="h-2.5 w-2.5" aria-hidden="true" />
                Educational
              </span>
            )}
            {message.blocked && !isUser && (
              <span className="inline-flex items-center gap-0.5 text-[9px] text-amber-600 dark:text-amber-400">
                <Shield className="h-2.5 w-2.5" />
                Filtered
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
