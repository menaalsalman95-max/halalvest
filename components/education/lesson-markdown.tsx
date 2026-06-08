"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import { cn } from "@/lib/utils";

interface LessonMarkdownProps {
  content: string;
  className?: string;
}

export function LessonMarkdown({ content, className }: LessonMarkdownProps) {
  return (
    <div className={cn("prose-halalvest", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSanitize]}
        components={{
          h2: ({ children }) => (
            <h2 className="mb-3 mt-8 border-b border-emerald-500/10 pb-2 text-xl font-bold text-zinc-900 first:mt-0 dark:text-white">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mb-2 mt-6 text-base font-semibold text-zinc-900 dark:text-white">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="my-3 leading-relaxed text-zinc-700 dark:text-zinc-300">{children}</p>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-emerald-700 dark:text-emerald-400">
              {children}
            </strong>
          ),
          ul: ({ children }) => (
            <ul className="my-3 list-disc space-y-2 pl-5 text-zinc-700 dark:text-zinc-300">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="my-3 list-decimal space-y-2 pl-5 text-zinc-700 dark:text-zinc-300">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="my-4 rounded-xl border border-emerald-500/20 bg-emerald-50/50 px-4 py-3 text-sm text-zinc-700 dark:bg-emerald-950/20 dark:text-zinc-300">
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <div className="my-4 overflow-x-auto rounded-xl border border-zinc-200/80 dark:border-zinc-800/80">
              <table className="w-full min-w-[320px] text-sm">{children}</table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-zinc-50/80 dark:bg-zinc-900/50">{children}</thead>
          ),
          th: ({ children }) => (
            <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border-t border-zinc-200/60 px-4 py-2.5 text-zinc-700 dark:border-zinc-800/60 dark:text-zinc-300">
              {children}
            </td>
          ),
          code: ({ children }) => (
            <code className="rounded bg-zinc-200/80 px-1.5 py-0.5 text-xs dark:bg-zinc-800">
              {children}
            </code>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
