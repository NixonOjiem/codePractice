const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/oauth/v1/generate',
        createProxyMiddleware({
          target: 'https://sandbox.safaricom.co.ke',
          changeOrigin: true,
          pathRewrite: { '^/oauth/v1/generate': '' },
        })
      );
      
      app.use(
        '/mpesa/stkpush/v1/processrequest',
        createProxyMiddleware({
          target: 'https://sandbox.safaricom.co.ke',
          changeOrigin: true,
          pathRewrite: { '^/mpesa/stkpush/v1/processrequest': '' },
        })
      );
};