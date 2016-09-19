var express = require('express');
var con = require('consolidate');
var bodyParser = require('body-parser');



var app = express();

//设置静态文件路径
app.use(express.static('public'));
//解析 parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.engine('html', con.swig);



app.set('view engine', 'swig');
app.set('views', __dirname + '/view');

//网站请求路由
//require('./router/res_router.js')(app);
//require('./router/db_router.js')(app);


app.use("/api", require("./router/db_router"));
app.use("/", require("./router/res_router") );

app.listen(3000);