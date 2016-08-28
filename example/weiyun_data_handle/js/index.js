(function (){
     
     tools.$(".weiyun-content")[0].style.height = document.documentElement.clientHeight-55 + "px";
     tools.addEvent(window,"resize",function (){
        tools.$(".weiyun-content")[0].style.height = document.documentElement.clientHeight-55 + "px";      
     })
    //把数据渲染在页面中
    var renderId = 0;  //初始渲染的id为0
    
   // window.itemAddEvent = itemAddEvent;

    var fileList = tools.$(".file-list")[0];  //放入文件的容器

    var datas = data.files;
    

    //通过id获取这个id下所有的自己

    function getChildById(data,id){
        var arr = [];
        for( var i = 0; i < data.length; i++ ){
            if( id == data[i].pid ){
                arr.push(data[i])
            }  
        } 

        return arr;
    }

    //通过id获取所有父级

    function getParentsById(data,id){
        var arr = [];
        for( var j = 0; j < data.length; j++ ){
            if( data[j].id == id ){
                arr.push(data[j])
               arr = arr.concat(getParentsById(data,data[j].pid));
            }       
        } 
        return arr;
    }   

   //  window.itemAddEvent = itemAddEvent;


    var child = getChildById(data,0);

    renderFiles(fileList,renderId);

    //所有的父级
    

    var pathNav = tools.$(".path-nav")[0];

     pathNavFn(datas,0)

    function pathNavFn(datas,id){
        var parents = getParentsById(datas,id).reverse();
        var str = '';
        var m = parents.length;
        for( var i = 0; i < parents.length-1; i++ ){
            var item = parents[i];
            str += '<a href="javascript:;" style="z-index: '+(--m)+'" data-file-id="'+item.id+'">'+item.name+'</a>';
        }
        
        str += '<a href="javascript:;" style="z-index: '+(--m)+'" class="current-path" >'+parents[parents.length-1].name+'</a>'
        
        pathNav.innerHTML = str;
    }

    var allDiv = tools.$(".file-item",fileList);

    /*
            selector:
                #id
                .class
                taget
    */

    function parents(element,selector){
        var f = selector.charAt();
        var f2 = selector.slice(1);
        var obj = null;
        if( f === "#" ){

            while(element.nodeType !== 9 && element.id !== f2 ){
                element = element.parentNode;
                obj = element;
            }

        }else if( f === "." ){
            while(element.nodeType !== 9 && !tools.containClass(element,f2) ){
                element = element.parentNode;
                obj = element;
            }
        }else{

        }

        return obj.nodeType === 9 ? null : obj;
    }

    tools.addEvent(fileList,"click",function (ev){
        var target = ev.target;
        target = parents(target,".file-item");
         var fileId = target.dataset.fileId;

          renderFiles(fileList,fileId);
          pathNavFn(datas,fileId);
    })

    /*for( var i = 0; i < allDiv.length; i++ ){
        itemAddEvent(allDiv[i])
    }

    function itemAddEvent(div){
        div.onclick = function (){
           var fileId = this.dataset.fileId;

              renderFiles(fileList,fileId);
              pathNavFn(datas,fileId);
  
        };
    }*/

     tools.addEvent(pathNav,"click",function(ev){
        if( ev.target.nodeName.toLowerCase() === "a"  && !tools.parents(ev.target,".current-path") ){

            var fileId = ev.target.dataset.fileId;
            renderFiles(fileList,fileId);
              pathNavFn(datas,fileId);
        }
    });

    function getLevelById(data,id){
        return getParentsById(data,id).length;
    }

     //树形菜单

    var treeMenu = tools.$(".tree-menu")[0];

    function treeLi(item){
        var newLi = document.createElement("li");
        var titleNone = "";
        var str = '<div class="tree_title '+titleNone+'" style="padding-left: '+getLevelById(datas,item.id)*14+'px;" data-file-id="'+item.id+'">'+
        '<span><strong class="ellipsis">'+item.name+'</strong> <i class="ico"></i></span>'
        +'</div>';

        newLi.innerHTML = str;
        return newLi;
    }

    function tree(datas,id){

        var newUl = document.createElement('ul');
        var childs = getChildById(datas,id);
        
        for( var i = 0; i < childs.length; i++ ){
            var newLi = treeLi(childs[i]);
            newLi.appendChild(tree(datas,childs[i].id))
            newUl.appendChild( newLi);
        }



        return newUl;
    }

    treeMenu.appendChild(tree(datas,-1));



})()

