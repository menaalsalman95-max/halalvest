import type { Metadata } from "next";
import { AuthPageShell, SignupFooter } from "@/components/auth/auth-page-shell";
import { SignUpPanel } from "@/components/auth/sign-up-panel";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function SignUpPage() {
  return (
    <AuthPageShell
      title="Create your account"
      description="Start investing halal — free forever"
      footer={<SignupFooter />}
    >
      <SignUpPanel />
    </AuthPageShell>
  );
}
