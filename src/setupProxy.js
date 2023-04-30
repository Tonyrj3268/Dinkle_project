const { createProxyMiddleware: proxy } = require('http-proxy-middleware')

module.exports = function(app){
    app.use(
        proxy('/api',{
            target: process.env.REACT_APP_proxy,
            changeOrigin: true,
            pathRewrite:{'^/api':'/api'}
        })
    )
}