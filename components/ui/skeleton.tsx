import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return <div className={cn("skeleton", className)} aria-hidden="true" />;
}

export function StatCardSkeleton() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-3 w-16" />
        </div>
        <Skeleton className="h-10 w-10 rounded-xl" />
      </div>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="glass-card p-6">
      <Skeleton className="mb-4 h-5 w-40" />
      <Skeleton className="h-[200px] w-full rounded-xl" />
    </div>
  );
}

export function TableRowSkeleton() {
  return (
    <tr>
      <td className="py-3"><Skeleton className="h-4 w-12" /></td>
      <td className="py-3"><Skeleton className="h-4 w-32" /></td>
      <td className="py-3"><Skeleton className="h-4 w-16 ml-auto" /></td>
      <td className="py-3"><Skeleton className="h-6 w-16 ml-auto rounded-full" /></td>
    </tr>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-72" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <ChartSkeleton />
        <ChartSkeleton />
      </div>
    </div>
  );
}
