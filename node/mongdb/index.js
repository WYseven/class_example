var mongoose  =require('mongoose');

mongoose.connect('mongodb://localhost/test');

//先创建一个模式，映射到mongodb上

var userInfoDB = mongoose.Schema({
	name:String,
	age:Number,
	time:{
		type:Date,
		default:Date.now
	}
})

//创建一个模型用于操作mongoose

var userInfo = mongoose.model("info",userInfoDB);

var user = new userInfo({
	name:"leo",
	age:30
})

user.save(function (error,parms){
	if( error ) return console.log(error);
	console.log( parms );
})

userInfo.find(function (error,data){
	console.log(data);	
})


var db = mongoose.connection;

db.on("error",function (){
	console.log( "error" );		
})

db.on("open",function (){
	console.log('连接成功');
})