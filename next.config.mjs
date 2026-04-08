/** @type {import('next').NextConfig} */
const nextConfig = {
  serverActions: {
    bodySizeLimit: '20mb',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
