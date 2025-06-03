"use client";

import StatsOverview from "@/components/StatsOverview";
export default function StatsPage() {
  const stats = {
    completed: 23,
    pending: 12,
    overdue: 5,
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-6">
      <StatsOverview stats={stats} />
    </div>
  );
}
