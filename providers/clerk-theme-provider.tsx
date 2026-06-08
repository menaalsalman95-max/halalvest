"use client";

import { useTheme } from "next-themes";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { halalvestClerkAppearance } from "@/lib/clerk-appearance";
import { env } from "@/lib/env";

export function ClerkThemeProvider({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();

  return (
    <ClerkProvider
      publishableKey={env.clerk.publishableKey}
      signInUrl={env.clerk.signInUrl}
      signUpUrl={env.clerk.signUpUrl}
      signInFallbackRedirectUrl={env.clerk.signInFallbackRedirectUrl}
      signUpFallbackRedirectUrl={env.clerk.signUpFallbackRedirectUrl}
      signInForceRedirectUrl={env.clerk.signInFallbackRedirectUrl}
      signUpForceRedirectUrl={env.clerk.signUpFallbackRedirectUrl}
      afterSignOutUrl={env.clerk.afterSignOutUrl}
      appearance={{
        baseTheme: resolvedTheme === "dark" ? dark : undefined,
        ...halalvestClerkAppearance,
        variables: {
          ...halalvestClerkAppearance.variables,
          ...(resolvedTheme === "dark"
            ? {
                colorText: "#fafafa",
                colorTextSecondary: "#a1a1aa",
                colorInputBackground: "rgba(24,24,27,0.8)",
                colorInputText: "#fafafa",
              }
            : {}),
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}
