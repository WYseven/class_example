/**
 * app.js
 * zmouse@vip.qq.com
 */

'use strict';

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const swig = require('swig');

//通用设置
//appPath
global.APPCONFIG = {
	path: __dirname,
	db: {
		url: 'mongodb://localhost:27017/test'
	}
}

//静态目录
app.use( '/public', express.static( APPCONFIG.path + '/public') );
app.use( '/uploads', express.static( APPCONFIG.path + '/uploads') );

app.use(bodyParser.text());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//设置模板存放的目录
app.set('views', './views');
//设置模板引擎
app.set('html engine', 'html');
//设置引擎渲染的方法，以及渲染的文件类型
app.engine('html', swig.renderFile);
//取消模板引擎的缓存设置，修改模板不需要重启服务器
swig.setDefaults({ cache: false });

mongoose.connect(APPCONFIG.db.url, (err, db) => {
	console.log(111);
	if (err) {
		console.log(err);
		process.exit();
	}

	const main = require('./routers/main');

	//模块挂载
	app.use('/', main);

	//统一错误处理
	app.use((req, res, next) => {
		next({
			code: 404,
			message: '接口/页面不存在'
		});
	});
	app.use((err, req, res, next) => {
		if (err) {
			res.json({
				code: err.code || 500,
				message: err.message || 'Error'
			})
		}
	});

	app.listen(9999);
});