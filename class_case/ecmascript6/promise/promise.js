function ajax(url){

    return new Promise((resolve,reject) => {
         var xhr = new XMLHttpRequest()

        xhr.open('get',url,true)

        xhr.onload = function(){
            if(xhr.status === 200){
                resolve(xhr.responseText)
            }else{
                reject(xhr.status,xhr.statusText)
            }
        }
        xhr.send()
    })

   
}