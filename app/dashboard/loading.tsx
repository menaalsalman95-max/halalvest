import { DashboardSkeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="mesh-bg flex min-h-screen">
      <div className="hidden w-64 shrink-0 lg:block" />
      <div className="flex-1 overflow-auto">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <DashboardSkeleton />
        </div>
      </div>
    </div>
  );
}
