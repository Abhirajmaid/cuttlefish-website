import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        // hostname: 'cdn.jsdelivr.net',
        hostname: 'i.pravatar.cc',
      },
    ],
  },
};

export default nextConfig;
