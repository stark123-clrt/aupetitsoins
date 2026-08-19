import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "210mb",
    },
    // proxy.ts protège /admin/* : sans ça, Next tronque le corps des requêtes
    // à 10 Mo avant de le transmettre, ce qui casse les uploads de médias
    // (busboy reçoit un flux coupé -> "Unexpected end of form").
    proxyClientMaxBodySize: "210mb",
  },
};

export default nextConfig;
