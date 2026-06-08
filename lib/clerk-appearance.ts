/** HalalVest emerald fintech styling for Clerk components */
export const halalvestClerkAppearance = {
  variables: {
    colorPrimary: "#059669",
    colorSuccess: "#10b981",
    colorDanger: "#ef4444",
    colorWarning: "#f59e0b",
    colorText: "#18181b",
    colorTextSecondary: "#71717a",
    colorBackground: "transparent",
    colorInputBackground: "rgba(255,255,255,0.8)",
    colorInputText: "#18181b",
    borderRadius: "0.75rem",
    fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
  },
  elements: {
    rootBox: "w-full",
    cardBox: "w-full shadow-none",
    card: "bg-transparent shadow-none p-0 gap-4",
    header: "hidden",
    headerTitle: "hidden",
    headerSubtitle: "hidden",
    socialButtonsBlockButton:
      "border border-zinc-200/80 bg-white/60 backdrop-blur-sm hover:bg-emerald-500/5 dark:border-zinc-700/80 dark:bg-zinc-900/60",
    socialButtonsBlockButtonText: "font-medium text-zinc-700 dark:text-zinc-300",
    dividerLine: "bg-zinc-200 dark:bg-zinc-700",
    dividerText: "text-zinc-400 text-xs",
    formFieldLabel: "text-sm font-medium text-zinc-700 dark:text-zinc-300",
    formFieldInput:
      "rounded-xl border-zinc-200/80 bg-white/80 shadow-inner dark:border-zinc-700/80 dark:bg-zinc-900/80",
    formButtonPrimary:
      "rounded-xl bg-emerald-600 text-white shadow-md hover:bg-emerald-700 transition-colors",
    footerActionLink:
      "text-emerald-600 hover:text-emerald-700 font-semibold dark:text-emerald-400 dark:hover:text-emerald-300",
    footerActionText: "text-zinc-500 text-sm",
    identityPreviewEditButton: "text-emerald-600 dark:text-emerald-400",
    formFieldInputShowPasswordButton: "text-zinc-500 hover:text-zinc-700",
    alertText: "text-sm",
    formFieldErrorText: "text-red-500 text-xs",
    footer: "hidden",
  },
};

export const halalvestUserButtonAppearance = {
  elements: {
    userButtonAvatarBox: "h-9 w-9 ring-2 ring-emerald-500/20",
    userButtonPopoverCard:
      "glass-card border border-zinc-200/80 dark:border-zinc-700/80 shadow-[var(--shadow-elevated)]",
    userButtonPopoverActionButton:
      "text-zinc-700 hover:bg-emerald-500/10 dark:text-zinc-300",
    userButtonPopoverActionButtonText: "text-sm font-medium",
    userButtonPopoverFooter: "hidden",
  },
};
