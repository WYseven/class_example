var mongoose  =require('mongoose');
var userInfoDB  =require('../schema/userinfo');
mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost/test');

//创建一个模型用于操作mongoose

var userInfo = mongoose.model("userInfo",userInfoDB);


module.exports = userInfo;


