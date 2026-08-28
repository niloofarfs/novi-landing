import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Single static route. `next build` emits a fully prerendered page; adding
  // `output: 'export'` is safe here too if a plain static host is the target.
  experimental: {
    // Tree-shake the two MUI entry points we actually use.
    optimizePackageImports: ['@mui/material'],
  },
};

export default nextConfig;
