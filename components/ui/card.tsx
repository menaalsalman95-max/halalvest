import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  glass?: boolean;
  glow?: boolean;
}

export function Card({ className, hover, glass, glow, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl p-6",
        glass
          ? "glass-card"
          : "border border-zinc-200/80 bg-white shadow-sm dark:border-zinc-800/80 dark:bg-zinc-900/80",
        hover &&
          "transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5",
        glow && "shadow-[var(--shadow-glow)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mb-5", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("mt-1 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400", className)}
      {...props}
    >
      {children}
    </p>
  );
}
