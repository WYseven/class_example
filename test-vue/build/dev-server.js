require('./check-versions')()  //检测node和npm版本是否符合预设的范围

var config = require('../config')  // 引入生产和开发环境的配置

//判断是开发还是生产环境
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}


// 可以指定打开指定的url使用指定的浏览器或者应用
// 详情：https://github.com/sindresorhus/opn
var opn = require('opn')

// 引入node内置模块path，处理路径相关操作
// 详情：https://nodejs.org/api/path.html
var path = require('path')

// 引入node的框架，快速搭建一个node服务
// 详情：http://www.expressjs.com.cn/
var express = require('express')

// 文件打包工具，详情：https://github.com/webpack/webpack
var webpack = require('webpack')

//http协议代理的中间件，可以转发请求到其他的服务
//详情：https://github.com/chimurai/http-proxy-middleware
var proxyMiddleware = require('http-proxy-middleware')

//引入开发环境的webpack配置
var webpackConfig = require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
// 获取开发环境端口
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
// 是否自动使用浏览器打开应用
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
// 获取需要代理http服务的配置信息
var proxyTable = config.dev.proxyTable

var app = express()
var compiler = webpack(webpackConfig)  // 编译器对象


var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes

//当模板发生变化时重新加载
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    //hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// 设置访问的静态目录
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
