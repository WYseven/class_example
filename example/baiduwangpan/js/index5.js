(function(){
	
	function createNewFile(){
		var li = document.createElement('li')
		li.innerHTML = `
						<div class="icon">
							<input type="checkbox"  class="checkInput" />
						</div>
						<strong style="display:none;">新建文件夹</strong>
						<div class="clearFix edtor"  style="display:block;">
							<input type="text" value="新建文件夹" class="createInputBtn"  />
							<input type="button" value="√" />
							<input type="button" value="×" />
						</div>
					`;
		return li;
	}
	var createFile = tools.$(".createFile")[0];
	var filesSet = tools.$(".filesSet")[0];
	var edtorInput;
	
	var allLi = filesSet.getElementsByTagName("li");
	var allStrong = filesSet.getElementsByTagName("strong");
	var alIcon = tools.$(".icon",filesSet);
	var allSelected = tools.$(".allSelected")[0];
	
	var selectNum = tools.$("span",tools.$(".selectNum")[0])[0];
	
	var delectItem = tools.$(".delectItem")[0];
	
	var rename = tools.$(".rename")[0];
	
	var info = tools.$(".info")[0];
	
	var checkedNum = 0;
	
	//创建文件夹
	tools.addEvent(createFile,"click",function(){
		//新建文件夹
		if( createFile.isCreateFile ){
			edtorInput[0].select();
			return;
		}
		info.style.display = "none";
		allSelected.checked = false;
		allSelected.disabled = true;
		for( var i = 0; i < alIcon.length; i++ ){
			alIcon[i].style.borderColor = "#fff";
			tools.$("input",alIcon[i])[0].style.display = "none";
			tools.$("input",alIcon[i])[0].checked = false;
		}
		
		currentLi = createNewFile();
		filesSet.appendChild(currentLi);
		//给新建文件夹一个标示
		createFile.isCreateFile = true;
		edtor = tools.$(".edtor",currentLi)[0];
		var icon = tools.$(".icon",currentLi)[0];
		edtorInput = tools.$("input",edtor);
		edtorInput[0].select();  //选中新建文件的文字
		//点击确认名字
		confirmName(currentLi);
		//点击不添加li
		liHandle(currentLi);
		//选中每一个input
		inputCheckboxClick(icon);
		
	});
	//移入和点击确定命名后执行的出现边框
	function enterHandle(_this){
		
		if( !_this ) return;
		var currentEdtor = tools.$(".edtor",_this)[0];
		if( currentEdtor.style.display !== "block" && !createFile.isCreateFile ){
			tools.$(".icon",_this)[0].style.borderColor = "#2e80dc";
			tools.$("input",tools.$(".icon",_this)[0])[0].style.display = "block";
		}
	}
	function liHandle(currentLi){
		tools.addEvent(currentLi,"mouseenter",function(){
			enterHandle(this)
		});
		tools.addEvent(currentLi,"mouseleave",function(ev){
			var inputs = tools.$("input",tools.$(".icon",this)[0])[0];
			if(!inputs.checked){
				tools.$(".icon",this)[0].style.borderColor = "#fff";
				tools.$("input",tools.$(".icon",this)[0])[0].style.display = "none";
			}
			
		});
	};
	
	//点击确认名字
	function confirmName(currentLi){
		var strong = tools.$("strong",currentLi)[0];
		var edtor = tools.$(".edtor",currentLi)[0];
		var edtorInput = tools.$("input",edtor);
		tools.addEvent(edtorInput[1],"click",function(){
			//判断名字是否重复
			for( var i = 0; i < allStrong.length; i++ ){
				if( strong !== allStrong[i] && (allStrong[i].innerHTML.trim() === edtorInput[0].value.trim()) ){
					edtorInput[0].select();
					return;
				}
			};
			createFile.isCreateFile = false;
			tools.$(".checkInput",tools.parents(this,"LI"))[0].disabled = false;
			allSelected.disabled = false;
			strong.innerHTML = edtorInput[0].value.trim();
			strong.style.display = "block";
			edtor.style.display = "none";
			enterHandle(currentLi);  //立马执行,为了加入后就立马有框框
			rename.isRename = false;
			
		});
		tools.addEvent(edtorInput[2],"click",function(){
			createFile.isCreateFile = false;
			console.log( rename.isRename );
			if( rename.isRename ) {
				edtor.style.display = "none";
				strong.style.display = "block";
				allSelected.disabled = false;
				tools.$(".checkInput",tools.parents(this,"LI"))[0].disabled = false;
				rename.isRename = false;
			}else{
				filesSet.removeChild(currentLi);
			}
			
			
			allSelected.disabled = !whoSelect().length;
			
		});
	}
	
	//给每一个li添加事件处理
	tools.each(allLi,function(liItem){
		liHandle(liItem);
		confirmName(liItem);
	});
	
	//每一个按钮的事件
	function inputCheckboxClick(icon){
		tools.addEvent(icon,"click",function(ev){
			
			if( ev.target.nodeName === "INPUT" ){
				if(ev.target.checked){
					allSelected.checked = true;
					checkedNum = 0;
					for( var i = 0; i < alIcon.length; i++ ){
						if(!tools.$("input",alIcon[i])[0].checked){
							allSelected.checked = false;
						}else{
							checkedNum++;
						}
					}
					
					info.style.display = "block";
					
				}else{
					checkedNum--;
					allSelected.checked = false;
					if( checkedNum <= 0  ){
						info.style.display = "none";
					}
				}
				
				selectNum.innerHTML = checkedNum;
			}
		})
	}
	
	//给初始的每一个input添加事件处理
	tools.each(alIcon,function(liItem){
		inputCheckboxClick(tools.$("input",liItem)[0]);
	});
	
	//全选按钮的操作
	tools.addEvent(allSelected,"click",function(ev){
		if(this.checked ){
			for( var i = 0; i < alIcon.length; i++ ){
				alIcon[i].style.borderColor = "#2e80dc";
				tools.$("input",alIcon[i])[0].style.display = "block";
				tools.$("input",alIcon[i])[0].checked = true;
			}
			info.style.display = "block";
			selectNum.innerHTML = alIcon.length;
			checkedNum = alIcon.length;
		}else{
			for( var i = 0; i < alIcon.length; i++ ){
				alIcon[i].style.borderColor = "#fff";
				tools.$("input",alIcon[i])[0].style.display = "none";
				tools.$("input",alIcon[i])[0].checked = false;
			}
			info.style.display = "none";
			selectNum.innerHTML = 0;
			checkedNum = 0;
		}
	});
	//删除选中项目
	tools.addEvent(delectItem,"click",function(){
		if( rename.isRename ) return;
		var items = whoSelect();
		tools.each(items,function(item){
			filesSet.removeChild(tools.parents(item,"LI"));
		});
		//改变全选的状态,隐藏掉info
		allSelected.checked = !!whoSelect().length;
		allSelected.disabled = !allLi.length;
		selectNum.innerHTML = 0;
		info.style.display = "none";
		
		
	});
	
	//重命名,那必须直选中一项才能重命名,否则为灰色,不能点击
	tools.addEvent(rename,"click",function(){
		var selectArr = whoSelect();
		if( selectArr.length === 1 ){
			renamehandle.call(this,selectArr[0]);
		}
	});
	
	//当重命名时候要对某些元素的操作
	function renamehandle(renameLi){
		console.log( tools.$("strong",tools.parents(renameLi,"LI"))[0] );
		tools.$("strong",tools.parents(renameLi,"LI"))[0].style.display = "none";
		tools.$(".edtor",tools.parents(renameLi,"LI"))[0].style.display = "block";
		tools.$(".createInputBtn",tools.parents(renameLi,"LI"))[0].select();
		tools.$("input",tools.parents(renameLi,"LI"))[0].disabled = true;
		allSelected.disabled = true;
					
		edtor = tools.$(".edtor",tools.parents(renameLi,"LI"))[0];
		
		this.isRename = true;
		createFile.isCreateFile = true;
		//初始重命名的时候,要保存一下要重命名的input
		edtorInput = tools.$("input",tools.$(".edtor",tools.parents(renameLi,"LI"))[0]);
	}
	
	//判断有多少个被选中了
	function whoSelect(){
		var arr = [];
		for( var i = 0; i < alIcon.length; i++ ){
			if(tools.$("input",alIcon[i])[0].checked){
				arr.push(alIcon[i]);
			};
		}
		return arr;
	};
	
	//右击菜单绑定事件
	var content = tools.$(".content")[0];
	var contextmenu = tools.$(".contextmenu")[0];
	var prevLi = null;
	tools.addEvent(content,"contextmenu",function(ev){
		
		
		var target = tools.parents(ev.target,"LI");  //找到目标的li
		//如果是正在重命名,那么不能再出现右击菜单
		console.log( target );
		rename.isRename = false;
		if( target && target.nodeName === "LI" ){
			var left = tools.getEleRect(content).left;
			var top = tools.getEleRect(content).top;
			contextmenu.style.style = "block";
			contextmenu.style.left = ev.clientX - left + 1 + "px";
			contextmenu.style.top = ev.clientY - top + 1 + "px";
			contextmenu.style.display = "block";
			if( target.isRename ) {
				ev.preventDefault();
				return;
			}
		
			if( whoSelect().length > 1 ){
				tools.$(".menu_rename",contextmenu)[0].style.background = "#ccc";
				ev.preventDefault();
				
				return;
			}
			if(prevLi){
				tools.$("strong",prevLi)[0].style.display = "block";
				tools.$(".edtor",prevLi)[0].style.display = "none";
				tools.$(".icon",prevLi)[0].style.borderColor = "#fff";
				tools.$(".checkInput",prevLi)[0].style.display = "none";
				tools.$(".checkInput",prevLi)[0].checked = false;
				tools.$(".checkInput",prevLi)[0].disabled = false;
				prevLi.isRename = false;
			}
			tools.$(".icon",target)[0].style.borderColor = "#2e80dc";
			tools.$(".checkInput",target)[0].checked = true;
			tools.$(".checkInput",target)[0].style.display = "block";
			tools.$(".checkInput",target)[0].disabled = false;
			info.style.display = "block";
			
			rename.isRename = true;
			allSelected.disabled = false;
			
			target.isRename = true;
			
			selectNum.innerHTML = 1;
			checkedNum = 1;
			
			prevLi = target;
		}
		
		ev.preventDefault();
		
	});
	
	//右击菜单统一做事件委托处理
	tools.addEvent(contextmenu,"click",function(ev){
		var target = ev.target  //找到目标的li
		console.log( tools.containClass(target,".menu_rename") );
		if( target && tools.containClass(target,".menu_rename") ){
			//this.style.display = "none";
			var selectArr = whoSelect();
			rename.isRename = true;
			console.log(1111);
			console.log( prevLi );
			renamehandle(prevLi);
		};
		ev.preventDefault();
		
	});
	
	tools.addEvent(document,"click",function(ev){
		contextmenu.style.display = "none";
		
	})
	
})()
