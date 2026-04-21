import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Required to generate the static /out folder for GitHub Pages
  basePath: '/portfolio', // Required because your repo is named "portfolio" (not your main username repo)
  images: {
    unoptimized: true, // GitHub Pages doesn't support Next.js image optimization API
  },
};

export default nextConfig;
