/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "www.imgur.com",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
