"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SignInPanel() {
  return (
    <div className="space-y-4 text-center">
      <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        HalalVest is open access — no account required. Go straight to your portfolio simulator
        and Shariah screening tools.
      </p>
      <Link href="/dashboard">
        <Button variant="primary" className="w-full gap-2">
          Open Dashboard
          <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
}
