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

		treeMenu.innerHTML = createTreeHtml(datas,-1);

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

	
	//渲染导航
	pathNav.innerHTML = createNavHtml(datas,0);

	//3. 文件区域

	var fileList = document.querySelector(".file-list");

	fileList.innerHTML = createFileHtml(datas,0);

	//------------------------渲染页面使用的公共方法-----------------------------

	function render(fileId){
		t.removeClass(getTreeById(currentId),"tree-nav");
		t.addClass(getTreeById(fileId),"tree-nav");
		//渲染导航
		pathNav.innerHTML = createNavHtml(datas,fileId);
		//渲染文件区域
		var childs = handle.getChildsById(datas,fileId);

		if( childs.length ){
			fileList.innerHTML = createFileHtml(datas,fileId);
			gEmpty.style.display = "none";
		}else{
			gEmpty.style.display = "block";
		}
		currentId = fileId;

		//全选不被勾选
		t.removeClass(checkedAll,"checked");
	}

	//-------------------------添加各个区域的交互-------------------------

	//文件区域数据为空的提示
	var gEmpty = document.querySelector(".g-empty"); 

	//1. 树形菜单区域

	var currentId = 0;  //存的就是当前操作的数据的id

	//利用事件委托。给最外层的父级添加点击处理
	t.on(treeMenu,"click",function (ev){
		//先要获取点击的元素对应的id，目的是找到对用的数据

		var target = ev.target;

		if( target = t.parent(target,".tree-title") ){
			var fileId = target.dataset.id;
			render(fileId)
			
		}

	});

	//2. 导航区域

	t.on(pathNav,"click",function (ev){
		var target = ev.target;

		if( target.nodeName === "A" ){
			var fileId = target.dataset.id;
			render(fileId);
		}
	});

	//3. 文件区域
	//做单选的
	t.on(fileList,"click",function (ev){
		var target = ev.target;
		//如果判断出class为checkbox，那么就不能进入到下一级，而是单选
		//无论if是否成立，target都被赋值了

		if( t.parent(target,".checkbox") ){
			target = t.parent(target,".checkbox");
			t.toggleClass(target,"checked");
			//有一个单选没被选中，全选就不能被选中
			var bl = Array.from(checkboxs).every(function(item){
				return t.hasClass(item,"checked");
			});
			//bl为true，说明所有的单选都被选中

			//找到checbox的祖先节点为file-item，目的是找到id

			var parent = t.parent(target,".file-item");
			var fileId = parent.dataset.id;

			handle.getSelfById(datas,fileId).isChecked = t.hasClass(target,"checked");

			console.log( handle.getSelfById(datas,fileId) );



			if( bl ){
				t.addClass(checkedAll,"checked");

			}else{
				t.removeClass(checkedAll,"checked");
			}
		}
	})
	//进入下一级
	t.on(fileList,"click",function (ev){
		var target = ev.target;

		if( t.parent(target,".checkbox") ){
			return;
		}

		if( target = t.parent(target,".file-item") ){
			var fileId = target.dataset.id;
			render(fileId);

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

	//全选
	t.on(checkedAll,"click",function (){

		//判断当前这个有没有子数据

		var childs = handle.getChildsById(datas,currentId);

		if( !childs.length ) return;


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

	//---------------------新建文件夹-----------------------

	var create = document.querySelector(".create");

	//新建文件夹
	t.on(create,"mouseup",function (){
		//1. 通过添加数据，在文件区域中重新渲染

		//需要添加一个文件的数据 {}

		datas.unshift({
			id:Math.random(),
			pid:currentId,
			title:"",
			type:"file"
		});

		gEmpty.style.display = 'none';

		fileList.innerHTML = createFileHtml(datas,currentId);

		//给isChcked为true的添加class

		for( var i = 0; i < fileItems.length; i++ ){
			console.log( fileItems[i].dataset.checked );
			if( fileItems[i].dataset.checked === "true" ){
				t.addClass(fileItems[i],"file-checked");
			}
		}


		//获取到第一个元素
		var firstElement = fileList.firstElementChild;
		var fileTitle = firstElement.querySelector(".file-title");
		var fileEdtor = firstElement.querySelector(".file-edtor");

		var edtor = firstElement.querySelector(".edtor");

		fileTitle.style.display = 'none';
		fileEdtor.style.display = 'block';

		edtor.focus();


		//2. 直接添加结构	
	})



})()