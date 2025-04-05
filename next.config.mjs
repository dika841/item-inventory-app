/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  redirects: () => [
    {
      source: "/",
      destination: "/dashboard/inventory",
      permanent: true,
    },
  ],
};

export default nextConfig;
