"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Search, Shield, Sparkles, TrendingUp, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "5,000+", label: "Stocks Screened" },
  { value: "98%", label: "Accuracy Rate" },
  { value: "50K+", label: "Muslim Investors" },
];

const features = [
  {
    icon: Search,
    title: "Halal Stock Checker",
    description: "Instant Shariah compliance analysis with debt ratio, sector, and business activity screening.",
    href: "/checker",
    gradient: "from-emerald-500/20 to-teal-500/10",
  },
  {
    icon: Shield,
    title: "Shariah Screener",
    description: "Filter thousands of US stocks by AAOIFI standards to build a compliant portfolio.",
    href: "/screener",
    gradient: "from-blue-500/20 to-indigo-500/10",
  },
  {
    icon: Sparkles,
    title: "AI Advisor",
    description: "Premium Islamic fintech assistant for halal investing education and stock explanations.",
    href: "#",
    gradient: "from-amber-500/20 to-orange-500/10",
  },
  {
    icon: TrendingUp,
    title: "Portfolio Dashboard",
    description: "Track performance, compliance status, and allocation with real-time fintech charts.",
    href: "/dashboard",
    gradient: "from-violet-500/20 to-purple-500/10",
  },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 sm:pt-12 sm:pb-24">
      {/* Ambient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute -right-32 top-1/4 h-80 w-80 rounded-full bg-amber-500/8 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-64 w-[600px] -translate-x-1/2 rounded-full bg-emerald-600/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5 text-sm font-medium text-emerald-700 backdrop-blur-sm dark:text-emerald-400"
          >
            <Sparkles className="h-3.5 w-3.5" />
            AI-Powered Shariah Compliance
            <span className="ml-1 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
              New
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl lg:text-7xl dark:text-white"
          >
            Invest Halal.{" "}
            <span className="text-gradient">Grow Wealth.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-600 sm:text-xl dark:text-zinc-400"
          >
            The premium platform for Shariah-compliant investing in the United States.
            Screen stocks, manage portfolios, and learn Islamic finance — built for the modern Muslim investor.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link href="/checker">
              <Button variant="primary" size="lg" className="min-w-[180px]">
                <Search className="h-4 w-4" />
                Check a Stock
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button variant="outline" size="lg" className="min-w-[180px]">
                Create Free Account
              </Button>
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-zinc-500"
          >
            {["AAOIFI Standards", "SEC-Registered Stocks", "Bank-Grade Security"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                {t}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mx-auto mt-20 grid max-w-3xl grid-cols-3 gap-4 sm:gap-8"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="glass-card group px-4 py-6 text-center transition-all hover:border-emerald-500/30 sm:px-6"
            >
              <p className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-zinc-500 sm:text-sm dark:text-zinc-400">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Product preview mockup */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="relative mx-auto mt-16 max-w-4xl"
        >
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-emerald-500/20 via-transparent to-amber-500/10 blur-2xl" />
          <div className="glass-card relative overflow-hidden border-gradient p-1 animate-float">
            <div className="rounded-[calc(var(--radius)-2px)] bg-zinc-950 p-4 sm:p-6">
              <div className="mb-4 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-xs text-zinc-500">halalvest.com/checker</span>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { ticker: "TSLA", score: 95, status: "Halal", color: "text-emerald-400" },
                  { ticker: "AAPL", score: 72, status: "Questionable", color: "text-amber-400" },
                  { ticker: "JPM", score: 15, status: "Haram", color: "text-red-400" },
                ].map((s) => (
                  <div key={s.ticker} className="rounded-xl bg-zinc-900/80 p-4 ring-1 ring-zinc-800">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">{s.ticker}</span>
                      <span className={`text-xs font-medium ${s.color}`}>{s.status}</span>
                    </div>
                    <p className="mt-2 text-2xl font-bold text-white">{s.score}</p>
                    <p className="text-[10px] text-zinc-500">Compliance Score</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function Features() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
            Platform
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
            Everything you need to invest halal
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Built for Muslim investors who demand clarity, compliance, and confidence.
          </p>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={feature.href}
                className="group flex h-full flex-col rounded-2xl border border-zinc-200/80 bg-white/60 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/5 dark:border-zinc-800/80 dark:bg-zinc-900/60"
              >
                <div className={`mb-5 inline-flex w-fit rounded-xl bg-gradient-to-br ${feature.gradient} p-3 ring-1 ring-inset ring-white/10`}>
                  <feature.icon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">{feature.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                  {feature.description}
                </p>
                <span className="mt-5 inline-flex items-center text-sm font-medium text-emerald-600 opacity-0 transition-all group-hover:opacity-100 dark:text-emerald-400">
                  Explore
                  <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CTA() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-900 px-8 py-16 text-center shadow-2xl shadow-emerald-900/30 sm:px-16 sm:py-20">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNGgydi0yaC0ydjJ6bTAtNGgydi0yaC0ydjJ6bTAtNGgydi0yaC0ydjJ6bTAtNGg2djJoLTZ6bTAtNGg2di0yaC02em0wLTRoNnYtMmgtNnYyem0wLTRoNnYtMmgtNnYyem0wLTRoNnYtMmgtNnYyem0wLTRoNnYtMmgtNnYyem00LTRoNnYtMmgtNnYyem00LTRoNnYtMmgtNnYyem00LTRoNnYtMmgtNnYyem00LTRoNnYtMmgtNnYyem00LTRoNnYtMmgtNnYyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-amber-400/10 blur-3xl" />

          <h2 className="relative text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Start your halal investing journey
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-lg text-emerald-100/90">
            Join thousands of Muslim investors building wealth the halal way. Free to start.
          </p>
          <div className="relative mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/sign-up">
              <Button variant="gold" size="lg">
                Get Started Free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/checker">
              <Button variant="glass" size="lg" className="border-white/20 text-white hover:bg-white/10">
                Try Stock Checker
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
