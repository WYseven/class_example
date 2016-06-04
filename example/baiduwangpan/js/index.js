(function(){
	
	function createNewFile(){
		var li = document.createElement('li')
		li.innerHTML = `
						<div class="icon">
							<input type="checkbox" />
						</div>
						<strong style="display:none;">新建文件夹</strong>
						<div class="clearFix edtor"  style="display:block;">
							<input type="text" value="新建文件夹" selected  />
							<input type="button" value="√" />
							<input type="button" value="×" />
						</div>
					`;
		return li;
	}
	var createFile = tools.$(".createFile")[0];
	var filesSet = tools.$(".filesSet")[0];
	var currentLi = null,edtor,edtorInput;
	
	var allLi = filesSet.getElementsByTagName("li");
	var allStrong = filesSet.getElementsByTagName("strong");
	var alIcon = tools.$(".icon",filesSet);
	var allSelected = tools.$(".allSelected")[0];
	
	var selectNum = tools.$("span",tools.$(".selectNum")[0])[0];
	
	var delectItem = tools.$(".delectItem")[0];
	
	var info = tools.$(".info")[0];
	
	var checkedNum = 0;
	
	
	tools.addEvent(createFile,"click",function(){
		//新建文件夹
		if( currentLi && edtor &&  edtor.style.display === "block"){
			edtorInput[0].select();
			return;
		}
		info.style.display = "none";
		allSelected.checked = false;
		for( var i = 0; i < alIcon.length; i++ ){
			alIcon[i].style.borderColor = "#fff";
			tools.$("input",alIcon[i])[0].style.display = "none";
			tools.$("input",alIcon[i])[0].checked = false;
		}
		
		currentLi = createNewFile();
		filesSet.appendChild(currentLi);
		edtor = tools.$(".edtor",currentLi)[0];
		var strong = tools.$("strong",currentLi)[0];
		var icon = tools.$(".icon",currentLi)[0];
		edtorInput = tools.$("input",edtor);
		edtorInput[0].select();  //选中新建文件的文字
		//点击确认名字
		tools.addEvent(edtorInput[1],"click",function(){
			
			//判断名字是否重复
			for( var i = 0; i < allStrong.length; i++ ){
				if( strong !== allStrong[i] && (allStrong[i].innerHTML.trim() === edtorInput[0].value.trim()) ){
					edtorInput[0].select();
					return;
				}
			}
			strong.innerHTML = edtorInput[0].value.trim();
			strong.style.display = "block";
			edtor.style.display = "none";
			
			//currentLi = null;
			edtor = null;
			enterHandle(currentLi);  //立马执行,为了加入后就立马有框框
			
		});
		//点击不添加li
		tools.addEvent(edtorInput[2],"click",function(){
			filesSet.removeChild(currentLi);
			currentLi = null;
			edtor = null;
			
		});
		function enterHandle(_this){
			if( !_this ) return;
			var currentLi = tools.$(".edtor",_this)[0];
			if( currentLi.style.display !== "block" && !edtor ){
				tools.$(".icon",_this)[0].style.borderColor = "#2e80dc";
				tools.$("input",tools.$(".icon",_this)[0])[0].style.display = "block";
			}
		}
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
		//选中每一个input
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
				}
				
				selectNum.innerHTML = checkedNum;
			}
		})
		
	});
	//全选按钮的操作
	tools.addEvent(allSelected,"click",function(ev){
		
		if( !allLi.length ||  edtor &&　edtor.style.display === "block"){
			this.checked = false;
		}else if(this.checked ){
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
	
	tools.addEvent(delectItem,"click",function(){
		
	});
	
	//判断有多少个被选中了
	
	function whoSelect(){
		var arr = [];
		for( var i = 0; i < alIcon.length; i++ ){
			if(tools.$("input",alIcon[i])[0].checked){
				arr.push(alIcon[i]);
			};
		}
		return arr;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
})()
