const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://localhost:3000',
      changeOrigin: true,
    })
  );

  // Handle client-side routing
  app.use((req, res, next) => {
    if (req.method === 'GET' && !req.url.startsWith('/api')) {
      res.sendFile('index.html', { root: 'public' });
    } else {
      next();
    }
  });
};
