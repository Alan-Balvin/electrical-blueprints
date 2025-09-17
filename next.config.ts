import type { NextConfig } from "next";
import { NextFederationPlugin } from "@module-federation/nextjs-mf";

const nextConfig: NextConfig = {
  webpack(config) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "nextApp", // nombre de tu app remota
        filename: "static/chunks/remoteEntry.js",
        exposes: {
          "./BlueprintsPage": "./pages/blueprints/index.tsx",
        },
        shared: {},
        extraOptions: {}, // 👈 ESTA LÍNEA RESUELVE EL ERROR DE TYPESCRIPT
      })
    );
    return config;
  },
};

export default nextConfig;
