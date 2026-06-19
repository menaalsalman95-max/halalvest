import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/branding/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function SignupPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Logo className="justify-center" size="lg" />
          <h1 className="mt-6 text-2xl font-bold text-zinc-900 dark:text-white">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            Start investing halal — free forever
          </p>
        </div>

        <form className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Full Name
            </label>
            <Input id="name" type="text" placeholder="Your name" />
          </div>
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Email
            </label>
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>
          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Password
            </label>
            <Input id="password" type="password" placeholder="••••••••" />
          </div>
          <Button variant="primary" className="w-full" type="submit">
            Create Account
          </Button>
        </form>

        <p className="mt-4 text-center text-xs text-zinc-400">
          By signing up, you agree to our Terms of Service and Privacy Policy.
        </p>

        <p className="mt-4 text-center text-sm text-zinc-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-400"
          >
            Log in
          </Link>
        </p>
      </Card>
    </div>
  );
}
