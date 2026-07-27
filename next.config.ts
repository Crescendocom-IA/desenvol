import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Typed routes saíram de `experimental` e viraram estáveis no Next 15.5.
  // Mantê-los em `experimental` gera warning no build.
  typedRoutes: true,
};

export default nextConfig;
