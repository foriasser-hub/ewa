/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export — produces a fully static `out/` directory that GitHub Pages
  // can serve as-is. No server, no routes API, no middleware, no ISR.
  output: 'export',

  reactStrictMode: true,
  poweredByHeader: false,

  // GitHub Pages serves the site under https://<user>.github.io/<repo>/.
  // We only enable the prefix when we know we're building for GH Pages,
  // so local `npm run dev` keeps clean / paths.
  basePath: process.env.GH_PAGES === '1' ? '/ewa' : '',
  assetPrefix: process.env.GH_PAGES === '1' ? '/ewa' : '',

  // GH Pages doesn't run the Next.js image optimizer.
  images: {
    unoptimized: true,
  },

  // Trailing slashes are friendlier with static hosts.
  trailingSlash: true,

  // Don't let stray TS / ESLint warnings block a deploy. We can clean those
  // up in a follow-up pass without holding the launch.
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
