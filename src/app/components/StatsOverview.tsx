import StatCard from "./StatCard"; // Adjust the path if needed

const StatsOverview = ({ stats }) => (
  <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 backdrop-blur-sm bg-opacity-50 shadow-2xl">
    <h3 className="text-xl font-semibold text-white mb-6">AUDIT STATS</h3>
    <div className="space-y-4">
      <StatCard label="Completed" value={stats.completed} color="bg-green-500" />
      <StatCard label="Pending" value={stats.pending} color="bg-yellow-500" />
      <StatCard label="Overdue" value={stats.overdue} color="bg-red-500" />
    </div>
  </div>
);

export default StatsOverview;
