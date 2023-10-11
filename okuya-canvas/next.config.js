/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals = [...config.externals, { canvas: "canvas" }]; // Required to make Konva and React-Konva work
    return config;
  },
};

module.exports = nextConfig;
