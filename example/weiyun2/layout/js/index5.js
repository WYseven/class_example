/**
 * Created by seven on 2016/7/6.
 */

(function(){
    //要生成的结构
    /*
     *
     * */
     tools.$(".weiyun-content")[0].style.height = document.documentElement.clientHeight-55 + "px";
     tools.addEvent(window,"resize",function (){
        tools.$(".weiyun-content")[0].style.height = document.documentElement.clientHeight-55 + "px";      
     })
    

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
    //初始化一下导航
    renderNav(pathNav,0)
    function renderNav(pathNav,id){
        var parents = getParents(data.files,id).reverse();
        var str = '';
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
        postionLevel(treeDiv,id);
    }
    //让第一个为选中状态
    renderTree(0)


    //选中那一层
    //通过id直接定位到那一层上
    var prev = 0;
    function postionLevel(treeDiv,id){
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
    tools.addEvent(treeMenu,"mousedown",function(ev){
        ev.stopPropagation();
    })


    function render(fileId){
        pid = fileId;
        renderHtml(fileId);
        renderNav(pathNav,fileId);
        positionTree(treeDiv,fileId);
    }
    //定位在具体的一个标题上
    function positionTree(treeDiv,fileId){
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
        postionLevel(treeDiv,fileId);
    }

    //移动文件
    var moveFile = tools.$(".move")[0];
    var moveId = "";
    tools.addEvent(moveFile,"click",function (){
        movefileHandle();
    });

    function movefileHandle(){
        var select = whoSelect();
        if( select.length === 0 ){
            fullTip("warn","请选择文件");
            return;
        }
        var popup = new PopUp();
        var newDiv = document.createElement("div");
        newDiv.className = "tree-menu dialog-tree-menu";
        newDiv.appendChild(treeHtml(-1));
        
         popup.open({
            content:newDiv
         });
         //找到弹框中div
         var treeDiv = tools.$("div",treeMenu);
         var dialogTreeDiv = tools.$("div",tools.$(".dialog-tree-menu")[0]);
         //定位在具体的元素上
         positionTree(dialogTreeDiv,0)
         dialogTreeEvents();
         
         popup.onconfirm = function(){
            //点击确定时执行。
            var error = tools.$(".error")[0];
            if( !error.innerHTML ){  //要关闭，改变pid 重新渲染

                var select = whoSelect();
                var movePidChilds = getChildById(data.files,moveId);  
                //找到要移动的id的所有的字数据，目的在于移动的时候判断一下，要移动的数据名字是否已经存在
                console.log( movePidChilds );
                a:for( var i = 0; i < select.length; i++ ){
                    var arr = getChilds(data.files,select[i].dataset.fileId,true);
                    
                    var fileTitle = tools.$(".file-title",select[i])[0];
                    for( var j = 0; j < movePidChilds.length; j++ ){
                        if( fileTitle.innerHTML == movePidChilds[j].name ){
                            fullTip("warn","部分文件移动失败：文件名重复");
                            continue a;
                        }
                    }

                    arr[0].pid = moveId;

                }
                render(pid);
                renderTree(pid)
            }


            return !error.innerHTML;
        };
    }

    function dialogTreeEvents(){
        var select = whoSelect();  //那些事被选中的

        var dialogTreeMenu = tools.$(".dialog-tree-menu")[0]
        //弹框中的菜单
        var prevDiv = tools.$("div",tools.$(".dialog-tree-menu")[0])[0];
        //获取错误提示
        var error = tools.$(".error")[0];

        tools.addEvent(dialogTreeMenu,"click",function(ev){
            var target = ev.target;
            if(target = tools.parents(target,".tree_title")){
                tools.removeClass(prevDiv,"tree-contro");
                tools.removeClass(prevDiv,"tree-nav");
                tools.addClass(target,"tree-contro");
                tools.addClass(target,"tree-nav");
                if(target.nextElementSibling && target.nextElementSibling.style.display == "block"){
                    target.nextElementSibling.style.display = "none";
                }else{
                    target.nextElementSibling ? target.nextElementSibling.style.display = "block" : "";
                }
                prevDiv = target;

                

            }
            var fileId = target.dataset.fileId;
            var curDir = tools.$(".cur-dir")[0]; 
            var parents = getParents(data.files,fileId).reverse();
            var str = '<span>移动到：</span>';
            tools.each(parents,function(item){
                str += '<span>'+item.name+'</span>/';
            });
            curDir.innerHTML = str;
            //错误的提示
            error.innerHTML = "";
            var arr = [];
            for( var i = 0; i < select.length; i++ ){
                arr = arr.concat(getChilds(data.files,select[i].dataset.fileId,true))
            }
            for( var i = 0; i < arr.length; i++ ){
                if( fileId == arr[i].id ){
                    error.innerHTML = "不能将文件移动到自身或其子文件夹下";
                    break;
                }
            }
            //提示当前文件夹下已有
            if (select[0]) {  //存在的才能移动
                var parent =  getParent(data.files,select[0].dataset.fileId);
                if( parent.id == fileId ){
                    error.innerHTML  = "文件已经在该文件夹下了";
                }
            }
            moveId = fileId;

        })
        tools.addEvent(dialogTreeMenu,"mousedown",function(ev){
            ev.stopPropagation();
        })
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

    var fileEdtor = null;
    //点击新建按钮，生成新的结构
    tools.addEvent(create,"mouseup",function(){
        //给一个状态，判断元素是否插入到了列表中

        //要么从数据中查找这个pid下是否有子元素，要么找是否存在文件
        var childs = getChildById(data.files,pid);
        if( childs.length === 0 ){
            fileList.innerHTML = "";
        }
        newStructrue = createStructrue()
        tools.insertFirst( fileList,newStructrue );

        //是否有子元素
        

        //获取新生成元素中的input
        edtor = tools.$(".edtor",newStructrue)[0];
        fileTitle = tools.$(".file-title",newStructrue)[0];
        fileEdtor = tools.$(".file-edtor",newStructrue)[0];
        edtor.select();
    });
    //操作每一个文件文件的事件
    function itemAddEvent(item){
        tools.addEvent(item,"mouseenter",function(){
            if( !isDrag ){ //正在拖拽，鼠标移入无效
                tools.addClass(this,"file-checked");
            }
        })
        tools.addEvent(item,"mouseleave",function(ev){
            var lable = tools.$("lable",this)[0];
            if(!tools.containClass(lable,"checked")){
                tools.removeClass(this,"file-checked");
            }
        });
    }
    //标签提示
    var fullTipBox = tools.$(".full-tip-box")[0];
    var fullTipBox_text = tools.$(".text",fullTipBox)[0];
    //标签提示函数
    function fullTip(classNames,title){
        fullTipBox.style.transition = "none";
        fullTipBox.style.top = "-32px";
        setTimeout(function (){
            fullTipBox.className = "full-tip-box";
            tools.addClass(fullTipBox,classNames);
            fullTipBox.style.top = "0px";
            fullTipBox.style.transition = ".3s";
            fullTipBox_text.innerHTML = title;
        },0)
        clearTimeout(fullTipBox.timer);
        fullTipBox.timer = setTimeout(function (){
             fullTipBox.style.top = "-32px";   
        },2000)
    }

    //给document一个mousedown，新建时候，没有命名元素移除
    tools.addEvent(document,'mousedown',function(){
        handleCreateFile();
    });
    //创建文件夹的时候
    function handleCreateFile(){
        if(newStructrue && edtor && !edtor.value.trim()) {
            tools.removeChild(fileList,newStructrue);
            var childs = getChildById(data.files,pid);
            if( childs.length === 0 ){
                fileList.innerHTML = "暂无数据";
            }
        }else if(edtor && edtor.value.trim()){
            //如果数据中已经有这个名字了，就不用重复添加你，并且提醒
            if( isNameExsit(data.files,pid,edtor.value) ){
                tools.removeChild(fileList,newStructrue);
                fullTip("err","文件夹名有冲突，请重新命名");
                
            }else{

                tools.show(fileTitle);
                tools.hide(fileEdtor);
                fileTitle.innerHTML = edtor.value;
                itemAddEvent(newStructrue);

                //给定数据，重新渲染
                data.files.unshift({
                    name:edtor.value,
                    id:new Date().getTime(),
                    pid:pid
                });
                //渲染一下树形结构
                render(pid);
                renderTree(pid);
                //创建成功要有提示
                fullTip("ok","新建文件夹成功");
            }
        }

        edtor = null;
        newStructrue = null;
    }

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
    tools.addEvent(checkedAll,"mousedown",function(ev){
        ev.stopPropagation();
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

    //取消掉默认行为，防止冒泡到document的down
    var navCollects = tools.$(".navCollects")[0];
    tools.addEvent(navCollects,"mousedown",function (ev){
        handleCreateFile();
        ev.stopPropagation();   
    })

    //点击删除
    var delects = tools.$(".delect")[0];
    tools.addEvent(delects,"click",delectHandle);

    //删除疯转的函数
    function delectHandle(){
        var select = whoSelect();
        if( select.length < 1 ){  //说明没有选中
            fullTip("warn","请选择文件");
        }else{
            //这个删除需要改进？？？？？？？
            var arr = [];
            for( var j = 0; j < select.length; j++ ){
                arr.push( select[j].dataset.fileId );
                var datas = getChilds(data.files,select[j].dataset.fileId,true);
                data.files = delectDataByData(data.files,datas);
            }

            //这个地方需要改进
           
            render(pid);
            renderTree(pid);
            fullTip("ok","删除文件成功");
        }     
    }
    //重命名
    var rename = tools.$(".rename")[0];
    var titleIng = null;
    var fileEdtor = null;
    var edtorInput = null;
    var reNameSelect = null;
    tools.addEvent(rename,"click",function(){
        renameHandle();
           
    })
    function renameHandle(){
        var select = whoSelect();
        if( select.length > 1 ){  //说明没有选中
            fullTip("warn","只能对单个文件重命名");
        }else if(select.length == 0){
            fullTip("warn","请选择文件");
        }else{
            titleIng = tools.$(".file-title",select[0])[0];
            fileEdtor = tools.$(".file-edtor",select[0])[0];
            edtorInput = tools.$(".edtor",select[0])[0];

            tools.hide(titleIng);
            tools.show(fileEdtor);
            edtorInput.value = titleIng.innerHTML;
            edtorInput.select();

            rename.fileId = select[0].dataset.fileId;
            console.log( rename.fileId );
            reNameSelect = select[0];
            
        }
    }
    //在document上dowm，配合rename
    tools.addEvent(document,'mousedown',function(){
        //如果有修改的内容
        if(titleIng && fileEdtor){
            tools.hide(fileEdtor);
            tools.show(titleIng);
            //如果名字已经存在，要提醒
            if( isNameExsit(data.files,pid,edtorInput.value) ){
                fullTip("err","文件夹名有冲突，请重新命名");
            }else{

                //如果修改的内容和原来的内容不相同，则修改数据，并重新渲染
                if(titleIng.innerHTML !== edtorInput.value){
                    titleIng.innerHTML = edtorInput.value;
                    changeNameById(data.files,rename.fileId,edtorInput.value);
                    //重新渲染
                    render(pid);
                    renderTree(pid);
                    fullTip("ok","更名成功");
                }
            }
            

            titleIng = fileEdtor = null;
        }
    })

    //down下去document，选中的文件全部消失
    tools.addEvent(document,'mousedown',function(ev){
        if( ev.which == 3 || ev.which == 2 ) return;
        var target = ev.target;
        if( !tools.parents(target,".file-item") ){
            var select = whoSelect();
            for( var i = 0; i < select.length; i++ ){
                tools.removeClass(select[i],"file-checked");
                tools.removeClass(tools.$("lable",select[i])[0],"checked");
            }
            tools.removeClass(checkedAll,"checked");
        }

        contentMenu.style.display = "none";
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
            tools.removeClass(checkedAll,"checked");
            //找到当前点击的文件的id
            if(target){
                var fileId = target.dataset.fileId;
                //获取当前id渲染这个id下的子元素
                render(fileId);

            }
        }else{
        }
    });

    //右击菜单
    var contentMenu = tools.$(".content-menu")[0];
    tools.addEvent(document,"contextmenu",function (ev){
        var target = ev.target;
        var x = ev.clientX,y = ev.clientY;
        contentMenu.style.display = "none";
       if( target = tools.parents(target,".file-item") ){

            contentMenu.style.display = "block";
            contentMenu.style.left = x + "px";
            contentMenu.style.top = y + "px";
            var select = whoSelect();
            if( select.length <=1 ){
                //其他的元素样式都要去掉
                
                for( var j = 0; j < select.length; j++ ){
                    var selectLable = tools.$("lable",select[j])[0];
                    tools.removeClass(selectLable,"checked");
                    tools.removeClass(select[j],"file-checked");
                }
                var lable = tools.$("lable",target)[0];
                tools.addClass(lable,"checked");
                tools.addClass(target,"file-checked");
                tools.removeClass(target,"file-bg");
            }
       }


        ev.preventDefault();    
    });

    //给右击的菜单添加上事件

    tools.addEvent(contentMenu,"click",function (ev){
        var target = ev.target;
        if( target = tools.parents(target,".menu_li") ){
            if( tools.containClass(target,"delect") ){
                delectHandle();
            }else if( tools.containClass(target,"move") ){
                 movefileHandle();
            }else if( tools.containClass(target,"rename") ){
                renameHandle();
            }
        }

        this.style.display = "none";
    })
    tools.addEvent(contentMenu,"mousedown",function (ev){
       ev.stopPropagation();
    })

    //碰撞的元素
    var disX = 0,disY = 0;
    var newDiv = null;
    var moveFileTip = null;
    var targetFile = null;
    var isDrag = false;
    var pengItem = null;
    tools.addEvent(document,"mousedown",function(ev){
        //排除掉有右键和中键
        ev.preventDefault();
        if(ev.which === 3 || ev.which === 2) return;

        var target = ev.target;

        disX = ev.clientX;
        disY = ev.clientY;

        var target = ev.target;
        //在file上不能拖拽
        if(targetFile = tools.parents(target,".file-item") ){

            tools.addEvent(document,"mousemove",movefiles);
            tools.addEvent(document,"mouseup",upFiles);

            return;
        }

        tools.addEvent(document,"mousemove",moveHandle);
        tools.addEvent(document,"mouseup",upHandle);

    });

    //移动文件操作
    function movefiles(ev){
        if( !moveFileTip ){
            moveFileTip = document.createElement("div");
            moveFileTip.className = "move-file-tip";
            document.body.appendChild(moveFileTip);

        }
        isDrag = true;

        var x = ev.clientX;
        var y = ev.clientY;

        if( Math.abs(x - disX)>5 || Math.abs(y - disY)>5 ){

            moveFileTip.style.left = x + "px";
            moveFileTip.style.top = y + "px";
            
            //是否包含class
            if( !tools.containClass(targetFile,"file-checked") ){
                //其他的元素样式都要去掉
                var select = whoSelect();
                for( var j = 0; j < select.length; j++ ){
                    var selectLable = tools.$("lable",select[j])[0];
                    tools.removeClass(selectLable,"checked");
                    tools.removeClass(select[j],"file-checked");
                }


                var lable = tools.$("lable",targetFile)[0];
                tools.addClass(lable,"checked");
                tools.addClass(targetFile,"file-checked");
                tools.removeClass(targetFile,"file-bg");
            }
            pengItem = null;
            //跟所有的元素检测碰撞
            tools.each(listDiv,function(item,index){
                //找到碰撞的li
                var selectLable = tools.$("lable",item)[0];
                if(tools.collisionRect(moveFileTip,item) && !tools.containClass(selectLable,"checked") ){
                    tools.addClass(item,"file-bg");
                    pengItem = item;
                }else{
                    if( targetFile != item ){
                        tools.removeClass(item,"file-bg");
                    }
                }
            })
        }
        

    }
    function upFiles(ev){
        tools.removeEvent(document,"mousemove",movefiles);
        tools.removeEvent(document,"mouseup",upFiles); 
        isDrag = false;  
        var select = whoSelect();
        if( pengItem ){

            var pengItemFileId = pengItem.dataset.fileId;
            for( var j = 0; j < select.length; j++ ){
                var fileId = select[j].dataset.fileId;
                for( var i = 0; i < data.files.length; i++ ){
                    if( data.files[i].id == fileId ){
                        data.files[i].pid = pengItemFileId;
                        break;
                    }
                }
            }

            render(pid);
            renderTree(pid);
            fullTip("ok","文件移动成功");

            pengItem = null;
            
        }
        moveFileTip && document.body.removeChild(moveFileTip);
        moveFileTip = null;
    }

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
        ev.preventDefault();
    }

}());

