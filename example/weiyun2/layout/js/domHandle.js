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

function renderFiles(fileList,renderId){
    var childs = getChildById(datas,renderId);
    var empty = tools.$(".g-empty")[0];
    //如果数据为空，那么显示暂无数据
    empty.style.display = "none";
    if(childs.length === 0){
        empty.style.display = "block";
        return;
    }
    fileList.innerHTML = "";
    tools.each(childs,function (item){
        var newStructrue = fileStructrue({
            title:item.name,
            display:"block",
            fileId:item.id
        });
        fileList.appendChild(newStructrue );
        itemAddEvent(newStructrue);
    });
}

function renderPathNav(pathNav,id){
    //获取到renderid所有的父级数据
    var parents = getParents(datas,id).reverse();
    var str = '';
    var m = parents.length;
    for( var i = 0; i < parents.length-1; i++ ){
        var item = parents[i];
        str += '<a href="javascript:;" style="z-index: '+(--m)+'" data-file-id="'+item.id+'">'+item.name+'</a>';
    }
    
    str += '<a href="javascript:;" style="z-index: '+(--m)+'" class="current-path" >'+parents[parents.length-1].name+'</a>'
    pathNav.innerHTML = str;
}

//左侧的属性菜单结构
function treeHtml(id){
    var arr = getChildById(datas,id);
    var newUl = document.createElement("ul");
    

    tools.each(arr,function (item){
       
        var newLi = singLi(item);
        newLi.appendChild(treeHtml(item.id));

       newUl.appendChild(newLi);     
    })
    
    return newUl;
}
function singLi(item,bl){
   var newLi = document.createElement("li");
   var level = getLevelById(datas,item.id);
   var arr = getChildById(datas,item.id);
   var titleNone = arr.length ? "" : "tree-contro-none";
    var str = '<div class="tree_title '+titleNone+'" style="padding-left: '+level*14+'px;" data-file-id="'+item.id+'">'+
    '<span><strong class="ellipsis">'+item.name+'</strong> <i class="ico"></i></span>'
    +'</div>';

    if( bl ){
        str += "<ul></ul>";
    }

    newLi.innerHTML = str;
    return newLi;
    
}