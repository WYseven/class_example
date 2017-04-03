/**
 * Created by wangyun on 17/4/3.
 */
var child = require("child_process");

//console.log( child.execSync("npm install semver express http-proxy-middleware") )

/*console.log(process.version);

console.log(process.env.NODE_ENV)

process.exit(10)*/

var express = require("express");
var proxy = require('http-proxy-middleware');

var app = express();

app.use("/api",proxy({target:'http://www.example.org'}))



app.listen(3000);