/*

 */var htmlWebpackPlugins = require('html-webpack-plugin');
module.exports = {
	entry:'./js/app.js',
	output:{
		path:__dirname+"/build",
		filename:"build.js",
		publicPath:"/abc"
	},
	'devtool':"source-map",
	devServer: {
		contentBase: "./dist",//本地服务器所加载的页面所在的目录
		colors: true,//终端中输出结果为彩色
		historyApiFallback: true,//不跳转
		inline: true,//实时刷新,
		hot:true
	},
	plugins:[
		new htmlWebpackPlugins(
			{
				template:"./index.html"
			}
		)*/
	]
}