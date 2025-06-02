// src/components/Layout/Header.tsx
import React from 'react';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
        {title}
      </h1>
      {subtitle && (
        <p className="text-lg text-gray-400 mt-2">{subtitle}</p>
      )}
    </div>
  );
};

export default Header;