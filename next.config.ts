import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Required to generate the static /out folder for GitHub Pages
  images: {
    unoptimized: true, // GitHub Pages doesn't support Next.js image optimization API
  },
};

export default nextConfig;
