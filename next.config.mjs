/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "i.annihil.us",
        port: "",
        pathname: "/u/prod/marvel/i/**",
      },
    ],
  },
  async redirects() {
    return [{ source: "/", destination: "/home", permanent: true }];
  },
};

export default nextConfig;
