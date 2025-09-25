/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
      remotePatterns: [
          {
              protocol: 'https',
              hostname: '**', // autorise tous les domaines HTTPS
          },
      ]
  },
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule) =>
        rule.test?.test?.('.svg'),
    );

    config.module.rules.push(
        {
          ...fileLoaderRule,
          test: /\.svg$/i,
          resourceQuery: /url/, // pour les importations en tant que URL
        },
        {
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/,
          resourceQuery: { not: /url/ }, // tout sauf `?url`
          use: ['@svgr/webpack'],
        }
    );

    fileLoaderRule.exclude = /\.svg$/i;
    return config;
  },
};

export default nextConfig;
