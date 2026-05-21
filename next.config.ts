import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Leaflet dipakai hanya di client (dynamic import); tidak perlu konfigurasi webpack khusus
};

export default nextConfig;
