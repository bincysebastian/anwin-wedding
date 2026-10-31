import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    // Static hosting has no image optimization server.
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
