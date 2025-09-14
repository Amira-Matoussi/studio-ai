/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",   // required for `out/` folder
  images: {
    unoptimized: true // disable Next.js image optimization
  }
};

module.exports = nextConfig;
