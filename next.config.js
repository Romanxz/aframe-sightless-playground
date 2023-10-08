const nextEnv = require('next-env');
const dotenvLoad = require('dotenv-load');
 
dotenvLoad();
 
const withNextEnv = nextEnv();
 
module.exports = withNextEnv({
  distDir: 'app',
  basePath: process.env.GH_PAGES_PATH_PREFIX || "",
  assetPrefix: process.env.GH_PAGES_PATH_PREFIX || "",
  
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

    return config;
  },
});