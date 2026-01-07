// Create setupProxy.js in src folder
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5173',
      changeOrigin: true,
    })
  );
};