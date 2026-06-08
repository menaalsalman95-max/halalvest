const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? "";
const clerkSecretKey = process.env.CLERK_SECRET_KEY ?? "";

/** Client-safe environment values */
export const env = {
  clerk: {
    publishableKey: clerkPublishableKey,
    signInUrl: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL ?? "/sign-in",
    signUpUrl: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL ?? "/sign-up",
    signInFallbackRedirectUrl:
      process.env.NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL ?? "/dashboard",
    signUpFallbackRedirectUrl:
      process.env.NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL ?? "/dashboard",
    afterSignOutUrl: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_OUT_URL ?? "/",
  },
} as const;

/** Server-only environment values (import from server modules) */
export const serverEnv = {
  openaiApiKey: process.env.OPENAI_API_KEY ?? "",
  openaiModel: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
  rateLimitPerMinute: Number(process.env.RATE_LIMIT_PER_MINUTE ?? 10),
  rateLimitPerSessionHour: Number(process.env.RATE_LIMIT_PER_SESSION_HOUR ?? 50),
  clerkSecretKey,
} as const;

export function isOpenAIConfigured(): boolean {
  return serverEnv.openaiApiKey.length > 0;
}

export function validateServerEnv(): { valid: boolean; missing: string[] } {
  const missing: string[] = [];
  if (!serverEnv.openaiApiKey) missing.push("OPENAI_API_KEY");
  return { valid: missing.length === 0, missing };
}

export function assertClerkEnv(): void {
  if (!clerkPublishableKey || !clerkSecretKey) {
    throw new Error(
      "Missing Clerk keys. Set NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY in .env.local"
    );
  }
}
