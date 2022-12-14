/* eslint-disable @typescript-eslint/no-var-requires */
const CircularDependencyPlugin = require('circular-dependency-plugin')
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
})

const plugins = []

if (process.env.ANALYZE === 'true') {
  // only load dependency if env `ANALYZE` was set
  const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: true,
  })

  plugins.push(withBundleAnalyzer)
}

plugins.push(withPWA)

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  experimental: {
    images: {
      unoptimized: true,
    }
  },
  webpack: (config) => {
    config.plugins.push(
      new CircularDependencyPlugin({
        exclude: /a\.js|node_modules/,
        include: /src/,
        failOnError: true,
        allowAsyncCycles: false,
        cwd: process.cwd(),
      }),
    )

    return config
  },
}

module.exports = () => plugins.reduce((acc, next) => next(acc), nextConfig)