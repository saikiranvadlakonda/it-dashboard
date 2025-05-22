/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // This optimizes your Next.js app for Azure App Service
  poweredByHeader: false,
  // Disable image optimization if you're using Next.js Image component
  // and want to use Azure's CDN instead
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
