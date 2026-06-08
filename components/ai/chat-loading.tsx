"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface ChatLoadingProps {
  label?: string;
}

export function ChatLoading({ label = "Analyzing your question..." }: ChatLoadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3 rounded-xl border border-emerald-200/50 bg-emerald-50/50 px-4 py-3 dark:border-emerald-800/50 dark:bg-emerald-950/20"
    >
      <div className="relative flex h-8 w-8 items-center justify-center">
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-emerald-500/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        <Sparkles className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
      </div>
      <div>
        <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{label}</p>
        <div className="mt-1 flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-1 w-1 rounded-full bg-emerald-500"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function ChatTypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-1 py-2" aria-label="AI is typing">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-2 w-2 rounded-full bg-emerald-500/60"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}
