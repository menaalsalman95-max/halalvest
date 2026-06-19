"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AuthNavProps {
  mobile?: boolean;
}

export function AuthNav({ mobile }: AuthNavProps) {
  return (
    <div className={cn("flex items-center gap-2", mobile && "w-full flex-col")}>
      <Link href="/dashboard" className={cn(mobile && "w-full")}>
        <Button variant={mobile ? "outline" : "ghost"} size="sm" className={cn(mobile && "w-full")}>
          Dashboard
        </Button>
      </Link>
      <Link href="/screener" className={cn(mobile && "w-full")}>
        <Button variant="primary" size="sm" className={cn(mobile && "w-full")}>
          Screener
        </Button>
      </Link>
    </div>
  );
}
