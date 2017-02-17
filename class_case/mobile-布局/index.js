/**
 * Created by wangyun on 17/2/4.
 */
let express = require("express")
let app = express();

app.use(express.static(__dirname));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/test/event.html");
});

app.listen(8888,'192.168.0.107',function(){
    console.log("服务器开启成功");
})

/*var obj2 = require("./abc.js");
console.log(obj2);
 */

