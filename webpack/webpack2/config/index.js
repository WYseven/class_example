/**
 * Created by seven on 2017/4/9.
 */

//这里是关于生产和开发环境的配置信息

var path = require('path');

module.exports = {
    build: {
        env: 'production',  // 生产环境
        index: path.resolve(__dirname,'../dist/inex.html'),  //生成的html文件
        assetsRoot: path.resolve(__dirname,'../dist'),        // 生成的文件夹路径
        assetsPublicPath: '/'
    },
    dev: {
        env: 'dev',  // 生产环境
        port: 8080,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/'
    }
}
