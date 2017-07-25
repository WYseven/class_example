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

app.use("/api",function(req,res){
    res.set({
        'Content-Type': 'text/plain',
        'Content-Length': '123',
        'ETag': '12345'
    })
    res.send("proxy success")
})



app.listen(4000);