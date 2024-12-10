import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "http://143.110.218.35/",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "http://143.110.218.35/",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
