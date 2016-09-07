var mongoose  =require('mongoose');
var userInfoDB  =require('../schema/userinfo');

mongoose.connect('mongodb://localhost/test');

//创建一个模型用于操作mongoose

var userInfo = mongoose.model("info",userInfoDB);


module.exports = userInfo;


