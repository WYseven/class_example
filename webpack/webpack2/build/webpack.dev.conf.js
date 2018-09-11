/**
 * Created by seven on 2017/4/9.
 */

// 这是开发环境的配置

var webpack = require('webpack');
var merge = require("webpack-merge");  //合并对象的工具
var baseWebpackConfig = require('./webpack.base.conf');  //webpack的基础配置
var HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html文件
var friendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

var utils = require('./utils');

Object.keys(baseWebpackConfig.entry).forEach(function (name) {
    baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})


module.exports = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({sourceMap:true})
    },
    devtool:'#cheap-module-eval-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:'index.html',
            inject: true    // 自动添加打包后的入口文件到body中
        }),
        new friendlyErrorsWebpackPlugin()
    ]
})



