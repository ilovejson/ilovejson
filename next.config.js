const isProd = process.env.NODE_ENV === "production";
const withPWA = require('next-pwa');

module.exports = withPWA({
  pwa: {
    dest: 'public'
  }
})

module.exports = {
  poweredByHeader: false,
  generateEtags: false,
  distDir: 'dist',
  // useFileSystemPublicRoutes: false,
  dontAutoRegisterSw: !isProd,
}
