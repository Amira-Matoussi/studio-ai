const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    serverActions: true, // ensures hybrid/server deployment
  },
};

module.exports = nextConfig;
