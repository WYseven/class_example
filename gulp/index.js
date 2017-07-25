/**
 * Created by wangyun on 17/2/12.
 */

var express = require("express");
var app = express();
console.log(345)
console.log(345)
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")
})


app.listen(8088,function(){
    console.log("服务器开启成功");
})
