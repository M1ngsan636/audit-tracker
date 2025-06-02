"use client";

import StatsOverview from "@/components/StatsOverview"; // Adjust path if needed

export default function StatsPage() {
  // Dummy data for testing, replace with real API data later
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
