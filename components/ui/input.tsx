import { cn } from "@/lib/utils";
import { forwardRef, type InputHTMLAttributes } from "react";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "flex h-11 w-full rounded-xl border border-zinc-200/80 bg-white/80 px-4 py-2 text-sm text-zinc-900",
          "placeholder:text-zinc-400 backdrop-blur-sm transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 focus-visible:border-emerald-500/50",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "dark:border-zinc-700/80 dark:bg-zinc-900/80 dark:text-zinc-100 dark:placeholder:text-zinc-500",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
