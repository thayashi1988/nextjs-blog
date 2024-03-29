const path = require('path');
const webpack = require('webpack');
module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  reactStrictMode: true,
  poweredByHeader: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      'images.microcms-assets.io',
      'via.placeholder.com',
      'firebasestorage.googleapis.com',
      'img.pokemondb.net',
    ],
  },
  webpack: (config) => {
    const env = Object.keys(process.env).reduce((acc, curr) => {
      acc[`process.env.${curr}`] = JSON.stringify(process.env[curr]);
      return acc;
    }, {});

    config.plugins.push(new webpack.DefinePlugin(env));

    return config;
  },
};
