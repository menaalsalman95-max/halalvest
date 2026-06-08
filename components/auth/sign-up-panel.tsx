"use client";

import { SignUp } from "@clerk/nextjs";
import { env } from "@/lib/env";

export function SignUpPanel() {
  return (
    <SignUp
      routing="path"
      path={env.clerk.signUpUrl}
      signInUrl={env.clerk.signInUrl}
      fallbackRedirectUrl={env.clerk.signUpFallbackRedirectUrl}
      forceRedirectUrl={env.clerk.signUpFallbackRedirectUrl}
    />
  );
}
