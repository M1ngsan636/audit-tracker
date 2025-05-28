"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logging in with:", { email, password });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-white dark:from-black dark:to-gray-900">
      <form
        onSubmit={handleLogin}
        className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 w-full max-w-md"
      >
	  <Image
  src="/logo.png"
  alt="Audit Tracker Logo"
  width={100}
  height={100}
  className="mx-auto mb-4"
/>
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Login to Audit Tracker
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            Email
          </label>
          <input
            type="email"
            className="w-full px-4 py-2 rounded border dark:border-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            Password
          </label>
          <input
            type="password"
            className="w-full px-4 py-2 rounded border dark:border-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
        >
          Login
        </button>
      </form>

      {/* ✅ Tailwind test */}
      <div className="text-red-500 mt-4">TEST</div>
    </div>
  );
}
