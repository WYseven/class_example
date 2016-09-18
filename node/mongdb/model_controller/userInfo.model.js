var db = require('../modle/db.js');
let userInfo = {
	login:function (params){
		return db.findOne(params);
	},
	register:function (params){
		return db.findOne(params);		
	},
	setUserInfo:function (params){
		return new db(params);
	}
}

module.exports = userInfo;