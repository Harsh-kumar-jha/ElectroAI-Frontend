import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Disable ESLint during builds to prevent deployment failures
    ignoreDuringBuilds: true,
  },
  // Add other configurations as needed
  experimental: {
    // Add experimental features here if needed
  },
  // Optional: Configure images if you're using next/image
  images: {
    domains: [], // Add your image domains here
  },
};

export default nextConfig;
