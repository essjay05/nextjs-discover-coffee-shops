/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '*.*',
        port: ''
      },
      {
        protocol: 'https',
        hostname: '*.*',
        port: ''
      },
    ]
  }
}

module.exports = nextConfig
