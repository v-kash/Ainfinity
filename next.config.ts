import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Temporary stock photography. Swap for your own images in /public and remove this.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com", pathname: "/**" }],
  },
};

export default nextConfig;
