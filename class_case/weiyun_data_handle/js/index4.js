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

	//获取指定id对应的树形菜单的标题
	function getTreeById(id){
		var treeTitle = treeMenu.querySelectorAll(".tree-title");
		for( var i = 0; i < treeTitle.length; i++ ){
			if( treeTitle[i].dataset.id == id ){
				return treeTitle[i];
			}
		}
	}
	//初始的时候给id为0的树形菜单标题添加class
	t.addClass(getTreeById(0),"tree-nav");

	//2. 导航区域

	var pathNav = document.querySelector(".path-nav");

	//找到指定id的所有的父级

	function createNavHtml(id){
		var parents = handle.getParentsAllById(datas,id).reverse();	
		var len = parents.length;
		//渲染下标从0到length-1
		var navHtml = '';
		for( var i = 0; i < len-1; i++ ){
			navHtml += '<a href="javascript:;" data-id="'+parents[i].id+'" style="z-index:'+(len-i)+';">'+parents[i].title+'</a>';
		}

		navHtml += '<span class="current-path" style="z-index:0;">'+parents[len-1].title+'</span>';

		return navHtml;
	}
	//渲染导航
	pathNav.innerHTML = createNavHtml(0);


	//3. 文件区域

	var fileList = document.querySelector(".file-list");

	function createFileHtml(id){
		var fileChilds = handle.getChildsById(datas,id);
		var fileHtml = '';
		fileChilds.forEach(function (value){
			fileHtml += `<div class="file-item" data-id="${value.id}">
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

		return fileHtml;
	}

	fileList.innerHTML = createFileHtml(0);


	//-------------------------添加各个区域的交互-------------------------

	//文件区域数据为空的提示
	var gEmpty = document.querySelector(".g-empty"); 

	//1. 树形菜单区域

	var currentId = 0;

	//利用事件委托。给最外层的父级添加点击处理
	t.on(treeMenu,"click",function (ev){
		//先要获取点击的元素对应的id，目的是找到对用的数据

		var target = ev.target;

		if( target = t.parent(target,".tree-title") ){
			var fileId = target.dataset.id;

			t.removeClass(getTreeById(currentId),"tree-nav");
			t.addClass(getTreeById(fileId),"tree-nav");
			//渲染导航
			pathNav.innerHTML = createNavHtml(fileId);
			//渲染文件区域
			var childs = handle.getChildsById(datas,fileId);

			if( childs.length ){
				fileList.innerHTML = createFileHtml(fileId);
				gEmpty.style.display = "none";
			}else{
				gEmpty.style.display = "block";
			}
			currentId = fileId;
		}

	});

	//2. 导航区域

	t.on(pathNav,"click",function (ev){
		var target = ev.target;

		if( target.nodeName === "A" ){
			var fileId = target.dataset.id;
			t.removeClass(getTreeById(currentId),"tree-nav");
			t.addClass(getTreeById(fileId),"tree-nav");
			//渲染导航
			pathNav.innerHTML = createNavHtml(fileId);
			//渲染文件区域

			fileList.innerHTML = createFileHtml(fileId);

			currentId = fileId;
		}
	});

	//3. 文件区域

	t.on(fileList,"click",function (ev){
		var target = ev.target;

		//如果判断出class为checkbox，那么就不能进入到下一级，而是单选
		//无论if是否成立，target都被赋值了
		if( t.parent(target,".checkbox") ){
			target = t.parent(target,".checkbox");

			//t.addClass(target,"checked");
			t.toggleClass(target,"checked");

			//有一个单选没被选中，全选就不能被选中

			var bl = Array.from(checkboxs).every(function(item){
				return t.hasClass(item,"checked");
			});
			//bl为true，说明所有的单选都被选中
			if( bl ){
				t.addClass(checkedAll,"checked");
			}else{
				t.removeClass(checkedAll,"checked");
			}



			//单选
			console.log( "单选" );
		}else if( target = t.parent(target,".file-item") ){

			var fileId = target.dataset.id;
			t.removeClass(getTreeById(currentId),"tree-nav");
			t.addClass(getTreeById(fileId),"tree-nav");
			//渲染导航
			pathNav.innerHTML = createNavHtml(fileId);
			//渲染文件区域

			fileList.innerHTML = createFileHtml(fileId);

			currentId = fileId;

		}
	})

	//-----------------------全选---------------------------------
	var checkedAll = document.querySelector(".checked-all");
	//找到所有的checkbox；
	/*var checkboxs = fileList.querySelectorAll(".checkbox");
	//找到所有的file-item
	var fileItems = fileList.querySelectorAll(".file-item");*/

	//利用获取元素的方法的动态特性，目的是再重新渲染一块元素后，变量存的是新渲染的元素

	var checkboxs = fileList.getElementsByClassName("checkbox");
	//找到所有的file-item
	var fileItems = fileList.getElementsByClassName("file-item");

	t.on(checkedAll,"click",function (){
		var bl = t.toggleClass(this,"checked");	

		Array.from(checkboxs).forEach(function (item,index){
			if( bl ){
				t.addClass(item,"checked");	
				t.addClass(fileItems[index],"file-checked");
			}else{
				t.removeClass(item,"checked");	
				t.removeClass(fileItems[index],"file-checked");
			}
			
		})

		/*if( bl ){
			Array.from(checkboxs).forEach(function (item,index){
				t.addClass(item,"checked");	
				t.addClass(fileItems[index],"file-checked");
			})
		}else{
			Array.from(checkboxs).forEach(function (item,index){
				t.removeClass(item,"checked");	
				t.removeClass(fileItems[index],"file-checked");
			})
		}*/
	})

	//------------鼠标移入到文件区域，每一文件的时候----------------

	t.on(fileList,"mouseover",function (ev){
		var target = ev.target;
		if( target = t.parent(target,".file-item") ){
			t.addClass(target,"file-checked");
		}
	});
	t.on(fileList,"mouseout",function (ev){

		//移开的时候 class为checbox的元素如果有class为checked，
		//file-item 的class就不应该remove

		var target = ev.target;
		if( target = t.parent(target,".file-item") ){
			//移开的时候，从target中找到checkbox
			var checkbox = target.querySelector(".checkbox");
			if( !t.hasClass(checkbox,"checked") ){
				t.removeClass(target,"file-checked");
			}
			
		}
	})
})()