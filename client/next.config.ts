import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const backendUrl = process.env.BACKEND_URL
    if (!backendUrl) {
      throw new Error('BACKEND_URL environment variable is required');
    }
    
    return [
      {
      source: '/api/pipeline/:path*',
      destination: `${backendUrl}/:path*`,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
