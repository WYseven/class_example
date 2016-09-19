//在这个文件中调用model.controller.js中的userInfo.model.js中的方法
var userInfo = require('../model_controller/userInfo.model.js');
module.exports = function (app){
	app.post('/login', function(req, res){
		//查找数据库有没有存在这个名字
		userInfo.login({name:req.body.userName,password:req.body.password})
		.then((data)=>{
			console.log( data );
			if( !data ){
				res.send({
					status:0,
					mess:"用户名不存在"
				});
			}else{
				res.send({
					status:1,
					mess:"用户名已经存在"
				});
			}
		})		
	});
	app.post('/register', function(req, res){
		//查找数据库有没有存在这个名字
		console.log("注册");
		userInfo.register({name:req.body.userName})
		.then((data)=>{
			if( !data ){
				userInfo.setUserInfo({
					name:req.body.userName,
					password:req.body.password
				}).save((error,data)=>{
					res.send({
						status:0,
						mess:"注册成功"
					});
				});
			}else{
				res.send({
					status:1,
					mess:"用户名已经存在,请重写填写用户名"
				});
			}
		})
		
	});
}