"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";


export default function Home() {
  useEffect(() => {
    const handleMouseMove = (e) => {
      const orbs = document.querySelectorAll(".orb");
      orbs.forEach((orb) => {
        const speed = orb.getAttribute("data-speed");
        const x = (window.innerWidth - e.pageX * speed) / 100;
        const y = (window.innerHeight - e.pageY * speed) / 100;
        orb.style.transform = `translateX(${x}px) translateY(${y}px)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-8 bg-gray-900 overflow-hidden">
      {/* Logo at top center */}
      <div className="w-full flex justify-center mb-8 pt-6">
        <Image
          src="/logo.png"   // path from public folder
          alt="Audit Tracker Logo"
          width={120}       // adjust size as needed
          height={120}
          priority
        />
      </div>

      {/* Floating orbs background */}
      <div
        className="orb fixed w-80 h-80 rounded-full bg-blue-500 opacity-10 blur-3xl -left-40 -top-40"
        data-speed="5"
      ></div>
      <div
        className="orb fixed w-96 h-96 rounded-full bg-purple-500 opacity-10 blur-3xl -right-60 bottom-20"
        data-speed="8"
      ></div>
      <div
        className="orb fixed w-64 h-64 rounded-full bg-cyan-500 opacity-10 blur-3xl left-1/4 bottom-1/3"
        data-speed="3"
      ></div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      ></div>

      {/* Main content */}
      <div className="relative bg-gray-800 rounded-2xl p-10 text-center w-full max-w-md border border-gray-700 backdrop-blur-sm bg-opacity-50 shadow-2xl overflow-hidden">
        {/* Animated border */}
        <div
          className="absolute inset-0 border-2 border-transparent rounded-2xl animate-border-pulse pointer-events-none"
          style={{
            animation: "borderPulse 4s infinite",
            boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)",
          }}
        ></div>

        <h1 className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 tracking-tight">
          AUDIT TRACKER
        </h1>

        <p className="text-lg text-gray-300 mb-8 font-light tracking-wider">
          WELCOME TO THE CORPORATE QA AUDIT TRACKER
        </p>

        <Link href="/login">
          <button className="relative bg-transparent px-8 py-3 rounded-full text-white font-medium tracking-wider group overflow-hidden border border-cyan-400 transition-all duration-300 hover:bg-cyan-900 hover:border-cyan-300 hover:shadow-lg hover:shadow-cyan-500/20">
            <span className="relative z-10">LOG IN</span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="absolute top-0 left-0 w-full h-full border border-cyan-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping-slow pointer-events-none"></span>
          </button>
        </Link>
      </div>

      {/* Glowing dots decoration */}
      <div className="absolute bottom-10 left-10 w-2 h-2 rounded-full bg-cyan-400 shadow-glow"></div>
      <div className="absolute top-10 right-10 w-3 h-3 rounded-full bg-blue-400 shadow-glow"></div>

      {/* CSS for animations */}
      <style jsx global>{`
        @keyframes borderPulse {
          0% {
            box-shadow: 0 0 5px rgba(59, 130, 246, 0.3);
            border-color: rgba(59, 130, 246, 0.1);
          }
          50% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.6);
            border-color: rgba(59, 130, 246, 0.4);
          }
          100% {
            box-shadow: 0 0 5px rgba(59, 130, 246, 0.3);
            border-color: rgba(59, 130, 246, 0.1);
          }
        }
        @keyframes ping-slow {
          0% {
            transform: scale(0.95);
            opacity: 1;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .shadow-glow {
          filter: drop-shadow(0 0 6px currentColor);
        }
      `}</style>
    </main>
  );
}
