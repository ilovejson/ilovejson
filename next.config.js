const isProd = process.env.NODE_ENV === "production";

module.exports = {
  poweredByHeader: false,
  generateEtags: false,
  distDir: 'dist',
  // useFileSystemPublicRoutes: false,
  // dontAutoRegisterSw: !isProd,
  swcMinify: true,
}
