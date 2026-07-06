/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
  experimental: {
    outputFileTracingIncludes: {
      '/api/ebook/download': ['./assets/ebook/**'],
    },
  },
};

export default nextConfig;
