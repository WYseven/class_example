
"use strict"

function fn1(){
    return new Promise(function(resolove,reject){
        setTimeout(function(){
            resolove('ok')
        },1000)
    })
}
function fn2(){
    return new Promise(function(resolove,reject){
        setTimeout(function(){
            reject('reject')
        },2000)
    })
}
function fn3(){
    return new Promise(function(resolove,reject){

        setTimeout(function(){
            console.log("我被执行了");
            resolove('ok')
        },5000)
    })
}
//只要有一个失败，就抛出失败的promise对象
Promise.race([fn1(),fn2(),fn3()]).then(function(data){
    console.log(data)
}).catch(function(err){
    throw err;
})


