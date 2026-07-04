const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@dyktig/supabase'],
  turbopack: {
    root: path.join(__dirname, '../..'),
  },
};

module.exports = nextConfig;
