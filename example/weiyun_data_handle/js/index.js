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

    function getChildsById(data,id){
        return data.filter(function(item){
            return item.pid == id;
        })
    }

    function getDataLeval(data,id){
        var arr = [];
        data.forEach(function(item){
            if( item.id == id ){
                arr.push(item);

                arr = arr.concat(getDataLeval(data,item.pid));
            }
        })

        return arr;
    }


    var initId = -1;

    function treeHtml(id){
        var childs = getChildsById(datas,id);

        var html = '<ul>';

        childs.forEach(function(item){

            var leave = getDataLeval(datas,item.id).length;

            /*tree-nav*/

            html += '<li>'+
                            '<div data-id="'+item.id+'" style="padding-left: '+leave*14+'px" class="tree-contro">'+
                                '<span>'+
                                    '<strong class="ellipsis">'+item.name+'</strong>'+
                                    '<i class="ico"></i>'+
                                '</span>'+
                            '</div>';
                html += treeHtml(item.id);
                html += '</li>';

        });

        html += '</ul>';

        return html;

    }

    var  treeMenu = document.querySelector(".tree-menu");

    treeMenu.innerHTML = treeHtml(-1);

    //var allDiv = treeMenu.querySelector('.tree-contro[data-id="'+700+'"]');

    //allDiv.className = 'tree-nav';

    var allDiv = treeMenu.querySelectorAll('.tree-contro');

    function treeControDiv(id){


        var div = Array.from(allDiv).filter(function(item){
            return item.dataset.id == id
        })

        return div[0];
    }


    var init = 0;

    treeControDiv(init).className = 'tree-nav';


    Array.from(allDiv).forEach(function(item,index){
        item.onclick  =function(){
            var id = this.dataset.id;

            treeControDiv(init).className = '';

            treeControDiv(id).className = 'tree-nav';

            init = id;
        }
    });

    var pathNav = document.querySelector(".path-nav");



    pathNav.innerHTML = getDataLeval(datas,700).map(function(item){
        return item.name;
    }).reverse();




})()

