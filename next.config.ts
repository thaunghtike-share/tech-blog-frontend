import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["raw.githubusercontent.com", "www.learndevopsnow-mm.blog"],
    formats: ['image/webp', 'image/avif'],
  },
  // SEO Optimizations
  poweredByHeader: false,
  compress: true,
  trailingSlash: true,
  
  // Redirects from old domain to new domain
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'learndevopsnow.it.com',
          },
        ],
        destination: 'https://www.learndevopsnow-mm.blog/:path*',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;