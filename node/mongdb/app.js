var express = require('express');
var con = require('consolidate');
var zhuce = require('./modle/zhuce.js');


var app = express();

//设置静态文件路径
app.use(express.static('public'));

app.engine('html', con.swig);



app.set('view engine', 'swig');
app.set('views', __dirname + '/view');



app.get('/', function(req, res){
  //res.send('hello world');
  res.render('index.html');
});

app.get('/zhuce', function(req, res){

	//拿到传递过来的数据,拿到数据后要到数据库中查询是否存在

	zhuce.find({name:req.query.userName},function (error,data){
		console.log( "data"+data.length );
		if( !data.length ){
			console.log( data.length );
			console.log("没有数据");
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

	/*console.log( req.query.userName );
	console.log( req.query.sex );*/

	
});

app.listen(3000);