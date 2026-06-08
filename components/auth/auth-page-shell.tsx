import type { ReactNode } from "react";
import Link from "next/link";
import { Suspense } from "react";
import { Logo } from "@/components/branding/logo";
import { AuthFormLoading } from "@/components/auth/auth-loading";

interface AuthPageShellProps {
  title: string;
  description: string;
  footer: ReactNode;
  children: ReactNode;
}

export function AuthPageShell({ title, description, footer, children }: AuthPageShellProps) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-16">
      <div className="glass-card w-full max-w-md p-8 glow">
        <div className="mb-6 text-center">
          <Logo className="justify-center" size="lg" />
          <h1 className="mt-8 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
            {title}
          </h1>
          <p className="mt-2 text-sm text-zinc-500">{description}</p>
        </div>

        <Suspense fallback={<AuthFormLoading />}>{children}</Suspense>

        {footer}
      </div>
    </div>
  );
}

export function LoginFooter() {
  return (
    <p className="mt-8 text-center text-sm text-zinc-500">
      Don&apos;t have an account?{" "}
      <Link
        href="/sign-up"
        className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400"
      >
        Sign up free
      </Link>
    </p>
  );
}

export function SignupFooter() {
  return (
    <>
      <p className="mt-4 text-center text-xs text-zinc-400">
        By signing up, you agree to our Terms of Service and Privacy Policy.
      </p>
      <p className="mt-4 text-center text-sm text-zinc-500">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400"
        >
          Log in
        </Link>
      </p>
    </>
  );
}
