/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack: config => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    config.module.rules.push({
      test: /\.(mp3|wav|ogg|m4a)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next/static/audio',
            outputPath: 'static/audio',
            name: '[name].[ext]',
          },
        },
      ],
    });
    return config;
  },
};

export default nextConfig;
// next.config.js
