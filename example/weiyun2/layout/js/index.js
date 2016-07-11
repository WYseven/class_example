(function (){
     
    

    

    //把数据渲染在页面中
    var renderId = 0;  //初始渲染的id为0
    
    window.itemAddEvent = itemAddEvent;

    var fileList = tools.$(".file-list")[0];  //放入文件的容器
    /*-----------渲染数据 文件夹部分-----*/
    //获取到当前id下所有的子元素
    renderFiles(fileList,renderId)
    

    /*-----------渲染数据 文件路径导航-----*/
    var pathNav = tools.$(".path-nav")[0];

    //渲染出文件导航路径
    renderPathNav(pathNav,renderId);

    //路径点击事件
    tools.addEvent(pathNav,"click",function(ev){
        if( ev.target.nodeName.toLowerCase() === "a" ){

            var fileId = ev.target.dataset.fileId;
            renderFiles(fileList,fileId);
            renderPathNav(pathNav,fileId);
            postionLevel(fileId)
        }
    })

    /*-----------渲染数据 左侧的菜单-----*/

    var treeMenu = tools.$(".tree-menu")[0];
    var treeDiv = tools.$(".tree_title",treeMenu);

    treeMenu.appendChild(treeHtml(-1));

    

    //默认第一个为选中状态，同时则子元素ul是展开的
    var prevPathNav = null;
    postionLevel(0);
    
    function postionLevel(id){
        var childs = getChildById(datas,id);
        var currentDiv = document.querySelector(".tree_title[data-file-id='"+id+"']");
            if( prevPathNav ) {
                tools.removeClass(prevPathNav,"tree-contro");
                tools.removeClass(prevPathNav,"tree-nav");
            }
            tools.addClass(currentDiv,"tree-contro");
            tools.addClass(currentDiv,"tree-nav");
            
        prevPathNav = currentDiv;
        if( childs.length !== 0 ){
            var divs = document.querySelector(".tree_title[data-file-id='"+childs[0].id+"']");
            divs.parentNode.parentNode.style.display = "block";
        }
    }


    /*-------文件事件 鼠标移入移出点击--------*/

    function itemAddEvent(item){
        tools.addEvent(item,"mouseenter",function(){
            tools.addClass(this,"file-checked");
        })
        tools.addEvent(item,"mouseleave",function(ev){
            var lable = tools.$("lable",this)[0];
            if(!tools.containClass(lable,"checked")){
                tools.removeClass(this,"file-checked");
            }
        });
    }


    //点击文件
    tools.addEvent(fileList,"click",function(ev){
        var target = ev.target;
        if( target.nodeName.toLowerCase() !== "lable" ){

            target = tools.parents(target,".file-item");
            console.log( target );
            //找到当前点击的文件的id
            if(target){
                var fileId = target.dataset.fileId;
                //获取当前id渲染这个id下的子元素
                renderFiles(fileList,fileId);
                renderPathNav(pathNav,fileId);
                postionLevel(fileId);

                renderId = fileId;
            }
        }
    }); 


    //新建文件夹

    var create = tools.$(".create")[0];
    var newStructrue = null;
    var edtor = null;
    tools.addEvent(create,"mouseup",function (){
        newStructrue = fileStructrue()
        tools.insertFirst( fileList,newStructrue );
        //获取新生成元素中的input
        edtor = tools.$(".edtor",newStructrue)[0];
        fileTitle = tools.$(".file-title",newStructrue)[0];
        fileEdtor = tools.$(".file-edtor",newStructrue)[0];
        edtor.select();     
    });

    //给document一个mousedown，新建时候，没有命名元素移除
    tools.addEvent(document,'mousedown',function(){
        handleCreateFile();
    });
    //创建文件夹的时候
    function handleCreateFile(){
        if(newStructrue && edtor && !edtor.value.trim()) {
            tools.removeChild(fileList,newStructrue);
        }else if(edtor && edtor.value.trim()){
            tools.show(fileTitle);
            tools.hide(fileEdtor);
            fileTitle.innerHTML = edtor.value;
            itemAddEvent(newStructrue);
            var newData = {
                name:edtor.value,
                id:new Date().getTime(),
                pid:renderId
            }
            //给定数据，重新渲染
            datas.unshift(newData);
            renderFiles(fileList,renderId);
            renderPathNav(pathNav,renderId);

            //渲染一下左侧的树形菜单
            var titleDiv = document.querySelector(".tree_title[data-file-id='"+renderId+"']")
                
            titleDiv.nextElementSibling.appendChild(singLi(newData,true));
            tools.removeClass(titleDiv,"tree-contro-none")
        }

        edtor = null;
        newStructrue = null;
    }

})()