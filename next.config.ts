// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['example.com'], // Example domain for image optimization
  },
  env: {
    customKey: 'my-value', // Custom environment variables
  },
  // Other valid options...
};

export default nextConfig;