/**
 * Created by wangyun on 17/2/5.
 */

var path = require("path");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
console.log(path.resolve(__dirname,"/dist"));

module.exports = {
    entry:"./index.js",  //入口文件
    output:{
        path:path.resolve(__dirname,"dist"),
        filename:"build.js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                /*use: ["style-loader",{
                 loader:'css-loader',
                 options: { modules: true }  //css文件当成模块使用
                 }]*/
                loader:  ExtractTextPlugin.extract({
                    loader: 'css-loader',
                })
            },
            /*{
                test: /\.sass$/,
                exclude: /node_modules/,
                use: ["style-loader",'css-loader',{
                    loader:"sass-loader",
                    options: {
                        sourceMap: true,
                    }
                }],
            }*/
            {
                test: /\.sass$/,
                exclude: /node_modules/,
                loader:  ExtractTextPlugin.extract({
                    loader: ['css-loader',"sass-loader"],
                })
            }
        ]
    },
    devServer: {
        hot: true},
    plugins: [
        new ExtractTextPlugin({ filename: '[name].bundle.css',allChunks: true })
    ]
}

