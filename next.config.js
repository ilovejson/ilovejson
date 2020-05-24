const isProd = process.env.NODE_ENV === "production";
const withPWA = require('next-pwa');
const withCSS = require('@zeit/next-css');

module.exports = withPWA({
  pwa: {
    dest: 'public'
  }
});

module.exports = withCSS({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]",
  }
});

module.exports = {
  poweredByHeader: false,
  generateEtags: false,
  distDir: 'dist',
  // useFileSystemPublicRoutes: false,
  dontAutoRegisterSw: !isProd,
}
