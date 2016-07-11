(function (){
     
    var datas = data.files;  //用到的数据

    function fileStructrue(options){
        options = options || {};
        var defatuls = {
            title:options.title || "1",
            display:options.display || "none",
            fileId:options.fileId || ""
        }

        var display = defatuls.display === "block" ? "none" : "block";
        var newDiv = document.createElement("div");
        newDiv.className = 'file-item';
        var str = `
                <div class="item">
                    <lable class="checkbox"></lable>
                    <div class="file-img">
                        <i></i>
                    </div>
                    <p class="file-title-box">
                        <span class="file-title" style="display: ${defatuls.display};">${defatuls.title}</span>
                        <span class="file-edtor" style="display: ${display};">
                            <input class="edtor" type="text"/>
                        </span>
                    </p>
                </div>
            `;
        newDiv.innerHTML = str;
        newDiv.dataset.fileId = defatuls.fileId;
        return newDiv;
    }

    //把数据渲染在页面中
    var renderId = 0;  //初始渲染的id为0
    

    var fileList = tools.$(".file-list")[0];  //放入文件的容器
    /*-----------渲染数据 文件夹部分-----*/
    //获取到当前id下所有的子元素
    var childs = getChildById(datas,renderId);
    //如果数据为空，那么显示暂无数据
    if(childs.length === 0){
        fileList.innerHTML = "暂无数据";
        return;
    }
    tools.each(childs,function (item){
        var newStructrue = fileStructrue({
            title:item.name,
            display:"block",
            fileId:item.id
        });
        fileList.appendChild(newStructrue );
    });

    /*-----------渲染数据 文件路径导航-----*/
    var pathNav = tools.$(".path-nav")[0];

    //渲染出文件导航路径
    renderPathNav(renderId);

    function renderPathNav(id){
        //获取到renderid所有的父级数据
        var parents = getParents(datas,id).reverse();
        var str = '';
        tools.each(parents,function(item){
            str += '<a href="javascript:;" data-file-id="'+item.id+'">'+item.name+'</a>';
        });
        pathNav.innerHTML = str;
    }

    /*-----------渲染数据 左侧的菜单-----*/

    var treeMenu = tools.$(".tree-menu")[0];
    var treeDiv = tools.$(".tree_title",treeMenu);

    treeMenu.appendChild(treeHtml(-1));

    //左侧的属性菜单结构
    function treeHtml(id){
        var arr = getChildById(data.files,id);
        if( arr.length === 0 ) return null;
        var newUl = document.createElement("ul");
        tools.each(arr,function(item){
            var newLi = document.createElement("li");
            var str = "";
            //获取当前元素在第几层，然后给定padding
            var level = getLevelById(datas,item.id);
            var arr = treeHtml(item.id);

            var titleNone = arr ? "" : "tree-contro-none";
            str = '<div class="tree_title '+titleNone+'" style="padding-left: '+level*14+'px;" data-file-id="'+item.id+'">'+
                '<span><strong class="ellipsis">'+item.name+'</strong> <i class="ico"></i></span>'
                +'</div>';
            newLi.innerHTML = str;
            if(arr) newLi.appendChild(arr);
            newUl.appendChild(newLi);

        })
        return newUl;
    }

    //默认第一个为选中状态，同时则子元素ul是展开的
    postionLevel(0)
    function postionLevel(id){
        var childs = getChildById(datas,id);
        if( childs.length !== 0 ){
            var divs = document.querySelector(".tree_title[data-file-id='"+childs[0].id+"']");
            divs.parentNode.parentNode.style.display = "block";
        }

    }

})()