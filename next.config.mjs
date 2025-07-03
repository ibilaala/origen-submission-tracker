/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['www.gravatar.com', 'i.pravatar.cc'],
    unoptimized: true,
  },
}

export default nextConfig
