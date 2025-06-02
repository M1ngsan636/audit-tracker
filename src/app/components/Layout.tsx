// components/Layout.tsx
"use client";

import Link from "next/link";
import Image from "next/image";

export const FloatingOrbs = () => (
  <>
    <div className="fixed w-80 h-80 rounded-full bg-blue-500 opacity-10 blur-3xl -left-40 -top-40"></div>
    <div className="fixed w-96 h-96 rounded-full bg-purple-500 opacity-10 blur-3xl -right-60 bottom-20"></div>
  </>
);

export const GridOverlay = () => (
  <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
    backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
    backgroundSize: '40px 40px'
  }} />
);

export const Header = ({ title }: { title: string }) => (
  <header className="flex justify-between items-center">
    <div className="flex items-center space-x-4">
      <Image 
        src="/logo.png" 
        alt="Logo" 
        width={40} 
        height={40} 
        priority 
        className="rounded-full"
      />
      <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
        {title}
      </h1>
    </div>

    <Link 
      href="/user" 
      className="text-gray-300 hover:text-cyan-400 transition-colors flex items-center"
    >
      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      Back to Dashboard
    </Link>
  </header>
);