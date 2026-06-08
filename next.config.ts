import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/login", destination: "/sign-in", permanent: true },
      { source: "/login/:path*", destination: "/sign-in/:path*", permanent: true },
      { source: "/signup", destination: "/sign-up", permanent: true },
      { source: "/signup/:path*", destination: "/sign-up/:path*", permanent: true },
      { source: "/portfolio", destination: "/dashboard/portfolio", permanent: true },
      { source: "/portfolio/:path*", destination: "/dashboard/portfolio/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
