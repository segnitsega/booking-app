import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standalone is for Docker/self-hosting. On Vercel (Next 16.3) it breaks
  // the deploy adapter with ENOENT next-server.js.nft.json.
  output: process.env.VERCEL ? undefined : "standalone",
  serverExternalPackages: ["@prisma/client", "prisma"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.dicebear.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
