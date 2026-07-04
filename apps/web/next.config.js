const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@dyktig/supabase'],
  // Monorepo: trace files relative to repo root so node_modules/.pnpm resolves
  // correctly on Vercel (fixes ENOENT lstat '/node_modules/.pnpm/client-only...').
  outputFileTracingRoot: path.join(__dirname, '../..'),
  turbopack: {
    root: path.join(__dirname, '../..'),
  },
};

module.exports = nextConfig;
