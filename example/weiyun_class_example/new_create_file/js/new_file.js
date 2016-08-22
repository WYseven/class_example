window.onload = function(){
    //要准备的数据
    var datas = data.files;

    //渲染文件区域
    var renderId = 0;  //默认一上就要渲染这个id下的所有的子数据

    //文件区域的容器
    var fileList = tools.$(".file-list")[0];  

    var getPidInput = tools.$("#getPidInput");

    //渲染指定id下所有子数据构成的html结构
    fileList.innerHTML = createFilesHtml(datas,0);

    //利用事件委托，点击每一个文件夹
    /*tools.addEvent(fileList,"click",function(ev){
        var target = ev.target;
        if( tools.parents(target,".item") ){
            target = tools.parents(target,".item");
            //找到文件的id
            var fileId = target.dataset.fileId;

            renderNavFilesTree(fileId);

        }
    })*/


    //通过指定的id渲染文件区域，文件导航区域，树形菜单
    function renderNavFilesTree(fileId){
        //渲染文件导航
           

            //如果指定的id没有子数据，需要提醒
            var hasChild =dataControl.hasChilds(datas,fileId);

            if( hasChild ){  //如果有子数据，就渲染出子数据的结构
                //找到当前这个id下所有的子数据，渲染在文件区域中
                empty.style.display = "none";
                fileList.innerHTML = createFilesHtml(datas,fileId);
            }else{
                empty.style.display = "block";
                //清空掉fileList里面的内容
                fileList.innerHTML = "";
            }

            

            tools.removeClass(checkedAll,"checked");
    }


    //找到文件区域下所有的文件
    var fileItem = tools.$(".file-item",fileList);
    var checkboxs = tools.$(".checkbox",fileList);

    tools.each(fileItem,function(item,index){
        fileHandle(item);
    })

    var getPidInput = tools.$("#getPidInput");

    //给单独一个文件添加事件处理
    function fileHandle(item){
        
        //给每一个文件绑定鼠标移入移出事件
        var checkbox = tools.$(".checkbox",item)[0];

        tools.addEvent(item,"mouseenter",function(){
            tools.addClass(this,"file-checked");
        });

        tools.addEvent(item,"mouseleave",function(){
            if( !tools.hasClass(checkbox,"checked") ){
                tools.removeClass(this,"file-checked");
            }
            
        });

        //给checkbox添加点击处理

        tools.addEvent(checkbox,"click",function(ev){
            var isaddClass = tools.toggleClass(this,"checked");

            if( isaddClass ){
                //判断一下是否所有的checkbox是都都勾选了


                if( whoSelect().length == checkboxs.length ){
                    tools.addClass(checkedAll,"checked");
                }

            }else{
                //只要当前这个checkbox没有被勾选，那么肯定全选按钮就没有class为checked
                tools.removeClass(checkedAll,"checked");
            }

            //阻止冒泡，目的：防止触发fileList上的点击
            ev.stopPropagation();
        })  
    }

    //获取到全选按钮
    var checkedAll = tools.$(".checked-all")[0];

    tools.addEvent(checkedAll,"click",function(){
        /*
            toggleClass的返回值是一个布尔值
                true 有添加class
                flase 没有添加的class
        */
        var isAddClass = tools.toggleClass(this,"checked"); 

        if( isAddClass ) {
            tools.each(fileItem,function(item,index){
                tools.addClass(item,"file-checked");
                //找到每个文件下对应checkbox
                tools.addClass(checkboxs[index],"checked");
            })
        }else{
            tools.each(fileItem,function(item,index){
                tools.removeClass(item,"file-checked");
                tools.removeClass(checkboxs[index],"checked");
            })
        }
    });

    //作用：找到所有checkbox勾选的文件
    function whoSelect(){
        var arr = [];
        //找一下checkbox如果有class为checked，那么就放在数组中
        tools.each(checkboxs,function (checkbox,index){
            if( tools.hasClass(checkbox,"checked") ){
                arr.push(fileItem[index]);
            }
        });

        return arr; 
    }


    //新建文件的功能
    var create = tools.$(".create")[0];

    var empty = tools.$(".g-empty")[0];  //没有文件提醒的结构

    tools.addEvent(create,"mouseup",function(){

        //需要把为空的提示给隐藏起来
        empty.style.display = "none";

        var newElement = createFileElement({
            title:"",
            id : new Date().getTime()
        });
        fileList.insertBefore(newElement,fileList.firstElementChild);

        //获取标题
        var fileTitle = tools.$(".file-title",newElement)[0];
        var fileEdtor = tools.$(".file-edtor",newElement)[0];

        var edtor = tools.$(".edtor",newElement)[0];

        fileTitle.style.display = "none";
        fileEdtor.style.display = "block";

        edtor.select();  //自动获取光标

        create.isCreateFile = true;  //添加一个状态，表示正在创建文件

    })

    //给document绑定一个mousedown，为了创建文件夹

    tools.addEvent(document,"mousedown",downFn);

    tools.addEvent(document,"keydown",function (ev){
        if( ev.keyCode === 13 ){
           downFn();
        }   
    })

    function downFn(){
        //判断一下新创建的元素中的输入框是否有内容，如果有内容就创建，没有内容就removeChild

        if( create.isCreateFile ){  //如果为true，说明正在创建文件
            var firstElement = fileList.firstElementChild;
            var edtor = tools.$(".edtor",firstElement)[0];
            var value = edtor.value.trim();

            if( value === "" ){
                fileList.removeChild(firstElement);

                //要看一下filelist里面是都有内容
                if( fileList.innerHTML === "" ){
                    empty.style.display = "block";
                }

            }else{
                var fileTitle = tools.$(".file-title",firstElement)[0];
                var fileEdtor = tools.$(".file-edtor",firstElement)[0];
                fileTitle.style.display = "block";
                fileEdtor.style.display = "none";

                fileTitle.innerHTML = value;

                //给新创建的文件添加事件处理
                fileHandle(firstElement);

                //1. 当前创建文件的title
                //在哪一个文件创建的，需要知道父id
                var pid = getPidInput.value;

                //当前这个元素的id
                var fileId = tools.$(".item",firstElement)[0].dataset.fileId;

                //把新创建的元素的结构，放在数据中
                var newFileData = {
                    id:fileId,
                    pid:pid,
                    title:value,
                    type:"file"
                }

                //放在数据中
                datas.unshift(newFileData);

                
            }


            create.isCreateFile = false;  //无论创建成不成功，状态都要设为false
        }

    }
};