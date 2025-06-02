// src/components/Layout/FloatingOrbs.tsx
import React from 'react';

const FloatingOrbs: React.FC = () => {
  return (
    <>
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full opacity-30 animate-float" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-30 animate-float" />
    </>
  );
};

export default FloatingOrbs;