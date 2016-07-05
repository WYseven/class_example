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
	//获取所有的可以勾选的input
	var checkInput = tools.$(".checkInput",filesSet);

	tools.addEvent(createFile,"click",function (){
		if( this.isCreateFile ){
			if(tools.chaceData.fileNameInput){
				tools.chaceData.fileNameInput.select();
			}
			return;
		}
		//添加一个自定义属性，表示当前正在创建新的文件夹
		this.isCreateFile = true;
		var newLi = createLi();
		tools.insertFirst(filesSet,newLi);

		var fileNameInput = tools.$(".fileNameInput",newLi)[0];
			fileNameInput.select();
			tools.chaceData.fileNameInput = fileNameInput;

		//给新创建的元素添加事件处理程序
		liHandle(newLi);
		//去掉所有li中的样式
		cancelLiStyle();

	});

	function cancelLiStyle(){
		tools.each(allLi,function (item){
			var icon = tools.$(".icon",item)[0];
			var checkInput = tools.$(".checkInput",item)[0];
				icon.style.borderColor = "#fff";
				tools.hide(checkInput);
		})	
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
		});
		//点击取消
		tools.addEvent(cancel,"click",function (){
			tools.removeChild(filesSet,liElement);
			//创建元素完毕
			createFile.isCreateFile = false;
		});

		tools.addEvent(liElement,"mouseenter",function (){
			if(createFile.isCreateFile){
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
	};

	tools.each(allLi,function (item,index){
		liHandle(item);	
	})




})()
