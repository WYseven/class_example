/**
 * Created by wangyun on 17/2/4.
 */
let express = require("express")
let app = express();

app.use(express.static(__dirname));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/yaoyiyao.html");
});

app.listen(8080,'192.168.0.106',function(){
    console.log("服务器开启成功");
})
