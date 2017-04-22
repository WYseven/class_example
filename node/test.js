/**
 * Created by wangyun on 17/4/3.
 */
var child = require("child_process");

//console.log( child.execSync("npm install connect-history-api-fallback") )

/*console.log(process.version);

console.log(process.env.NODE_ENV)

process.exit(10)*/

var express = require("express");
var proxy = require('http-proxy-middleware');

var app = express();

//changeOrigin 允许使用目标URL设置的header信心，默认为false
app.use("/api",proxy({target:'http://localhost:4000/api', changeOrigin: false}))

//app.use(require('connect-history-api-fallback')())

app.listen(3000);