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

		//有子数据
		if( childs.length ){
			gEmpty.style.display = "none";
		}else{
			gEmpty.style.display = "block";
		}
		fileList.innerHTML = createFileHtml(datas,fileId);

		currentId = fileId;

		//全选不被勾选
		t.removeClass(checkedAll,"checked");
	}

	//---------------------提醒----------------------
	var fullTipBox = document.querySelector(".full-tip-box");
	var text = fullTipBox.querySelector(".text");

	function fullTip(className,message){

		//先拉倒-32 在过渡到0
		fullTipBox.style.transition = "none";
		fullTipBox.style.top = "-32px";
		fullTipBox.className = 'full-tip-box';

		setTimeout(function (){
			t.addClass(fullTipBox,className);
			fullTipBox.style.transition = ".3s";
			fullTipBox.style.top = "0";	
		},0)

		text.innerHTML = message;

		//延时上去的定时器只能有一个
		clearTimeout(fullTipBox.timer);
		fullTipBox.timer = setTimeout(function (){
			fullTipBox.style.top = "-32px";

		},2000)	
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

		//点击文件区域，如果点击在单选和编辑的input上，不重新渲染
		if( t.parent(target,".checkbox") ||  t.parent(target,".edtor")){
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
	//组织冒泡
	t.on(fileList,"mousedown",function (ev){
		if( t.parent(ev.target,".edtor") ){
			ev.stopPropagation();
		}
		
	})

	//---------------------新建文件夹-----------------------

	var create = document.querySelector(".create");

	//新建文件夹
	t.on(create,"mouseup",function (){
		//1. 通过添加数据，在文件区域中重新渲染
		//2. 直接添加结构



		var firstElement = fileList.firstElementChild;
		var newFile = createFileElement(); //新文件
		if( firstElement ){
			fileList.insertBefore(newFile,firstElement);
		}else{
			fileList.appendChild(newFile);
		}

		gEmpty.style.display = "none";
		

		var fileTitle = newFile.querySelector(".file-title");
		var fileEdtor = newFile.querySelector(".file-edtor");
		var edtor = newFile.querySelector(".edtor");

		fileTitle.style.display = "none";
		fileEdtor.style.display = "block";

		edtor.focus();

		create.isCreate = true;  //新建的状态

		//使用失去焦点方式做也可以，不推崇使用，一个事件套在了另一事件中
		//使用了，最好把事件解绑

		/*t.on(edtor,"blur",function fn(){
			

			t.off(edtor,"blur",fn)	
		})
		edtor.onblur = function (){
			//alert(1);
			//新建成功
			fileTitle.style.display = "block";
			fileEdtor.style.display = "none";

			fileTitle.innerHTML = edtor.value;

			edtor.onblur = null;
		};*/
	})

	//keyup的时候也可以创建成功

	t.on(document,"keyup",function (ev){
		if( ev.keyCode === 13 ){
			createFile();
		}
	})

	//给document绑定mousedown,目的是判断是否新建成功
	//为新建服务的
	t.on(document,"mousedown",createFile);

	function createFile(){

		//如果不是新建状态，不在继续执行
		if( !create.isCreate ) return;
		
		//先要找到新建的第一个元素
		var firstElement = fileList.firstElementChild;
		var fileTitle = firstElement.querySelector(".file-title");
		var fileEdtor = firstElement.querySelector(".file-edtor");
		var edtor = firstElement.querySelector(".edtor");

		//通过value值判断是否要新建
		var value = edtor.value.trim();

		if( value ){  //新建

			//不能有重名的项 提醒

			//判断新建的文件的名字在同级是否存在

			var isExist = handle.isTitleExist(datas,value,currentId);

			//名字存在
			if(isExist){
				fileList.removeChild(firstElement);
				fullTip("warn","命名冲突，新建不成功");
			}else{ //不存在，新建成功

				//添加信息
				fileTitle.style.display = "block";
				fileEdtor.style.display = "none";
				fileTitle.innerHTML = value;

				var id = Math.random();
				datas.unshift({
					id:id,
					pid:currentId,
					title:value,
					type:"file"
				});

				firstElement.setAttribute("data-id",id);

				treeMenu.innerHTML = createTreeHtml(datas,-1);

				fullTip("ok","新建成功");


			}


			//在数据中添加新建文件的信息

			//新建成功提醒  树形菜单重新渲染

		}else{//不新建
			fileList.removeChild(firstElement);

			//判断是否有子数据
			var childs = handle.getChildsById(datas,currentId);

			if( !childs.length ){
				gEmpty.style.display = "block";
			}
			
		}

		create.isCreate = false;
	}

	//----------删除---------

	/*var delect = document.querySelector(".delect");

	t.on(delect,"click",function (){
		fullTip("warn","请选择文件")	
	})*/



})()