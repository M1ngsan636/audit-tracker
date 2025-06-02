const StatCard = ({ label, value, color }) => (
  <div className="flex items-center justify-between p-4 rounded-lg bg-gray-900 shadow">
    <span className="text-gray-300">{label}</span>
    <span className={`text-white font-bold px-3 py-1 rounded ${color}`}>
      {value}
    </span>
  </div>
);

export default StatCard;
