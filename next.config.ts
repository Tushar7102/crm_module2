import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Don’t fail production builds on ESLint errors
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Don’t fail production builds on TS type errors
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
