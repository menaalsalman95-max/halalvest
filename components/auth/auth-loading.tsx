import { Skeleton } from "@/components/ui/skeleton";

export function AuthFormLoading() {
  return (
    <div className="space-y-4" aria-busy="true" aria-label="Loading authentication form">
      <Skeleton className="h-11 w-full rounded-xl" />
      <Skeleton className="h-11 w-full rounded-xl" />
      <Skeleton className="h-12 w-full rounded-xl" />
      <Skeleton className="mx-auto h-4 w-48 rounded-lg" />
    </div>
  );
}
