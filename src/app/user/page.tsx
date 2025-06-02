// src/app/user/page.tsx
"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import StatCard from "@/components/StatCard";
import { useRouter } from "next/navigation";

// ✅ Named logout component
const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    // TODO: Clear user session/token here
    console.log("User logged out");
    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="text-gray-300 hover:text-cyan-400 transition-colors"
    >
      Logout
    </button>
  );
};

export default function UserPage() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    const fetchData = async () => {
      setTimeout(() => {
        setUserData({
          name: "Suhardiman",
          email: "suhardiman@airasia.com",
          role: "QA Auditor",
          lastLogin: "2023-11-15T14:30:00Z",
          auditStats: {
            completed: 12,
            pending: 5,
            overdue: 2
          }
        });
        setLoading(false);
      }, 1000);
    };

    fetchData();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="relative min-h-screen bg-gray-900 overflow-hidden">
      <FloatingOrbs />
      <GridOverlay />

      <div className="container mx-auto px-4 py-8 relative z-10">
        <Header />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <UserProfileCard user={userData} />
          <StatsOverview stats={userData.auditStats} />
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}

// Background Orbs
const FloatingOrbs = () => (
  <>
    <div className="fixed w-80 h-80 rounded-full bg-blue-500 opacity-10 blur-3xl -left-40 -top-40"></div>
    <div className="fixed w-96 h-96 rounded-full bg-purple-500 opacity-10 blur-3xl -right-60 bottom-20"></div>
  </>
);

// Grid Overlay
const GridOverlay = () => (
  <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
    backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
    backgroundSize: '40px 40px'
  }} />
);

const Header = () => (
  <header className="flex justify-between items-center">
    <div className="flex items-center space-x-4">
      <div className="mb-4">
        <Image src="/logo.png" alt="Logo" width={100} height={100} priority />
      </div>
      <img 
        src="/logo.png" 
        alt="Logo" 
        className="w-10 h-10 rounded-full"
      />
      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
        HELLO
      </h1>
    </div>

    <nav className="flex space-x-4">
      <Link href="/user" className="text-gray-300 hover:text-cyan-400 transition-colors">
        Home
      </Link>
      {/* Uncomment if settings route is available */}
      {/* <Link href="/settings" className="text-gray-300 hover:text-cyan-400 transition-colors">
        Settings
      </Link> */}
      <LogoutButton />
    </nav>
  </header>
);


// User Profile Card
const UserProfileCard = ({ user }) => (
  <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 backdrop-blur-sm bg-opacity-50 shadow-2xl">
    <div className="flex items-center space-x-4 mb-6">
      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-2xl font-bold">
        {user.name.charAt(0)}
      </div>
      <div>
        <h2 className="text-xl font-semibold text-white">{user.name}</h2>
        <p className="text-gray-400">{user.role}</p>
      </div>
    </div>

    <div className="space-y-4">
      <div>
        <label className="block text-gray-400 text-sm mb-1">Email</label>
        <p className="text-white">{user.email}</p>
      </div>
      <div>
        <label className="block text-gray-400 text-sm mb-1">Last Login</label>
        <p className="text-white">{new Date(user.lastLogin).toLocaleString()}</p>
      </div>
    </div>

    <Link
      href="/user/profile"
      className="mt-6 w-full py-2 rounded-lg border border-cyan-400 text-cyan-400 hover:bg-cyan-900 transition-colors flex items-center justify-center"
    >
      <span>VIEW PROFILE</span>
      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  </div>
);

// ✅ Stats Overview with links
const StatsOverview = ({ stats }) => (
  <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 backdrop-blur-sm bg-opacity-50 shadow-2xl">
    <h3 className="text-xl font-semibold text-white mb-6">AUDIT STATS</h3>
    <div className="space-y-4">
      <Link href="/user/completed">
        <StatCard label="Completed" value={stats.completed} color="bg-green-500" />
      </Link>
      <Link href="/user/pending">
        <StatCard label="Pending" value={stats.pending} color="bg-yellow-500" />
      </Link>
      <Link href="/user/overdue">
        <StatCard label="Overdue" value={stats.overdue} color="bg-red-500" />
      </Link>
    </div>
  </div>
);

// Stat Card
const StatCard = ({ label, value, color }) => (
  <div className="flex justify-between items-center p-4 rounded-lg bg-gray-700">
    <span className="text-gray-300">{label}</span>
    <span className={`w-8 h-8 rounded-full ${color} flex items-center justify-center font-bold`}>
      {value}
    </span>
  </div>
);

// Recent Activity
const RecentActivity = () => {
  const activities = [
    { id: 1, action: "Completed audit", target: "Project Phoenix", time: "2 hours ago" },
    { id: 2, action: "Assigned to", target: "Project Atlas", time: "1 day ago" },
    { id: 3, action: "Submitted report", target: "Project Hermes", time: "2 days ago" },
    { id: 4, action: "Submitted report", target: "Project Roro Jonggrang", time: "7 days ago" },
  ];

  return (
    <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 backdrop-blur-sm bg-opacity-50 shadow-2xl lg:col-span-3">
      <h3 className="text-xl font-semibold text-white mb-6">RECENT ACTIVITY</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4 p-4 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
            <div className="w-3 h-3 mt-1.5 rounded-full bg-cyan-400 flex-shrink-0"></div>
            <div className="flex-1">
              <p className="text-white">
                <span className="font-medium">{activity.action}</span> - {activity.target}
              </p>
              <p className="text-gray-400 text-sm">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="mt-6 text-cyan-400 hover:text-cyan-300 transition-colors flex items-center">
        View All Activity
        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};
