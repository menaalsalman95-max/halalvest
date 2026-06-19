import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
import { AIChatbot } from "@/components/ai/ai-chatbot";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "HalalVest — Premium Halal Investing Platform",
    template: "%s | HalalVest",
  },
  description:
    "AI-powered Shariah-compliant investing platform for Muslims in the United States. Screen stocks, manage portfolios, and learn Islamic finance.",
  keywords: [
    "halal investing",
    "Islamic finance",
    "Shariah compliant stocks",
    "halal stock checker",
    "Muslim investing",
    "zakat calculator",
  ],
  openGraph: {
    title: "HalalVest — Premium Halal Investing Platform",
    description:
      "Invest halal. Grow wealth. AI-powered Shariah compliance for US stocks.",
    type: "website",
    locale: "en_US",
    siteName: "HalalVest",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <AIChatbot />
        </ThemeProvider>
      </body>
    </html>
  );
}
