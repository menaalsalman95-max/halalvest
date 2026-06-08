"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import { cn } from "@/lib/utils";

interface MarkdownContentProps {
  content: string;
  className?: string;
  streaming?: boolean;
}

/**
 * Safely renders AI markdown responses.
 * rehype-sanitize strips dangerous HTML/scripts — XSS protection layer.
 */
export function MarkdownContent({ content, className, streaming }: MarkdownContentProps) {
  return (
    <div className={cn("text-sm leading-relaxed", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSanitize]}
        components={{
          h3: ({ children }) => (
            <h3 className="mb-1.5 mt-3 text-sm font-semibold text-zinc-900 first:mt-0 dark:text-white">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="my-1.5 leading-relaxed text-zinc-700 dark:text-zinc-300">{children}</p>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-emerald-700 dark:text-emerald-400">{children}</strong>
          ),
          ul: ({ children }) => (
            <ul className="my-2 list-disc space-y-1 pl-4 text-zinc-700 dark:text-zinc-300">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="my-2 list-decimal space-y-1 pl-4 text-zinc-700 dark:text-zinc-300">{children}</ol>
          ),
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="my-2 border-l-2 border-emerald-500 bg-emerald-50/50 py-1 pl-3 text-xs text-zinc-600 dark:bg-emerald-950/20 dark:text-zinc-400">
              {children}
            </blockquote>
          ),
          code: ({ children }) => (
            <code className="rounded bg-zinc-200 px-1 py-0.5 text-xs dark:bg-zinc-700">{children}</code>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
      {streaming && (
        <span
          className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-emerald-500 align-middle"
          aria-hidden="true"
        />
      )}
    </div>
  );
}
