"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SignUpPanel() {
  return (
    <div className="space-y-4 text-center">
      <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        Start exploring halal investing with a free virtual portfolio and full access to the
        stock screener and education center.
      </p>
      <Link href="/dashboard">
        <Button variant="primary" className="w-full gap-2">
          Get Started
          <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
}
