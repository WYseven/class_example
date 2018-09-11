/**
 * Created by seven on 2017/4/9.
 */

// webpack最基础的配置

var path = require("path");

var config = require('../config');  //生产和开发的配置信息

function resolve(dir){
    return path.join(__dirname,'..',dir);  //用来连接路径
}

console.log(config.build.assetsRoot)

module.exports = {
    entry: {
        app:'./src/main.js'
    },
    output: {
        path: config.build.assetsRoot,  //生成文件的文件夹
        filename: '[name].js',          // 生成js文件，[name]为entry中的属性名字
        publicPath: config.build.assetsPublicPath
    },
    resolve: {
        extensions:['.js','.vue','.json'],  //在import引入模块自动补全后缀名
        alias: {
            '@':resolve('src')
        }
    },
    module:{
        rules: [
            {
                test:/\.js$/,
                loader:"babel-loader",
                exclude: /node_modules/,
                include:[resolve('src')]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options:{
                    loaders: ['vue-style-loader','css-loader']
                }
            },
            {
                test: /\.(png|jpg)/,
                loader: 'url-loader',
                options:{
                    limit: 10000,
                    name:'static/img/[name].[hash:7].[ext]'
                }
            }
        ]
    }
}

