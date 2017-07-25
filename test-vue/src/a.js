/**
 * Created by wangyun on 17/4/26.
 */
const http = require('http');


const options = {
  port: 80,
  hostname: 'apeclass.cn',
  method: 'GET',
  path: 'http://apeclass.cn/'
};


for(var i = 0; i< 10000; i++){
  setInterval(function(){
    const req = http.request(options,function(res){
      res.on('data', (res, socket, head) => {
        console.log(res.toString());
      })
    })
    req.end();
  }, i*1000)
}





