(function(){
	
	function createNewFile(){
		var li = document.createElement('li')
		li.innerHTML = `
						<div class="icon">
							<input type="checkbox" class="checkInput" />
						</div>
						<strong style="display:none;">新建文件夹</strong>
						<div class="clearFix edtor"  style="display:block;">
							<input type="text" value="新建文件夹" class="names"  />
							<input type="button" value="√" class="ok" />
							<input type="button" value="×" class="cancel" />
						</div>
					`;
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

	tools.addEvent(createFile,"click",function (){

		if( this.isCreateFile ){
			names.select();
			return;
		}
		//状态是已新建文件夹的状态
		this.isCreateFile = true;

		var newLi = createNewFile();
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
		return {
			ok:ok,
			cancel:cancel,
			strong:strong,
			edtor:edtor,
			icon:icon,
			checkInput:checkInput
		}	
	}

	function lihandle(li){
		var getChilds = getLiChild(li);

		tools.addEvent(getChilds.ok,"click",function (){
			getChilds.strong.style.display = "block";	
			getChilds.edtor.style.display = "none";
			createFile.isCreateFile = false;
		});

		tools.addEvent(getChilds.cancel,"click",function (){
			filesSet.removeChild(li);
			createFile.isCreateFile = false;
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
				
		})

	};

	

	tools.each(allLi,function (item){
		lihandle(item);	
	})




})()
