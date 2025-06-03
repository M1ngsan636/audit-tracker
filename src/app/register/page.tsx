// src/app/register/page.tsx
"use client";
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Registering with:', formData);
  };

  return (
    <div className="relative min-h-screen bg-gray-900 overflow-hidden">
      {/* Floating orbs background */}
      <div className="fixed w-80 h-80 rounded-full bg-blue-500 opacity-10 blur-3xl -left-40 -top-40 animate-float"></div>
      <div className="fixed w-96 h-96 rounded-full bg-purple-500 opacity-10 blur-3xl -right-60 bottom-20 animate-float animation-delay-2000"></div>
      
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }}></div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8 relative z-10 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md">
          {/* Logo/Header */}
          <div className="flex justify-center mb-8">
              <Image 
				src="/logo.png" 
				alt="Logo" 
				width={200} 
				height={200} 
				priority 
				className="rounded-full"
			/>
            </div>

          {/* Registration Card */}
          <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 backdrop-blur-sm bg-opacity-50 shadow-2xl animate-border-glow">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-2 text-center">
              CREATE ACCOUNT
            </h2>
            <p className="text-gray-400 text-center mb-6">CQA audit tracking system</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="username">
                  USERNAME
                </label>
                <input
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="email">
                  EMAIL
                </label>
                <input
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="password">
                  PASSWORD
                </label>
                <input
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="confirmPassword">
                  CONFIRM PASSWORD
                </label>
                <input
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                />
              </div>

              <button
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-cyan-500/20"
                type="submit"
              >
                REGISTER
              </button>

              <div className="text-center text-gray-400 text-sm mt-4">
                Already have an account?{' '}
                <Link href="/login" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                  Sign in
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;