/**
 * Created by seven on 2017/4/9.
 */

// 这是开发环境的配置

var webpack = require('webpack');
var merge = require("webpack-merge");  //合并对象的工具
var baseWebpackConfig = require('./webpack.base.conf');  //webpack的基础配置
var HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html文件

module.exports = {
    plugins: [
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:'index.html',
            inject: true
        })
    ]
}



