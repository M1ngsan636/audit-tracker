const StatCard = ({ label, value, color }) => (
  <div className={`p-4 rounded-xl shadow-md text-white ${color} cursor-pointer hover:opacity-80`}>
    <div className="text-sm font-medium">{label}</div>
    <div className="text-2xl font-bold">{value}</div>
  </div>
);
