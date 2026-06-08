import { cn } from "@/lib/utils";
import { forwardRef, type ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gold" | "glass";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:pointer-events-none disabled:opacity-50",
          "active:scale-[0.98]",
          {
            "bg-gradient-brand text-white shadow-lg shadow-emerald-600/25 hover:shadow-xl hover:shadow-emerald-600/30 hover:brightness-110":
              variant === "primary",
            "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700":
              variant === "secondary",
            "border border-zinc-200/80 bg-white/50 backdrop-blur-sm hover:border-emerald-500/30 hover:bg-emerald-50/50 dark:border-zinc-700/80 dark:bg-zinc-900/50 dark:hover:bg-emerald-950/20":
              variant === "outline",
            "bg-transparent hover:bg-zinc-100/80 dark:hover:bg-zinc-800/80":
              variant === "ghost",
            "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/25 hover:shadow-xl hover:brightness-110":
              variant === "gold",
            "glass text-zinc-900 hover:bg-white/90 dark:text-zinc-100 dark:hover:bg-zinc-900/90":
              variant === "glass",
          },
          {
            "h-8 px-3.5 text-xs": size === "sm",
            "h-10 px-5 text-sm": size === "md",
            "h-12 px-7 text-base": size === "lg",
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
