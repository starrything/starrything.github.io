/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "starrything.github.io",
  reactStrictMode: true,
  swcMinify: true,
  modularizeImports: {
    "@mui/icons-material": {
      transform: "@mui/icons-material/{{member}}",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "starrything.github.io",
        port: "",
        pathname: "/random",
      },
    ],
  },
};

module.exports = nextConfig;
