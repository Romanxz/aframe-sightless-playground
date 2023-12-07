const nextEnv = require('next-env');
const dotenvLoad = require('dotenv-load');
 
dotenvLoad();
 
const withNextEnv = nextEnv();
 
module.exports = withNextEnv({
  distDir: 'app',
  reactStrictMode: false,
  basePath: process.env.GH_PAGES_PATH_PREFIX || undefined,
  assetPrefix: process.env.GH_PAGES_PATH_PREFIX || undefined,

  webpack: (config) => {
    config.resolve.fallback = {
      "buffer": require.resolve('buffer/'),
      "events": require.resolve("events/"),
      "os": false,
      "fs": false,
      "tls": false,
      "net": false,
      "path": false,
      "zlib": false,
      "http": false,
      "https": false,
      "stream": false,
      "crypto": false,
    };

    // Add the new rule to the configuration
    config.module.rules.push({
      test: /\.glsl$/,
      loader: 'webpack-glsl-loader'
    });

    return config;
  },
});