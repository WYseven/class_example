/**
 * file.js
 * zmouse@vip.qq.com
 */

const mongoose = require('mongoose');

module.exports = new mongoose.Schema({

	//分类父级 ID
	pid: {
		type: mongoose.Schema.Types.ObjectId,
		default: null
	},

	//文件名称
	name: String,

	//文件类型
	type: {
		type: String,
		defalut: 'folder'
	},

	//路径
	path: {
		type: String,
		defalut: ''
	},

	//大小
	size: {
		type: Number,
		defalut: 0
	},

	//排序
	order: {
		type: Number,
		default: 0
	}

});