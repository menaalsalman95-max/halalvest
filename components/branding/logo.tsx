import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className, showText = true, size = "md" }: LogoProps) {
  const sizes = {
    sm: { icon: "h-7 w-7", text: "text-lg" },
    md: { icon: "h-8 w-8", text: "text-xl" },
    lg: { icon: "h-10 w-10", text: "text-2xl" },
  };

  return (
    <Link
      href="/"
      className={cn("flex items-center gap-2.5 group", className)}
      aria-label="HalalVest home"
    >
      <div
        className={cn(
          "relative flex items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-lg shadow-emerald-500/25 transition-transform group-hover:scale-105",
          sizes[size].icon
        )}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-[55%] w-[55%] text-white"
          aria-hidden="true"
        >
          <path
            d="M12 2L4 7v10l8 5 8-5V7l-8-5z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M12 8v8M9 10.5h6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-amber-400 ring-2 ring-white dark:ring-zinc-950" />
      </div>
      {showText && (
        <span className={cn("font-bold tracking-tight", sizes[size].text)}>
          <span className="text-zinc-900 dark:text-white">Halal</span>
          <span className="bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent">
            Vest
          </span>
        </span>
      )}
    </Link>
  );
}
