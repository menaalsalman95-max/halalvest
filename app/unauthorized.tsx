import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UnauthorizedPage() {
  return (
    <div className="mesh-bg flex min-h-screen items-center justify-center px-4">
      <div className="glass-card max-w-md border-emerald-500/15 p-8 text-center">
        <div className="mx-auto mb-4 inline-flex rounded-2xl bg-amber-500/10 p-3 ring-1 ring-amber-500/20">
          <ShieldAlert className="h-7 w-7 text-amber-500" />
        </div>
        <h1 className="text-xl font-bold text-zinc-900 dark:text-white">Sign in required</h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          You need an account to access this page.
        </p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Link href="/sign-in">
            <Button variant="primary" className="w-full sm:w-auto">
              Sign in
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="w-full sm:w-auto">
              Go home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
