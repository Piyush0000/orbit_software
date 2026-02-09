import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages: ['prisma'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      }
    ]
  },
  webpack: (config) => {
    // Ensure that external templates can resolve modules from the Hub's node_modules
    config.resolve.modules.push(path.resolve(__dirname, 'node_modules'));
    return config;
  }
};

export default nextConfig;