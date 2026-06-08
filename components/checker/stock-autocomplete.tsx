"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Search, TrendingUp, Loader2, Command } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ComplianceBadge } from "@/components/ui/badge";
import { useStockSearch } from "@/hooks/use-stock-api";
import type { StockSearchResult } from "@/types/stock";
import { cn } from "@/lib/utils";

interface StockAutocompleteProps {
  onSelect: (ticker: string) => void;
  onSearch: (query: string) => void;
  onQueryChange?: (query: string) => void;
  loading?: boolean;
}

export function StockAutocomplete({
  onSelect,
  onSearch,
  onQueryChange,
  loading,
}: StockAutocompleteProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<StockSearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { search } = useStockSearch();

  const fetchSuggestions = useCallback(
    async (value: string) => {
      const trimmed = value.trim();
      if (trimmed.length < 1) {
        setSuggestions([]);
        setOpen(false);
        return;
      }

      setSearching(true);
      try {
        const { results } = await search(trimmed, 8);
        setSuggestions(results);
        setOpen(results.length > 0);
        setActiveIndex(-1);
      } catch {
        setSuggestions([]);
        setOpen(false);
      } finally {
        setSearching(false);
      }
    },
    [search]
  );

  const updateSuggestions = useCallback(
    (value: string) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => fetchSuggestions(value), 200);
    },
    [fetchSuggestions]
  );

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const handleSelect = (result: StockSearchResult) => {
    setQuery(result.ticker);
    setOpen(false);
    onSelect(result.ticker);
  };

  const handleSubmit = () => {
    if (activeIndex >= 0 && suggestions[activeIndex]) {
      handleSelect(suggestions[activeIndex]);
      return;
    }
    setOpen(false);
    onSearch(query);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open || suggestions.length === 0) {
      if (e.key === "Enter") handleSubmit();
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i < suggestions.length - 1 ? i + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i > 0 ? i - 1 : suggestions.length - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0) handleSelect(suggestions[activeIndex]);
      else handleSubmit();
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-emerald-500/70" />
        {(searching || loading) && (
          <Loader2 className="absolute right-14 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-emerald-500" />
        )}
        <Input
          placeholder="Search ticker, company, or sector…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onQueryChange?.(e.target.value);
            updateSuggestions(e.target.value);
          }}
          onFocus={() => query.trim() && fetchSuggestions(query)}
          onKeyDown={handleKeyDown}
          className="h-14 border-emerald-500/15 bg-white/80 pl-12 pr-24 text-base shadow-inner dark:bg-zinc-900/80"
          aria-label="Search stocks"
          aria-autocomplete="list"
          aria-expanded={open}
          role="combobox"
        />
        <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 items-center gap-1 rounded-lg border border-zinc-200/80 bg-zinc-100/80 px-2 py-1 text-[10px] font-medium text-zinc-400 sm:flex dark:border-zinc-700 dark:bg-zinc-800/80">
          <Command className="h-3 w-3" />↵
        </kbd>
      </div>

      {open && suggestions.length > 0 && (
        <ul
          className="glass absolute z-30 mt-2 max-h-80 w-full overflow-auto rounded-2xl shadow-[var(--shadow-elevated)]"
          role="listbox"
        >
          <li className="border-b border-zinc-200/60 px-4 py-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:border-zinc-800">
            Suggestions
          </li>
          {suggestions.map((result, index) => (
            <li key={result.ticker} role="option" aria-selected={index === activeIndex}>
              <button
                type="button"
                onClick={() => handleSelect(result)}
                className={cn(
                  "flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left transition-colors",
                  index === activeIndex
                    ? "bg-emerald-500/10"
                    : "hover:bg-zinc-50/80 dark:hover:bg-zinc-800/50"
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/15 to-emerald-600/5 text-xs font-bold text-emerald-700 ring-1 ring-emerald-500/20 dark:text-emerald-400">
                    {result.ticker.slice(0, 2)}
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-zinc-900 dark:text-white">
                        {result.ticker}
                      </span>
                      <ComplianceBadge status={result.status} className="text-[9px] px-1.5 py-0" />
                    </div>
                    <p className="text-xs text-zinc-500">
                      {result.name} · {result.sector}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-0.5">
                  <span className="flex items-center gap-1 text-sm font-bold text-emerald-600 dark:text-emerald-400">
                    <TrendingUp className="h-3 w-3" />
                    {result.score}
                  </span>
                  <span className="text-[10px] text-zinc-400">score</span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
