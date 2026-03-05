/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Los dos asteriscos significan "cualquier dominio"
      },
    ],
  },
};

export default nextConfig;