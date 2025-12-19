/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Disable TypeScript build errors since we're using JavaScript
  typescript: {
    ignoreBuildErrors: true,
  },
  // Disable ESLint during builds to speed up deployment
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
