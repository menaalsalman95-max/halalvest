import { Search } from "lucide-react";

export function ComingSoonPage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
      <div className="glass-card glow mx-auto max-w-md p-10">
        <div className="mx-auto mb-6 inline-flex rounded-2xl bg-emerald-500/10 p-4 ring-1 ring-emerald-500/20">
          <Search className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
          {title}
        </h1>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400">{description}</p>
        <p className="mt-6 text-xs font-medium uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
          Coming Soon
        </p>
      </div>
    </div>
  );
}
