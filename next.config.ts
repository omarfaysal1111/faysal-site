import type { NextConfig } from 'next';

// `DEPLOY_TARGET=node` (used by the Fly.io Docker build) emits a self-contained
// Node server at dist/standalone/server.js. Unset, the build stays on the
// default Cloudflare Workers output.
const isNodeTarget = process.env.DEPLOY_TARGET === 'node';

const nextConfig: NextConfig = {
  ...(isNodeTarget ? { output: 'standalone' as const } : {}),
};

export default nextConfig;
