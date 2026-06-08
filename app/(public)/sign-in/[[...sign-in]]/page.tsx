import type { Metadata } from "next";
import { AuthPageShell, LoginFooter } from "@/components/auth/auth-page-shell";
import { SignInPanel } from "@/components/auth/sign-in-panel";

export const metadata: Metadata = {
  title: "Log In",
};

export default function SignInPage() {
  return (
    <AuthPageShell
      title="Welcome back"
      description="Sign in to your HalalVest account"
      footer={<LoginFooter />}
    >
      <SignInPanel />
    </AuthPageShell>
  );
}
