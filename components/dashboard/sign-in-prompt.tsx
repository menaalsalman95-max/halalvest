import Link from "next/link";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SignInPromptProps {
  title?: string;
  description?: string;
}

export function SignInPrompt({
  title = "Sign in to continue",
  description = "Create a free account or sign in to access your portfolio simulator.",
}: SignInPromptProps) {
  return (
    <div className="glass-card border-emerald-500/15 py-12 text-center">
      <div className="mx-auto mb-4 inline-flex rounded-2xl bg-emerald-500/10 p-3 ring-1 ring-emerald-500/20">
        <Lock className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
      </div>
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">{title}</h2>
      <p className="mx-auto mt-2 max-w-sm text-sm text-zinc-600 dark:text-zinc-400">
        {description}
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Link href="/sign-in">
          <Button variant="primary" size="sm">
            Sign in
          </Button>
        </Link>
        <Link href="/sign-up">
          <Button variant="outline" size="sm">
            Create account
          </Button>
        </Link>
      </div>
    </div>
  );
}
