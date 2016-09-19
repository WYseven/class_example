var router = require('express').Router();

router.get('/', function(req, res){
  res.render('index.html');
});
router.get('/login', function(req, res){
  res.render('login.html');
});
router.get('/register', function(req, res){
	console.log(11111111111111);
  res.render('register.html');
});
router.get('/tree', function(req, res){
  res.render('tree.html');
});

module.exports = router;