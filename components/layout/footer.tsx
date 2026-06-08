import Link from "next/link";
import { Logo } from "@/components/branding/logo";

const footerLinks = {
  Product: [
    { href: "/checker", label: "Stock Checker" },
    { href: "/screener", label: "Halal Screener" },
    { href: "/dashboard", label: "Portfolio" },
    { href: "/zakat", label: "Zakat Calculator" },
  ],
  Learn: [
    { href: "/education", label: "Education Center" },
    { href: "/education/riba", label: "Understanding Riba" },
    { href: "/education/screening", label: "Screening Methods" },
  ],
  Company: [
    { href: "/about", label: "About Us" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ],
};

export function Footer() {
  return (
    <footer className="relative border-t border-zinc-200/80 bg-zinc-50/80 backdrop-blur-sm dark:border-zinc-800/80 dark:bg-zinc-950/80">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo size="lg" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              Premium AI-powered halal investing for Muslims in the United States.
              Invest with confidence, aligned with Shariah principles.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-900 dark:text-zinc-100">
                {category}
              </h3>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-500 transition-colors hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-zinc-200/80 pt-8 dark:border-zinc-800/80 sm:flex-row">
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            © {new Date().getFullYear()} HalalVest. All rights reserved.
          </p>
          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            Not financial advice. For educational purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
}
