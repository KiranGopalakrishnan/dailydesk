module.exports = {
  async rewrites() {
    return [
      {
        source: '/rest/projector/:path*',
        destination: 'http://localhost:8080/rest/projector/:path*', // Proxy to Backend
      },
    ];
  },
};
