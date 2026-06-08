"use client";

import Link from "next/link";
import { useAuth, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { halalvestUserButtonAppearance } from "@/lib/clerk-appearance";
import { cn } from "@/lib/utils";

interface AuthNavProps {
  mobile?: boolean;
}

export function AuthNav({ mobile }: AuthNavProps) {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <div className={cn("flex items-center gap-2", mobile && "w-full")}>
        <Skeleton className={cn("h-9 rounded-xl", mobile ? "w-full" : "w-20")} />
        {!mobile && <Skeleton className="h-9 w-24 rounded-xl" />}
      </div>
    );
  }

  if (isSignedIn) {
    return (
      <UserButton appearance={halalvestUserButtonAppearance} />
    );
  }

  return (
    <div className={cn("flex items-center gap-2", mobile && "w-full flex-col")}>
      <Link href="/sign-in" className={cn(mobile && "w-full")}>
        <Button variant={mobile ? "outline" : "ghost"} size="sm" className={cn(mobile && "w-full")}>
          Log in
        </Button>
      </Link>
      <Link href="/sign-up" className={cn(mobile && "w-full")}>
        <Button variant="primary" size="sm" className={cn(mobile && "w-full")}>
          Get Started
        </Button>
      </Link>
    </div>
  );
}
