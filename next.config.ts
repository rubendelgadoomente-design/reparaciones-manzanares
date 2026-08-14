import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* ── Redirección canónica: no-www → www ── */
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "reparacionesmanzanares.es" }],
        destination: "https://www.reparacionesmanzanares.es/:path*",
        permanent: true, // 301
      },
    ];
  },

  /* ── Cabeceras de seguridad y SEO ── */
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;

