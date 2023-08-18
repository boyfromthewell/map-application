/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'map-application-mocha.vercel.app',
      'search.pstatic.net',
      'firebasestorage.googleapis.com',
    ],
  },
  i18n: {
    locales: ['ko'],
    defaultLocale: 'ko',
  },
  reactStrictMode: false,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

module.exports = nextConfig;
