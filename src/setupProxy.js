const { createProxyMiddleware: proxy } = require('http-proxy-middleware')

module.exports = function(app){
    app.use(
        proxy('/api',{
            target: process.env.REACT_APP_proxy,
            changeOrigin: true,
            pathRewrite:{'^/api':'/api'}
        })
    );
    // app.use(
    //     proxy('/api/1',{
    //         target: process.env.REACT_APP_proxy_1data,
    //         changeOrigin: true,
    //         pathRewrite:{'^/api/1':'/api'}
    //     })
    // );
    // app.use(
    //     proxy('/api/40',{
    //         target: process.env.REACT_APP_proxy_40data,
    //         changeOrigin: true,
    //         pathRewrite:{'^/api/40':'/api'}
    //     })
    // )

}