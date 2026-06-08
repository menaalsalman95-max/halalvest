"use client";

import { DashboardSidebar, DashboardHeader } from "@/components/dashboard/sidebar";
import { DashboardSkeleton } from "@/components/ui/skeleton";

interface DashboardShellProps {
  title: string;
  description?: string;
  loading?: boolean;
  children: React.ReactNode;
}

export function DashboardShell({
  title,
  description,
  loading,
  children,
}: DashboardShellProps) {
  return (
    <div className="mesh-bg flex min-h-screen">
      <DashboardSidebar />
      <div className="flex-1 overflow-auto">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <DashboardHeader title={title} description={description} />
          {loading ? <DashboardSkeleton /> : children}
        </div>
      </div>
    </div>
  );
}
