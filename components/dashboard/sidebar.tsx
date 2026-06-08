"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Search,
  Filter,
  BookOpen,
  Calculator,
  Settings,
  LogOut,
  ChevronLeft,
  Menu,
  Wallet,
  Eye,
  History,
} from "lucide-react";
import { useState } from "react";
import { SignOutButton } from "@clerk/nextjs";
import { Logo } from "@/components/branding/logo";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/portfolio", label: "Portfolio", icon: Wallet },
  { href: "/dashboard/watchlist", label: "Watchlist", icon: Eye },
  { href: "/dashboard/transactions", label: "History", icon: History },
  { href: "/checker", label: "Stock Checker", icon: Search },
  { href: "/screener", label: "Screener", icon: Filter },
  { href: "/zakat", label: "Zakat Calculator", icon: Calculator },
  { href: "/education", label: "Education", icon: BookOpen },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarContent = (
    <>
      <div className="flex h-16 items-center justify-between border-b border-zinc-200/80 px-4 dark:border-zinc-800/80">
        {!collapsed && <Logo size="sm" />}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-zinc-100/80 hover:text-zinc-600 lg:block dark:hover:bg-zinc-800/80"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronLeft
            className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")}
          />
        </button>
      </div>

      <nav className="flex-1 space-y-1 p-3" aria-label="Dashboard navigation">
        {sidebarLinks.map((link) => {
          const isActive =
            pathname === link.href ||
            (link.href !== "/dashboard" && pathname.startsWith(link.href));
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-emerald-500/10 text-emerald-700 shadow-sm ring-1 ring-emerald-500/20 dark:text-emerald-400"
                  : "text-zinc-600 hover:bg-zinc-100/80 dark:text-zinc-400 dark:hover:bg-zinc-800/60",
                collapsed && "justify-center px-2"
              )}
              title={collapsed ? link.label : undefined}
            >
              <link.icon className="h-4 w-4 shrink-0" />
              {!collapsed && link.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-zinc-200/80 p-3 dark:border-zinc-800/80">
        <SignOutButton redirectUrl="/">
          <button
            type="button"
            className={cn(
              "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100/80 dark:text-zinc-400 dark:hover:bg-zinc-800/60",
              collapsed && "justify-center px-2"
            )}
          >
            <LogOut className="h-4 w-4 shrink-0" />
            {!collapsed && "Sign Out"}
          </button>
        </SignOutButton>
      </div>
    </>
  );

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-40 rounded-xl glass p-2.5 shadow-sm lg:hidden"
        aria-label="Open sidebar"
      >
        <Menu className="h-5 w-5" />
      </button>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col glass border-r transition-transform duration-300 lg:static lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          collapsed && "lg:w-[4.5rem]"
        )}
      >
        {sidebarContent}
      </aside>
    </>
  );
}

export function DashboardHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-8 lg:mb-10">
      <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
        {title}
      </h1>
      {description && (
        <p className="mt-2 text-sm text-zinc-500 sm:text-base dark:text-zinc-400">
          {description}
        </p>
      )}
    </div>
  );
}
