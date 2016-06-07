(function(){

	
	tools.store("baidu",data);

	var data = tools.store("baidu");

	console.log( data );

	
	function createNewFile(options){
		options = options || {};
		//这里可以写为克隆
		var defaults = {
			name:options.name || "新建文件夹",
			id:options.id || 0
		}

		var li = document.createElement('li')
		li.innerHTML = '<div class="icon">'
							+'<input type="checkbox" class="checkInput" />'
						+'</div>'
						+'<strong>'+defaults.name+'</strong>'
						+'<div class="clearFix edtor">'
							+'<input type="text" value="'+defaults.name+'" class="names"  />'
							+'<input type="button" value="√" class="ok" />'
							+'<input type="button" value="×" class="cancel" />'
						+'</div>';

		li.id = defaults.id;
		return li;
	};

	//新建
	var createFile = tools.$(".createFile")[0];
	//ul
	var filesSet = tools.$(".filesSet")[0];
	//存入新建的输入框
	var names = null;
	//所有的li
	var allLi = tools.$("li",filesSet);

	//隐藏
	var hiddenInput = tools.$(".hiddenInput")[0];

	getPidLists(0);

	//数据列表
	function getPidLists(pid){
		tools.each(data.files,function (list){
			if(list.pid == parseInt(pid)){
				var newLi = createNewFile({
					name:list.name,
					id:list.id
				});
				filesSet.appendChild(newLi);
			}
		});


	}


	tools.addEvent(createFile,"click",function (){

		if( this.isCreateFile ){
			names.select();
			return;
		}
		//状态是已新建文件夹的状态
		this.isCreateFile = true;

		var newLi = createNewFile();

		tools.$("strong",newLi)[0].style.display = "none";
		tools.$(".edtor",newLi)[0].style.display = "block";

		filesSet.appendChild(newLi);
		
		//命名框
		names = tools.$(".names",newLi)[0];

		names.select();
		//对li中的元素进行操作
		lihandle(newLi);

		//取消掉其他的所有的input的选中取消

		tools.each(allLi,function (item){
			var getChilds = getLiChild(item);
			getChilds.icon.style.borderColor = "#fff";
			getChilds.checkInput.style.display = "none";
			getChilds.checkInput.checked = false;
		})
	});

	function getLiChild(li){
		//确定
		var ok = tools.$(".ok",li)[0];	
		//取消
		var cancel = tools.$(".cancel",li)[0];
		var strong = tools.$("strong",li)[0];
		var edtor = tools.$(".edtor",li)[0];
		var icon = tools.$(".icon",li)[0];
		var checkInput = tools.$(".checkInput",li)[0];
		var names = tools.$(".names",li)[0];
		return {
			ok:ok,
			cancel:cancel,
			strong:strong,
			edtor:edtor,
			icon:icon,
			checkInput:checkInput,
			names:names
		}	
	}

	var id = 100;

	function lihandle(li){
		var getChilds = getLiChild(li);

		tools.addEvent(getChilds.ok,"click",function (ev){
			getChilds.strong.style.display = "block";	
			getChilds.edtor.style.display = "none";
			createFile.isCreateFile = false;
			getChilds.strong.innerHTML = getChilds.names.value;
			console.log( 123 );

			data.files.push({
				id:++id,
				pid:hiddenInput.value,
				name:getChilds.names.value
			});
			tools.store("baidu",data);

			console.log( tools.store("baidu") );
			ev.cancelBubble = true;
		});

		tools.addEvent(getChilds.cancel,"click",function (ev){
			filesSet.removeChild(li);
			createFile.isCreateFile = false;
			ev.cancelBubble = true;
		});

		tools.addEvent(li,"mouseenter",function (){
			if( !createFile.isCreateFile ){
				//可以使用class
				getChilds.icon.style.borderColor = "#2e80dc";
				getChilds.checkInput.style.display = "block";
			}
			
		});
		tools.addEvent(li,"mouseleave",function (){
			if( !getChilds.checkInput.checked ){
				getChilds.icon.style.borderColor = "#fff";
				getChilds.checkInput.style.display = "none";
			}
				
		});
		tools.addEvent(li,"click",function (){
			filesSet.innerHTML = "";
			getPidLists(this.id);
			hiddenInput.value = this.id;
		})

	};

	tools.each(allLi,function (item){
		lihandle(item);	
	});


	//拖住选中

	var content = tools.$(".content")[0];

	//down的时候，去掉默认行为 生成一个div div的宽高随着鼠标改变而变化

	tools.addEvent(content,"mousedown",function(ev){

		/*
				当在down的时候，判断事件源 是否是li
				或者是事件源最近的祖先节点是否是li

				是li并且li为选中状态  不出现选择框
		*/
		ev.preventDefault();

		var target = ev.target;
		//事件源目标找到为li
		if( target = tools.parents(target,"LI") ){
			
			var checkInput = tools.$(".checkInput",target)[0];

			if( checkInput.checked ) return;
		};

		
		var disX = ev.clientX;
		var disY = ev.clientY;

		var newDiv = null;

		tools.addEvent(document,"mousemove",moveHandle);
		tools.addEvent(document,"mouseup",upHandle);

		function upHandle(ev){
			tools.removeEvent(document,"mousemove",moveHandle);
			tools.removeEvent(document,"mouseup",upHandle);
			//移除生成的div
			if(newDiv) document.body.removeChild(newDiv);
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
					console.log( index );
					//找到碰撞的li
					if( tools.collisionRect(newDiv,item) ){
						handleLi(item,true);
					}else{
						handleLi(item);
					}
				})
			}		
		}
	});

	function handleLi( li,bl ){
		var icon = tools.$(".icon",li)[0];	
		var checkInput = tools.$(".checkInput",li)[0];	
		if( bl ){
			icon.style.borderColor = "red";
			checkInput.style.display = "block";
			checkInput.checked = true;
		}else{
			icon.style.borderColor = "#fff";
			checkInput.style.display = "none";
			checkInput.checked = false;
		}
	};




})()
