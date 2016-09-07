var express = require('express');
var con = require('consolidate');
var db = require('./modle/db.js');
var bodyParser = require('body-parser')

var app = express();

//设置静态文件路径
app.use(express.static('public'));
//解析 parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.engine('html', con.swig);



app.set('view engine', 'swig');
app.set('views', __dirname + '/view');



app.get('/', function(req, res){
  //res.send('hello world');
  res.render('index.html');
});
app.get('/login', function(req, res){
  //res.send('hello world');
  res.render('login.html');
});
app.get('/register', function(req, res){
  //res.send('hello world');
  res.render('register.html');
});

app.post('/login', function(req, res){
	//查找数据库有没有存在这个名字
	db.find({name:req.body.userName},function (error,data){
		if( !data.length ){
			res.send({
				status:0,
				mess:"用户名不存在"
			});

		}
	})	
});
app.post('/register', function(req, res){
	//查找数据库有没有存在这个名字
	db.find({name:req.body.userName},function (error,data){
		if( !data.length ){
			var good = new db({
				name:req.body.userName,
				age:req.body.password
			});

			good.save(()=>{
				res.send({
					status:0,
					mess:"可以登录"
				});
			});
			

		}else{
			res.send({
				status:1,
				mess:"用户名已经存在"
			});
		}
	})	
});

/*app.get('/zhuce', function(req, res){

	//拿到传递过来的数据,拿到数据后要到数据库中查询是否存在

	zhuce.find({name:req.query.userName},function (error,data){
		if( !data.length ){
			var good = new zhuce({
				name:req.query.userName,
				age:req.query.sex
			});

			good.save(()=>{
				res.send('ok');
			});


		}else{
			res.send({
				mess:"已经被注册"
			});
		}
	})	
});*/

app.listen(3000);