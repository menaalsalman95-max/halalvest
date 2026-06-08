"use client";

import { SignIn } from "@clerk/nextjs";
import { env } from "@/lib/env";

export function SignInPanel() {
  return (
    <SignIn
      routing="path"
      path={env.clerk.signInUrl}
      signUpUrl={env.clerk.signUpUrl}
      fallbackRedirectUrl={env.clerk.signInFallbackRedirectUrl}
      forceRedirectUrl={env.clerk.signInFallbackRedirectUrl}
    />
  );
}
