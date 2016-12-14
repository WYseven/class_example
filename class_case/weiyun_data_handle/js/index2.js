(function (){
	//让weiyun-content自适应
	var weiyunContent = document.querySelector(".weiyun-content");
	var header = document.querySelector(".header");
	function resize(){
		var clientH = t.view().h;
		weiyunContent.style.height = clientH - header.offsetHeight + "px";
	}
	window.onresize = resize;
	resize();

	//---------------------------渲染各个区域---------------------------
	//准备数据
	var datas = data.files;

	//1. 菜单区域
	var treeMenu = document.querySelector(".tree-menu");

		function createTreeHtml(id){
			//先找指定id的子数据
			var childs = handle.getChildsById(datas,id);

			var html = "<ul>";

			childs.forEach(function (value){
				//找到当前数据层级
				var level = handle.getParentsAllById(datas,value.id).length;
				//获取这条数据的子数据，目的是用来判断是否要添加带图标的class
				var childs2 = handle.getChildsById(datas,value.id);

				var className = childs2.length ? "tree-contro" : "tree-contro-none";

				html += '<li>'+
                        '<div style="padding-left:'+level*14+'px;" class="tree-title '+className+'" data-id="'+value.id+'">'+
                            '<span>'+
                                '<strong class="ellipsis">'+value.title+'</strong>'+
                                '<i class="ico"></i>'+
                            '</span>'+
                        '</div>';

                        html += createTreeHtml(value.id);	
                        html += '</li>';	
			})

			html += "</ul>";

			return html;

		}

		treeMenu.innerHTML = createTreeHtml(-1);

		//获取到属性菜单下所有的标题
		var treeTitle = treeMenu.querySelectorAll(".tree-title");
		for( var i = 0; i < treeTitle.length; i++ ){
			if( treeTitle[i].dataset.id == 0 ){
				t.addClass(treeTitle[i],"tree-nav");
			}
		}

	//2. 导航区域

	var pathNav = document.querySelector(".path-nav");

	//找到指定id的所有的父级
	var parents = handle.getParentsAllById(datas,0).reverse();

	var len = parents.length;

	//渲染下标从0到length-1
	var navHtml = '';
	for( var i = 0; i < len-1; i++ ){
		navHtml += '<a href="javascript:;" style="z-index:'+(len-i)+';">'+parents[i].title+'</a>';
	}

	navHtml += '<span class="current-path" style="z-index:0;">'+parents[len-1].title+'</span>';

	pathNav.innerHTML = navHtml;


	//3. 文件区域

	var fileList = document.querySelector(".file-list");

	var fileChilds = handle.getChildsById(datas,0);
	var fileHtml = '';
	fileChilds.forEach(function (value){
		fileHtml += `<div class="file-item">
                         <div class="item">
                             <lable class="checkbox"></lable>
                                 <div class="file-img">
                                 <i></i>
                                 </div>
                             <p class="file-title-box">
                                 <span class="file-title">${value.title}</span>
                                 <span class="file-edtor">
                                     <input class="edtor" type="text">
                                 </span>
                             </p>
                         </div> 
                     </div>`;
	});

	fileList.innerHTML = fileHtml;


	//-------------------------添加各个区域的交互-------------------------

	//1. 树形菜单区域

	var currentId = 0;

	//利用事件委托。给最外层的父级添加点击处理
	t.on(treeMenu,"click",function (ev){
		//先要获取点击的元素对应的id，目的是找到对用的数据

		var target = ev.target;

		if( target = t.parent(target,".tree-title") ){
			var fileId = target.dataset.id;

			t.addClass(target,"tree-nav");
			t.addClass(target,"tree-nav");

		}

	})


		
})()