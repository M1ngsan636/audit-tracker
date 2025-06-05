"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
const router = useRouter();

const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok && data.success) {
      alert(`Welcome, ${data.user.username} (${data.user.role})!`);
      // Redirect to user dashboard or protected page
      router.push("/user/profile"); // Change this if your route is different
    } else {
      alert(data.message || 'Login failed');
    }
  } catch (err) {
    console.error('Login error:', err);
    alert('Something went wrong.');
  }
};

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-900 overflow-hidden">
      {/* Floating orbs background */}
      <div className="fixed w-80 h-80 rounded-full bg-blue-500 opacity-10 blur-3xl -left-40 -top-40"></div>
      <div className="fixed w-96 h-96 rounded-full bg-purple-500 opacity-10 blur-3xl -right-60 bottom-20"></div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }}></div>

      <form
        onSubmit={handleLogin}
        className="relative z-10 bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-700 backdrop-blur-sm bg-opacity-50"
      >
        <div className="flex justify-center mb-6">
          <Image
            src="/logo.png"
            alt="Audit Tracker Logo"
            width={100}
            height={100}
            className="mx-auto"
          />
        </div>
        
        <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-8 tracking-tight">
          AUDITOR LOGIN
        </h2>

        <div className="mb-6">
          <label className="block text-gray-300 mb-2 font-light tracking-wider">
            EMAIL
          </label>
          <input
            type="email"
            className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-8">
          <label className="block text-gray-300 mb-2 font-light tracking-wider">
            PASSWORD
          </label>
          <input
            type="password"
            className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full relative bg-transparent px-6 py-3 rounded-full text-white font-medium tracking-wider group overflow-hidden border border-cyan-400 transition-all duration-300 hover:bg-cyan-900 hover:border-cyan-300 hover:shadow-lg hover:shadow-cyan-500/20 mb-6"
        >
          <span className="relative z-10">LOGIN</span>
          <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </button>

        <div className="text-center text-gray-400 text-sm">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-cyan-400 hover:text-cyan-300 transition-colors">
            Register here
          </Link>
        </div>
      </form>

      {/* Glowing dots decoration */}
      <div className="absolute bottom-10 left-10 w-2 h-2 rounded-full bg-cyan-400 shadow-glow"></div>
      <div className="absolute top-10 right-10 w-3 h-3 rounded-full bg-blue-400 shadow-glow"></div>

      <style jsx global>{`
        .shadow-glow {
          filter: drop-shadow(0 0 6px currentColor);
        }
      `}</style>
    </div>
  );
}