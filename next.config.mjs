import withPlaiceholder from "@plaiceholder/next";

/** @type {import('next').NextConfig} */
const config = {
  productionBrowserSourceMaps: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "a.storyblok.com" },   // assets
      { protocol: "https", hostname: "img2.storyblok.com" } // image service
    ]
  },
  eslint: {ignoreDuringBuilds: true}, 
  webpack(cfg) {
    // Keep SVGR for inline SVGs
    cfg.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgoConfig: { plugins: [] }
          }
        }
      ]
    });

    // 🔺 Removed GraphQL loader (no longer needed with REST)
    // If you still have .graphql files, delete them or refactor to TS/JS.

    return cfg;
  },
  // Let Next manage its own build id
};

export default withPlaiceholder(config);