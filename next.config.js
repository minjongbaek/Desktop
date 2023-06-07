/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.tsx?$/,
      resourceQuery: /react/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = nextConfig;
