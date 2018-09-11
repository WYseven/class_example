/**
 * Created by seven on 2017/4/9.
 */

var express = require('express');

var app = express();
var path = require("path");
var config = require('../config');
var webpack = require('webpack');
var webpackConfig = require('./webpack.dev.conf');

var compiler = webpack(webpackConfig)


//会把打包成的文件存在内存中
var devMiddleware = require('webpack-dev-middleware');

var hotMiddleware = require('webpack-hot-middleware');
var d = devMiddleware(compiler,{
    publicPath:'/',
    quiet:true
});
app.use(d)

var h = hotMiddleware(compiler,{
    log:() => {}
});

app.use(h)
compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        h.publish({ action: 'reload' })
        cb()
    })
})
app.get("/",function (req,res){
    res.send("ok")
})

//设置静态路径
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var _resolve;

var readyPromise = new Promise( resolve => {
    _resolve = resolve;
} )

d.waitUntilValid(()=>{
    console.log('监听成功');
    _resolve();
})

app.listen(8000);

module.exports = {
    ready:readyPromise
}




