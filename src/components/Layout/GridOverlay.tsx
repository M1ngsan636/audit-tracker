// src/components/Layout/GridOverlay.tsx
import React from 'react';

const GridOverlay: React.FC = () => {
  return (
    <div className="absolute inset-0 bg-grid bg-[length:40px_40px] bg-[#1a1a1a40] pointer-events-none" />
  );
};

export default GridOverlay;