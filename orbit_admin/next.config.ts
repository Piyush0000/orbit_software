import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Configure Turbopack to use this directory as root to avoid workspace detection issues
  turbopack: {
    resolveAlias: {
      '@/*': ['./src/*'],
    },
  },
  // Additional optimizations for parallel execution
  experimental: {
    // Reduce memory usage during development
    turbonet: false,
  },
};

export default nextConfig;