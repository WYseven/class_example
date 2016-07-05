(function(){
	
	function createLi(){
		var li = document.createElement("li");
		var str =   '<div class="icon">'
							+'<input type="checkbox" class="checkInput" />'
						+'</div>'
						+'<strong class="fileTitle" style="display:none;">新建文件夹</strong>'
						+'<div class="clearFix edtor"  style="display:block;">'
							+'<input type="text" value="新建文件夹" class="fileNameInput"  />'
							+'<input type="button" value="√" class="ok" />'
							+'<input type="button" value="×" class="cancel" />'
						+'</div>';
				;
		
		li.innerHTML = str;
		return li;
	}


	var filesSet = tools.$(".filesSet")[0];
	//创建文件夹按钮
	var createFile = tools.$(".createFile")[0];
	//获取到所有的li
	var allLi = tools.$("li",filesSet);
	//全选按钮
	var allSelected = tools.$(".allSelected")[0];
	//信息栏目
	var info = tools.$(".info")[0];
	var selectNum = tools.$(".selectNum")[0];

	//新建文件夹
	tools.addEvent(createFile,"click",createFileHandle);

	//新建文件夹功能函数
	function createFileHandle(){
		if( createFile.isCreateFile || rename.isRename ){
			if(tools.chaceData.fileNameInput){
				tools.chaceData.fileNameInput.select();
			}
			return;
		}
		//添加一个自定义属性，表示当前正在创建新的文件夹
		createFile.isCreateFile = true;
		var newLi = createLi();
		tools.insertFirst(filesSet,newLi);

		tools.chaceData.newLi = newLi;

		var fileNameInput = tools.$(".fileNameInput",newLi)[0];
			fileNameInput.select();
			tools.chaceData.fileNameInput = fileNameInput;

		//给新创建的元素添加事件处理程序
		liHandle(newLi);
		//去掉所有li中的样式
		cancelLiStyle();

		//控制input

		tools.hide(info);
		allSelected.checked = false;
		allSelected.disabled = true;
	}

	function cancelLiStyle(){
		var whoSelectLi = whoSelect();
		tools.each(whoSelectLi,function (item){
			var icon = tools.$(".icon",item)[0];
			var checkInput = tools.$(".checkInput",item)[0];
			var fileTitle = tools.$(".fileTitle",item)[0];
			var edtor = tools.$(".edtor",item)[0];
				icon.style.borderColor = "#fff";
				checkInput.checked = false;
				checkInput.disabled = false;
				tools.hide(checkInput);
				tools.hide(edtor);
				tools.show(fileTitle);
		});
		allSelected.disabled = false;
	}

	//操作跟li中元素的事件相关的封装
	function liHandle(liElement){
		var ok = tools.$(".ok",liElement)[0];
		var cancel = tools.$(".cancel",liElement)[0];
		var fileTitle = tools.$(".fileTitle",liElement)[0];
		var edtor = tools.$(".edtor",liElement)[0];
		var icon = tools.$(".icon",liElement)[0];
		var checkInput = tools.$(".checkInput",liElement)[0];

		//点击确认
		tools.addEvent(ok,"click",function (){
			tools.hide(edtor);
			tools.show(fileTitle);
			//创建元素完毕
			createFile.isCreateFile = false;
			icon.style.borderColor = "#2e80dc";
			tools.show(checkInput);
			allSelected.disabled = false;
			checkInput.disabled = false;
			rename.isRename = false;
			contextBox.isContentCreateFile = false;
			tools.chaceData.newLi = null;
		});
		//点击取消
		tools.addEvent(cancel,"click",function (){
			if(rename.isRename){
				tools.show(fileTitle);
				tools.hide(edtor);
			}else{
				tools.removeChild(filesSet,liElement);
			}
			
			//创建元素完毕
			createFile.isCreateFile = false;
			allSelected.disabled = false;
			checkInput.disabled = false;
			rename.isRename = false;
			contextBox.isContentCreateFile = false;
		});

		tools.addEvent(liElement,"mouseenter",function (){
			if(createFile.isCreateFile || contextBox.isContentCreateFile || rename.isRename){
				return;
			}

			icon.style.borderColor = "#2e80dc";
			tools.show(checkInput);
		});
		tools.addEvent(liElement,"mouseleave",function (){
			if(checkInput.checked){
				return;
			}
			icon.style.borderColor = "#fff";
			tools.hide(checkInput);
		});

		tools.addEvent(checkInput,"click",function (){
			if(this.checked){
				allSelected.checked = true;
				tools.chaceData.selectNum++;
				if( tools.chaceData.selectNum !== allLi.length ){
					allSelected.checked = false;
				};
				tools.show(info);
			}else{
				allSelected.checked = false;
				tools.chaceData.selectNum--;
			}
			selectNum.innerHTML = tools.chaceData.selectNum;
		})
	};
	//初始li中元素的事件
	tools.each(allLi,function (item,index){
		liHandle(item);
	});
	//点击全选，控制所有li的行为动作
	tools.addEvent(allSelected,"click",function (){
		var allChecked = this.checked;
		allChecked ? tools.show(info) : tools.hide(info);
		allChecked ? tools.chaceData.selectNum = allLi.length : tools.chaceData.selectNum = 0;
		selectNum.innerHTML = tools.chaceData.selectNum;
		tools.each(allLi,function (item){
			var icon = tools.$(".icon",item)[0];
			var checkInput = tools.$(".checkInput",item)[0];
				icon.style.borderColor = allChecked ? "#2e80dc" : "#fff";
				allChecked ? tools.show(checkInput) : tools.hide(checkInput);
				checkInput.checked = allChecked ? true : false;
		});
	});

	//删除
	var delectItem = tools.$(".delectItem")[0];
	var rename = tools.$(".rename")[0];

	//删除
	tools.addEvent(delectItem,"click",delectHandle);
	function delectHandle(){
		if( rename.isRename ) return;
		var selectLiArr = whoSelect();
		tools.each(selectLiArr,function (item){
			filesSet.removeChild(item);
		});
		tools.chaceData.selectNum = 0;
		selectNum.innerHTML = tools.chaceData.selectNum;
		tools.hide(info);

		if( allLi.length === 0 ){
			allSelected.checked = false;
			allSelected.disabled = true;
		}
	}

	//重命名
	tools.addEvent(rename,"click",renameHandle );
	function renameHandle(){
		if( rename.isRename ){
			if(tools.chaceData.fileNameInput){
				tools.chaceData.fileNameInput.select();
			}
			return;
		}
		var selectLiArr = whoSelect();
		if( selectLiArr.length === 1 ){
			rename.isRename = true;
			var fileTitle = tools.$(".fileTitle",selectLiArr[0])[0];
			var edtor = tools.$(".edtor",selectLiArr[0])[0];
			var icon = tools.$(".icon",selectLiArr[0])[0];
			var fileNameInput = tools.$(".fileNameInput",selectLiArr[0])[0];
			var checkInput = tools.$(".checkInput",selectLiArr[0])[0];
			tools.hide(fileTitle);
			tools.show(edtor);
			fileNameInput.select();
			checkInput.disabled = true;
			tools.chaceData.fileNameInput = fileNameInput;
			allSelected.disabled = true;
		}
	}
	//获取选中的li
	function whoSelect(){
		var arr = [];
		tools.each(allLi,function (item){
			var checkInput = tools.$(".checkInput",item)[0];
			if( checkInput.checked ){
				arr.push(item);
			}		
		});
		return arr;
	};

	//碰撞
	//拖拽选择
	var content = tools.$(".content")[0];
	var disX = 0,disY = 0;
	var newDiv = null;
	tools.addEvent(content,"mousedown",function(ev){
		//排除掉有右键和中键
		ev.preventDefault();
		if(ev.which === 3 || ev.which === 2 || createFile.isCreateFile || rename.isRename) return;
		
		if( rename.isRename ) return;
		var target = ev.target;
		//事件源目标找到为li
		if( target = tools.parents(target,"LI") ){
			var checkInput = tools.$(".checkInput",target)[0];
			if( checkInput.checked ) return;
		};

		
		disX = ev.clientX;
		disY = ev.clientY;

		tools.addEvent(document,"mousemove",moveHandle);
		tools.addEvent(document,"mouseup",upHandle);

		contextBox.style.display = "none";
		contextLiBox.style.display = "none";
		contextBox.isContentCreateFile = false;
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
		if( whoSelect().length === 0 ){
			allSelected.checked = false;
			info.style.display = "none";
		}else{

			info.style.display = "block";
		}
	}
	function moveHandle(ev){
		var w = ev.clientX - disX;
		var h = ev.clientY - disY;
		//设置一个检测碰撞的范围
		if( Math.abs(w)>5 || Math.abs(h) > 5 ){
			if(!newDiv){

				newDiv = document.createElement("div");
				newDiv.className = "collision";
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
			tools.each(allLi,function(item,index){
				//找到碰撞的li
				if( tools.collisionRect(newDiv,item) ){
					handleLis(item,true);

				}else{
					handleLis(item);
				}
			})
		}
		ev.preventDefault();	
	}
	function handleLis( li,bl ){
		var icon = tools.$(".icon",li)[0];	
		var checkInput = tools.$(".checkInput",li)[0];	
		if( bl ){
			icon.style.borderColor = "#2e80dc";
			checkInput.style.display = "block";
			checkInput.checked = true;
			if( whoSelect().length === allLi.length ){
				allSelected.checked = true;
			}
		}else{
			icon.style.borderColor = "#fff";
			checkInput.style.display = "none";
			checkInput.checked = false;
			allSelected.checked = false;
		}
		selectNum.innerHTML = tools.chaceData.selectNum = whoSelect().length;
	};

	//右击空白区域出现的菜单
	var contextBox = tools.$(".contextBox")[0]
	var contextLiBox = tools.$(".contextLiBox")[0]

	//右击自定义菜单
	tools.addEvent(content,"contextmenu",function(ev){
		var targetParent = tools.parents(ev.target,"LI");
		var cx = ev.clientX;
		var cy = ev.clientY;
		//如果targetParent说明右击在了空白区域
		
		if( !targetParent ){
			cancelLiStyle();
			contextLiBox.style.display = "none";
			contextBox.style.display = "block";
			contextBox.style.left = cx + "px";
			contextBox.style.top = cy + "px";
			if(createFile.isCreateFile){
				filesSet.removeChild(tools.chaceData.newLi);
				createFile.isCreateFile = false;
			};

			rename.isRename = false;
			selectNum.innerHTML = tools.chaceData.selectNum = 0;
			allSelected.checked = false;
			tools.hide(info);
			
		}else{//右击在了li身上
			if(targetParent !== tools.chaceData.newLi ){
				rename.isRename = false;
				contextBox.isContentCreateFile = false;
				contextBox.style.display = "none";
				contextLiBox.style.display = "block";
				contextLiBox.style.left = cx+1 + "px";
				contextLiBox.style.top = cy+1 + "px";
				if(createFile.isCreateFile){
					filesSet.removeChild(tools.chaceData.newLi);
					createFile.isCreateFile = false;
				};
				
				var icon = tools.$(".icon",targetParent)[0];
				var checkInput = tools.$(".checkInput",targetParent)[0];
					icon.style.borderColor = "#2e80dc";
					checkInput.checked = true;
					tools.show(checkInput);
				if( whoSelect().length === allLi.length ){
					allSelected.checked = true;
				}else{
					allSelected.checked = false;
				}
				selectNum.innerHTML = tools.chaceData.selectNum = whoSelect().length;
				tools.show(info);

			}
		};
		ev.preventDefault();
	});
	tools.addEvent(contextBox,"contextmenu",function(ev){
		ev.preventDefault();
	});
	tools.addEvent(contextBox,"click",function(ev){
		var target = ev.target;
		//判断class包含contentCreateFile为新建文件夹
		if( tools.containClass(target,"contentCreateFile") ){
			createFileHandle();
			tools.hide(contextBox);
			contextBox.isContentCreateFile = true;
		}
	});
	tools.addEvent(contextLiBox,"click",function(ev){
		var target = ev.target;
		//判断class包含contentCreateFile为新建文件夹
		if( tools.containClass(target,"contextRename") ){
			//调用重命名函数
			renameHandle() 
		}else if( tools.containClass(target,"contextDelect") ){
			//调用删除函数
			delectHandle();
		}
	});

	tools.addEvent(document,"click",function(ev){
		contextBox.style.display = "none";
		contextLiBox.style.display = "none";
		contextBox.isContentCreateFile = false;
	});


})()
