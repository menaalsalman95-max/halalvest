"use client";

import { Shield } from "lucide-react";
import { PRIVACY_NOTICE } from "@/lib/chat/prompts";

export function ChatPrivacyNotice() {
  return (
    <div className="flex items-start gap-2 rounded-lg bg-zinc-50 px-3 py-2 dark:bg-zinc-800/50">
      <Shield className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
      <p className="text-[10px] leading-relaxed text-zinc-500 dark:text-zinc-400">
        {PRIVACY_NOTICE}
      </p>
    </div>
  );
}
