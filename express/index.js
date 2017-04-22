var express = require("express");
var app = express();

app.use(express.static(__dirname));
app.use(express.static(__dirname+"/js"));

app.get("/",function(req,res){
   // res.send("ok");
   res.sendFile(__dirname+"/html/index.html");
})

app.get("/:html",function(req,res){
    console.log(req.params);
   // res.send("ok");
   res.sendFile(__dirname+"/html/"+req.params);
})

app.post("/message",function(res,res){
    res.send("评论ok");
});



app.listen(8888,function(){
    console.log("服务器启动成功");
});

