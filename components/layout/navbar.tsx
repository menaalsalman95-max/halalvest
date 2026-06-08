"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/branding/logo";
import { Button } from "@/components/ui/button";
import { AuthNav } from "@/components/auth/auth-nav";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/checker", label: "Stock Checker" },
  { href: "/screener", label: "Screener" },
  { href: "/education", label: "Education" },
  { href: "/zakat", label: "Zakat Calculator" },
  { href: "/dashboard", label: "Dashboard" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="glass border-b border-zinc-200/50 dark:border-zinc-800/50">
        <nav
          className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
          aria-label="Main navigation"
        >
          <Logo />

          <div className="hidden items-center gap-0.5 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "text-emerald-700 dark:text-emerald-400"
                    : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                )}
              >
                {pathname === link.href && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-lg bg-emerald-500/10 ring-1 ring-emerald-500/20"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <ThemeToggle />
            <AuthNav />
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass overflow-hidden border-b border-zinc-200/50 md:hidden dark:border-zinc-800/50"
          >
            <div className="px-4 py-4">
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                      pathname === link.href
                        ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                        : "text-zinc-600 hover:bg-zinc-100/80 dark:text-zinc-400 dark:hover:bg-zinc-800/80"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div
                className="mt-4 flex flex-col gap-2 border-t border-zinc-200/80 pt-4 dark:border-zinc-800/80"
                onClick={() => setMobileOpen(false)}
              >
                <AuthNav mobile />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
