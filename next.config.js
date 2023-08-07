/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lecture-1.vercel.app', 'search.pstatic.net'],
  },
  i18n: {
    locales: ['ko'],
    defaultLocale: 'ko',
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
