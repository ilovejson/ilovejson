const isProd = process.env.NODE_ENV === "production";
const withPWA = require('next-pwa');
const withSass = require("@zeit/next-sass");

module.exports = withPWA({
  pwa: {
    dest: 'public'
  }
})

module.exports = withSass({
  /* config options here */
})

module.exports = {
  poweredByHeader: false,
  generateEtags: false,
  distDir: 'dist',
  // useFileSystemPublicRoutes: false,
  dontAutoRegisterSw: !isProd,
}
