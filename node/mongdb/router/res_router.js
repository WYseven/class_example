module.exports = function (app){
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
}