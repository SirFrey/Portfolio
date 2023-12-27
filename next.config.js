/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  images: {
    // domains: ['img2.cgtrader.com', 's3-us-west-2.amazonaws.com', 'cdn.dribbble.com', 'ca-times.brightspotcdn.com'],
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img2.cgtrader.com',
      },
      {
        protocol: 'https',
        hostname: 's3-us-west-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.dribbble.com',
      },
      {
        protocol: 'https',
        hostname: 'ca-times.brightspotcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'img.freepik.com',
      },
    ],
  },
}

export default nextConfig
