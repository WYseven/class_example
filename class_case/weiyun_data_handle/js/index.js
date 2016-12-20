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

		if( t.parent(target,".checkbox") && !fileList.isDrag ){
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
		if( t.parent(target,".checkbox") ||  t.parent(target,".edtor") || fileList.isDrag){
			return;
		}

		console.log(fileList.isDrag);

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

		if(fileList.isDrag) return;


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

				//把所有的checkboxs的class去掉

				var selectArr = whoSelect();

				selectArr.forEach(function (item){
					var checkbox = item.querySelector(".checkbox");
					t.removeClass(checkbox,"checked");
					t.removeClass(item,"file-checked");
				});
				t.removeClass(checkedAll,"checked");


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

	//那些文件被选中了
	function whoSelect(){
		//var arr = [];
		//找所有的checkboxs的class为checked
		return Array.from(checkboxs).filter(function (item){
			return t.hasClass(item,"checked");	
		}).map(function (item){
			return t.parent(item,".file-item");
		})
	}

	var delect = document.querySelector(".delect");

	t.on(delect,"click",function (){

		//点击删除，没有选择文件和选择文件两种情况
		var selectArr = whoSelect();

		if( selectArr.length ){

			dialog({
				title:"",
				content:"确定要删除?",
				okFn:function(){
					//删除掉要删的文件的所有的子孙数据
					//1. 拿到要删除数据的id

					//1-1， 删除一个指定id的所有的子孙数据

					var id = selectArr[0].dataset.id;

					/*var idArr = selectArr.map(function (item){
						return item.dataset.id;
					})*/

					var idArr = [];

					for( var i = 0; i < selectArr.length; i++ ){
						idArr.push(selectArr[i].dataset.id);
					}

					//console.log( handle.getChildsAll(datas,id) );

					//console.log( handle.getChildsAllByIdarr(datas,idArr) );

					//删除拿到的数据

				
					handle.delectChildsAll(datas,idArr);

					treeMenu.innerHTML = createTreeHtml(datas,-1);
					render(currentId);
				}
			})

			



		}else{
			fullTip("warn","请填写完必填项，才可以删除")
		}

			
	})

	//-------------------重命名----------------------
	var rename = document.querySelector(".rename");
	var renameObj = {};
	t.on(rename,"click",function(){
		var selectArr = whoSelect();
		if( selectArr.length === 1 ){

			renameObj.element = selectArr[0];
			renameObj.fileTitle = renameObj.element.querySelector(".file-title");
			renameObj.fileEdtor = renameObj.element.querySelector(".file-edtor");
			renameObj.edtor = renameObj.element.querySelector(".edtor");

			renameObj.fileTitle.style.display = "none";
			renameObj.fileEdtor.style.display = "block";

			renameObj.edtor.value = renameObj.fileTitle.innerHTML;

			renameObj.edtor.select();

			rename.isRename = true;

		}else if(selectArr.length > 1){
			fullTip("warn","不能选择多个文件，请重新选择")
		}else{
			fullTip("warn","请选择要重命名的文件")
		}
	})


	t.on(document,"mousedown",function(){
		if(!rename.isRename) return;

		var value = renameObj.edtor.value.trim();

		if( value ){
			var isExist = handle.isTitleExist(datas,value,currentId);
			if(value === renameObj.fileTitle.innerHTML.trim()){
				renameObj.fileTitle.style.display = "block";
				renameObj.fileEdtor.style.display = "none";
			}else if(isExist){
				renameObj.fileTitle.style.display = "block";
				renameObj.fileEdtor.style.display = "none";
				fullTip("warn","命名冲突，重新命名不成功");
			}else{
				var info = handle.getSelfById(datas,renameObj.element.dataset.id);

				info.value = value;

				renameObj.fileTitle.innerHTML = value;

				renameObj.fileTitle.style.display = "block";
				renameObj.fileEdtor.style.display = "none";

				treeMenu.innerHTML = createTreeHtml(datas,-1);

				fullTip("ok","命名成功");


			}


		}else{
			renameObj.fileTitle.style.display = "block";
			renameObj.fileEdtor.style.display = "none";
		}

		rename.isRename = false;

	});

	//------------------移动到-----------------------
	var move = document.querySelector(".move");
	var moveStatus = false;
	var moveFIleId = false;
	t.on(move,"click",function(){

		var selectArr = whoSelect();
		var selectArrId = whoSelect().map(function(item){
			return item.dataset.id;
		});
		var selectArrData = selectArrId.map(function(value){
			return datas.find(function(item){
				return item.id == value;
			})
		});

		if( selectArr.length ){
			dialog({
				title:"移动到",
				content:"<div class='tree-menu-comm move-tree'>"+createTreeHtml(datas,-1)+"</div>",
				okFn(){

					if(moveStatus){
						
						//点击的fileId
						var childs = handle.getChildsById(datas,moveFIleId);

						for( var i = 0; i < selectArrData.length; i++ ){
							var onOff = false;
							for( var j = 0; j < childs.length; j++ ){
								if( selectArrData[i].title === childs[j].title ){
									onOff = true;
								}
							}

							if( !onOff ){
								selectArrData[i].pid = moveFIleId;
								fileList.removeChild(selectArr[i]);
								selectArr.splice(i,1,false);
							}
						}

						var arr = selectArr.filter(function(item){
							return item !== false;
						})

						if( arr.length ){
							fullTip("warn","部分移动失败，重名了");
						}

						treeMenu.innerHTML = createTreeHtml(datas,-1);


					}else{
						return true;
					}
				}
			});

			moveTreeFn();
		}else{
			fullTip("warn","请选择要移动的文件");
		}
		
	});

	//----------------给移动到的属性菜单添加点击处理------------------
	function moveTreeFn(){
		var moveTree = document.querySelector(".move-tree");
		var selectArrId = whoSelect().map(function(item){
			return item.dataset.id;
		});
		var allChilds = handle.getChildsAllByIdarr(datas,selectArrId);

		var errorSpan = document.querySelector(".full-pop .error");
		var currentTree = moveTree.querySelector(".tree-title");
		t.addClass(currentTree,"tree-nav");
		t.on(moveTree,"click",function(ev){
			var target = ev.target;

			if( target = t.parent(target,".tree-title") ){
				t.removeClass(currentTree,"tree-nav");
				t.addClass(target,"tree-nav");
				currentTree = target;
				var fileId = target.dataset.id;
				//不能移动到自身下面，和他的子孙元素下
				var obj = allChilds.find(function(value){
					return value.id == fileId;
				});

				if(obj){
					errorSpan.innerHTML = "不能移动到自身和子元素下";
					moveStatus = false;
				}else{
					errorSpan.innerHTML = "";
					moveStatus = true;
					moveFIleId = fileId;
				}

			}
		})
	}


	//------------------框选---------------------

	function getRect(obj){
		return obj.getBoundingClientRect();
	}
	/*
		obj1 拖拽的元素
		obj2 被碰撞的元素
	*/
	function pengzhuang(obj1,obj2){
		var obj1Rect = 	getRect(obj1);
		var obj2Rect = 	getRect(obj2);

		//如果obj1碰上了哦obj2返回true，否则放回false
		var obj1Left = obj1Rect.left;
		var obj1Right = obj1Rect.right;
		var obj1Top = obj1Rect.top;
		var obj1Bottom = obj1Rect.bottom;

		var obj2Left = obj2Rect.left;
		var obj2Right = obj2Rect.right;
		var obj2Top = obj2Rect.top;
		var obj2Bottom = obj2Rect.bottom;

		if( obj1Right < obj2Left || obj1Left > obj2Right || obj1Bottom < obj2Top || obj1Top > obj2Bottom ){
			return false;
		}else{
			return true;
		}


	}

	//画方块
	var div = null,
		disX = null,
		disY = null,
		downObj = null,
		dragDiv = null;
		t.on(document,"mousedown",function (ev){
			if(ev.which !== 1) return;
			ev.preventDefault();
			if( !t.parent(ev.target,".file-list") ){
				return;
			}

			//找到操作的file-item 判断下面checkbox是否有class为checked
			var isChecked = false;
			if( t.parent(ev.target,".file-item") ){
				isChecked = !!t.parent(ev.target,".file-item").querySelector(".checked");
			}


			//添加上一个状态，为正在拖拽的状态
			fileList.isDrag = true;

			

			disX = ev.clientX;  //摁下去的x位置
			disY = ev.clientY;  //摁下去的Y位置
			
			document.onmousemove = function (ev){

				if(isChecked){
					console.log("选中");
					if( !dragDiv ){
						selectArr2 = whoSelect();
						dragDiv = document.createElement('div');
						dragDiv.className = 'drag-helper ui-draggable-dragging';

						var str = `<div class="icons">
					            <i class="icon icon0 filetype icon-folder"></i>           
					            <i class="icon icon1 filetype icon-folder"></i>       
					            <i class="icon icon2 filetype icon-folder"></i>      
					            <i class="icon icon3 filetype icon-folder"></i>   
					        </div>
					        <span class="sum">${selectArr2.length}</span>`;

					   	dragDiv.innerHTML = str;
					   	dragDiv.style.display = 'block';
					   	document.body.appendChild(dragDiv);

					   	newDiv = document.createElement("div");
					   	newDiv.style.cssText= "width:10px;height:10px;background:red;position:absolute;left:0;top:0;";
				   		document.body.appendChild(newDiv);

					}

				   	dragDiv.style.left = ev.clientX+10 + "px";
				   	dragDiv.style.top = ev.clientY+10 + "px";
					
					newDiv.style.left = ev.clientX-5 + "px";
				   	newDiv.style.top = ev.clientY-5 + "px";

				   	//检测碰撞
					for( var i = 0; i < fileItems.length; i++ ){
						var onOff = false;
						for( var j = 0; j < selectArr2.length; j++ ){
							console.log(fileItems[i] !== selectArr2[j])
							if(fileItems[i] === selectArr2[j]){
								onOff = true;
							}
							
						}

						if(onOff) continue;

						if( pengzhuang(dragDiv,fileItems[i]) ){
							t.addClass(fileItems[i],"file-checked");
							t.addClass(checkboxs[i],"checked");

						}else{
							t.removeClass(fileItems[i],"file-checked");
							t.removeClass(checkboxs[i],"checked");
						}

						
					}


					return;
				}
				//在move的过程中，只生成一个div，只要生成了了一个div之后，就没必要再生成了
				

				//生成的div，要在一定的范围之后才append到body中
				//15像素

				//15个像素

				if( Math.abs( ev.clientX - disX ) > 15 || Math.abs( ev.clientY - disY ) > 15 ){

					if( !div ){
						div = document.createElement("div");
						div.className = "kuang";
						document.body.appendChild(div);
					}

					div.style.width = Math.abs( ev.clientX - disX ) + "px";
					div.style.height = Math.abs( ev.clientY - disY ) + "px";

					div.style.left = Math.min(ev.clientX,disX) + "px";
					div.style.top = Math.min(ev.clientY,disY) + "px";

					//检测碰撞
					for( var i = 0; i < fileItems.length; i++ ){
						if( pengzhuang(div,fileItems[i]) ){
							t.addClass(fileItems[i],"file-checked");
							t.addClass(checkboxs[i],"checked");

						}else{
							t.removeClass(fileItems[i],"file-checked");
							t.removeClass(checkboxs[i],"checked");
						}
					}
					//判断是否全选
					var selectArr = whoSelect();
					if( selectArr.length === checkboxs.length ){
						t.addClass(checkedAll,"checked")
					}else{
						t.removeClass(checkedAll,"checked")
					}
				}
			}

			document.onmouseup = function (ev){
				document.onmousemove = null;
				document.onmouseup = null;
				if( div ){
					document.body.removeChild(div);
					//把div变量设置为null，目的再次点击还要继续生成div
					div = null;
				}
				if(dragDiv){
					document.body.removeChild(dragDiv);
					document.body.removeChild(newDiv);
					dragDiv = null;
					newDiv = null;
				}
				fileList.isDrag = false;
			}
	});
})()