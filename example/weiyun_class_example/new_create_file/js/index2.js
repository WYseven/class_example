/**
 * Created by seven on 2016/7/6.
 */

(function(){

    function createStructrue(){
        var newDiv = document.createElement("div");
        newDiv.className = 'file-item';
        var str = `
                <div class="item">
                    <lable class="checkbox"></lable>
                    <div class="file-img">
                        <i></i>
                    </div>
                    <p class="file-title-box">
                        <span class="file-title" style="display: none;"></span>
                        <span class="file-edtor" style="display: block;">
                            <input class="edtor" type="text"/>
                        </span>
                    </p>
                </div>
            `;
        newDiv.innerHTML = str;
        return newDiv;
    }

    var create = tools.$(".create")[0];  //新建按钮
    var fileList = tools.$(".file-list")[0]; //存放文件的列表
    var listDiv = tools.$(".file-item",fileList);  //获取到所有的文件列表

    //存储新建的元素
    var newStructrue = null;
    var edtor = null;
    var fileTitle = null;

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


}());

