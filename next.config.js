/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // Disable TypeScript build errors since we're using JavaScript
  typescript: {
    ignoreBuildErrors: true,
  },
  // Disable ESLint during builds to speed up deployment
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Suppress certain warnings
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
};

module.exports = nextConfig;
