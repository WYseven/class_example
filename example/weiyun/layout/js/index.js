/**
 * Created by seven on 2016/7/6.
 */

(function(){
    //要生成的结构
    /*
     *
     * */
    function createStructrue(options){
        //这个地方需要调整
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
    var create = tools.$(".create")[0];  //新建按钮
    var fileList = tools.$(".file-list")[0]; //存放文件的列表
    var listDiv = tools.$(".file-item",fileList);  //获取到所有的文件列表

    //存储新建的元素
    var newStructrue = null;
    var edtor = null;
    var fileTitle = null;

    var renderNum = 0;

    var pid = 0;

    //使用数据生成文件
    function renderHtml(id){
        var arr = getChildById(data.files,id);
        fileList.innerHTML = "";
        if(arr.length === 0){
            fileList.innerHTML = "暂无数据";
            return;
        }
        tools.each(arr,function(item){
            var newStructrue = createStructrue({
                title:item.name,
                display:"block",
                fileId:item.id
            });
            fileList.appendChild(newStructrue );
            itemAddEvent(newStructrue);
        });
    }
    renderHtml(renderNum);
    //渲染路径导航
    var pathNav = tools.$(".path-nav")[0];  //路径导航容器
    function renderNav(id){
        var parents = getParents(data.files,id).reverse();
        var str = '<a href="javascript:;" data-file-id="0">微云</a>';
        tools.each(parents,function(item){
            str += '<a href="javascript:;" data-file-id="'+item.id+'">'+item.name+'</a>';
        });
        pathNav.innerHTML = str;
    }

    //左侧的菜单
    var treeMenu = tools.$(".tree-menu")[0];
    var treeDiv = tools.$("div",treeMenu);
    var m = 0;
    function treeHtml(id){
        var arr = getChildById(data.files,id);
        if( arr.length === 0 ) return null;
        var newUl = document.createElement("ul");
        //tree-nav tree-contro
        tools.each(arr,function(item){
            var newLi = document.createElement("li");
            var str = "";
            //获取当前元素在第几层，然后给定padding
            var level = getLevelById(data.files,item.id);
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
    //渲染tree形结构
    function renderTree(id){
        treeMenu.innerHTML = "";
        treeMenu.appendChild(treeHtml(-1));
        postionLevel(id);
    }
    //让第一个为选中状态
    renderTree(0)


    //选中那一层
    //通过id直接定位到那一层上
    var prev = 0;
    function postionLevel(id){
        var parents = getParents(data.files,id);

        for( var i = 0; i < treeDiv.length; i++ ){
            if( id == treeDiv[i].dataset.fileId ){
                tools.addClass(treeDiv[i],"tree-nav");
                prev = treeDiv[i].dataset.fileId;
            }
            for( var j = 0; j < parents.length; j++ ){
                if(treeDiv[i].dataset.fileId == parents[j].id && treeDiv[i].nextElementSibling){
                    treeDiv[i].nextElementSibling.style.display = "block";
                }
            }
        }
    }

    //这个地方需要改进？？？？？
    tools.addEvent(treeMenu,"click",function(ev){
        var target = ev.target;
        if(tools.parents(target,".ico")){
            target = tools.parents(target,".tree_title");
            tools.addClass(target,".tree-contro");
            if(target.nextElementSibling && target.nextElementSibling.style.display == "block"){
                target.nextElementSibling.style.display = "none";
            }else{
                target.nextElementSibling.style.display = "block";
            }
        }else if( target = tools.parents(target,".tree_title") ){
            var fileId = target.dataset.fileId;
            render(fileId)
        }

    })


    function render(fileId){
        pid = fileId;
        renderHtml(fileId);
        renderNav(fileId);
        positionTree(fileId);
    }
    //定位在具体的一个标题上
    function positionTree(fileId){
        for( var i = 0; i < treeDiv.length; i++ ){
            tools.removeClass(treeDiv[i],"tree-nav");
            if( fileId == treeDiv[i].dataset.fileId ){
                tools.addClass(treeDiv[i],"tree-contro");
                tools.addClass(treeDiv[i],"tree-nav");
                if(treeDiv[i].nextElementSibling){
                    treeDiv[i].nextElementSibling.style.display = "block";
                }
            }
        }
        //让当前之上所有的ul显示出来
        postionLevel(fileId);
    }

    //路径点击事件
    tools.addEvent(pathNav,"click",function(ev){
        if( ev.target.nodeName.toLowerCase() === "a" ){
            var fileId = ev.target.dataset.fileId;
            render(fileId);
            //取消掉全选
            tools.removeClass(checkedAll,"checked");
        }
    })


    //点击新建按钮，生成新的结构
    tools.addEvent(create,"mouseup",function(){
        //给一个状态，判断元素是否插入到了列表中
        if(create.isCreate){
            create.isCreate = false;
            return;
        }
        newStructrue = createStructrue()
        tools.insertFirst( fileList,newStructrue );
        //获取新生成元素中的input
        edtor = tools.$(".edtor",newStructrue)[0];
        fileTitle = tools.$(".file-title",newStructrue)[0];
        edtor.select();
        create.isCreate = true;
    });
    //操作每一个文件文件的事件
    function itemAddEvent(item){
        tools.addEvent(item,"mouseenter",function(){
            console.log(111);
            tools.addClass(this,"file-checked");
        })
        tools.addEvent(item,"mouseleave",function(ev){
            var lable = tools.$("lable",this)[0];
            if(!tools.containClass(lable,"checked")){
                tools.removeClass(this,"file-checked");
            }
        });
        tools.addEvent(item,"click",function(ev){
            var target = ev.target;
        });
    }

    //移入到列表的div
    tools.each(listDiv,function( item ){
        itemAddEvent(item);
    })
    //给document一个mousedown，新建时候，没有命名元素移除
    tools.addEvent(document,'mousedown',function(){
        if(newStructrue && edtor && !edtor.value.trim() && create.isCreate) {
            tools.removeChild(fileList,newStructrue);
            create.isCreate = false;
        }else if(edtor && edtor.value.trim()){
            tools.show(fileTitle);
            tools.hide(edtor);
            fileTitle.innerHTML = edtor.value;
            itemAddEvent(newStructrue);
            data.files.push({
                name:edtor.value,
                id:new Date().getTime(),
                pid:pid
            });

            edtor = null;
            //渲染一下树形结构
            renderTree(pid);
        }
    });

    //全选
    var checkedAll = tools.$(".checked-all")[0];
    var allCheckbox = tools.$("lable",fileList);
    tools.addEvent(checkedAll,"click",function(){
        var isAddClassed = tools.toggleClass(this,"checked");
        tools.each(listDiv,function(item,index){
            if(isAddClassed){
                tools.addClass(item,"file-checked");
                tools.addClass(allCheckbox[index],"checked");
            }else{
                tools.removeClass(item,"file-checked");
                tools.removeClass(allCheckbox[index],"checked");
            }
        })
    });
    //只要有一个没有选中，则不选中全选
    tools.addEvent(fileList,"click",function(ev){
        var target = ev.target;
        if( target.nodeName.toLowerCase() === "lable" ){
            if(tools.toggleClass(target,"checked")){
                if(whoSelect().length == allCheckbox.length){
                    tools.addClass(checkedAll,"checked");
                }else{
                    tools.removeClass(checkedAll,"checked");
                }
            }else{
                tools.removeClass(checkedAll,"checked");
            }
        }
    });

    //点击删除
    var delects = tools.$(".delect")[0];
    tools.addEvent(delects,"click",function(){
        var select = whoSelect();
        //这个地方需要改进？？？？？？？？？？
        for( var i = 0; i < data.files.length; i++ ){
            for( var j = 0; j < select.length; j++ ){
                if( data.files[i].id == select[j].dataset.fileId ){
                    data.files.splice(i,1);
                    i--;
                }
            }
        }

        render(pid);
        renderTree(pid);
    })

    //有多少给文件被选中了
    function whoSelect(){
        var selectItem = [];
        tools.each(allCheckbox,function(item){
            if( tools.isClassName(item,"checked") ){
                selectItem.push(tools.parents(item,".file-item"));
            }
        });
        return selectItem;
    }

    //点击文件的时候
    tools.addEvent(fileList,"click",function(ev){
        var target = ev.target;
        if( target.nodeName.toLowerCase() !== "lable" ){
            target = tools.parents(target,".file-item");
            //找到当前点击的文件的id
            if(target){
                var fileId = target.dataset.fileId;
                //获取当前id渲染这个id下的子元素
                render(fileId);

            }
        }
    });

    //碰撞的元素
    var disX = 0,disY = 0;
    var newDiv = null;
    tools.addEvent(document,"mousedown",function(ev){
        //排除掉有右键和中键
        ev.preventDefault();
        if(ev.which === 3 || ev.which === 2) return;

        var target = ev.target;

        disX = ev.clientX;
        disY = ev.clientY;

        tools.addEvent(document,"mousemove",moveHandle);
        tools.addEvent(document,"mouseup",upHandle);

    });
    function upHandle(ev){
        tools.removeEvent(document,"mousemove",moveHandle);
        tools.removeEvent(document,"mouseup",upHandle);
        //移除生成的div
        if(newDiv){
            newDiv.style.width = 0 + "px";
            newDiv.style.height = 0 + "px";
            tools.hide(newDiv)
        }

    }
    function moveHandle(ev){
        var w = ev.clientX - disX;
        var h = ev.clientY - disY;

        if( listDiv.length && (whoSelect().length === listDiv.length) ){
            tools.addClass(checkedAll,"checked");
        }else{
            tools.removeClass(checkedAll,"checked");
        }

        //设置一个检测碰撞的范围
        if( Math.abs(w)>5 || Math.abs(h) > 5 ){
            if(!newDiv){
                newDiv = document.createElement("div");
                newDiv.className = "drag-div";
                newDiv.style.left = disX + "px";
                newDiv.style.top = disY + "px";
                document.body.appendChild(newDiv);
            }else{
                tools.show(newDiv)
            }

            var x = w < 0 ? ev.clientX : disX;
            var y = h < 0 ? ev.clientY : disY;

            newDiv.style.left = x + "px";
            newDiv.style.top = y + "px";

            //给newDiv设置宽高和left top
            newDiv.style.width = Math.abs(w) + "px";
            newDiv.style.height = Math.abs(h) + "px";

            //循环过程中检测所有的li
            tools.each(listDiv,function(item,index){
                //找到碰撞的li
                if( tools.collisionRect(newDiv,item) ){
                    tools.addClass(item,"file-checked");
                    tools.addClass(tools.$("lable",item)[0],"checked");
                }else{
                    tools.removeClass(tools.$("lable",item)[0],"checked");
                    tools.removeClass(item,"file-checked");
                }
            })
        }
        ev.preventDefault();
    }

}());

