import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: 'export',
  experimental: {
    optimizePackageImports: ['@mui/material'],
  },
};

export default nextConfig;
