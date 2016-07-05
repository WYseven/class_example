(function(){
	
	function createLi(){
		var li = document.createElement("li");
		var str =   '<div class="icon">'
							+'<input type="checkbox"  class="checkInput" />'
						+'</div>'
						+'<strong>123</strong>'
						+'<div class="clearFix edtor">'
							+'<input type="text" value="新建文件夹" class="names"  />'
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

	
	var names = null;


	//先渲染数据

	tools.each(data.files,function (item){
		var newLi = createLi();
		filesSet.appendChild(newLi);
	})

	tools.addEvent(createFile,"click",function (){

		if( this.isCreateStatus ){
			console.log( names );
			names.select();
			return;
		};
		var newLi = createLi();
		filesSet.appendChild(newLi);
		//获取到修改名字的输入框
		names = tools.$(".names",newLi)[0];
		
		//新建的时候，让输入框显示
		var strong = tools.$("strong",newLi)[0];
		var edtor = tools.$(".edtor",newLi)[0];
		strong.style.display = "none";
		edtor.style.display = "block";


		names.select();
		//添加一个正在创建状态
		this.isCreateStatus = true;

		//给新建的li里面的元素添加事件处理程序
		handleLi(newLi);

		//取消掉其他li中所有的样式
		tools.each(allLi,function (itemLi){
			cancelStyle(itemLi)
		});
	});

	//初始的时候，给页面中已经存在的li添加事件处理
	tools.each(allLi,function (itemLi){
		handleLi(itemLi)
	});

	function handleLi(li){

		var icon = tools.$(".icon",li)[0];
		var checkInput = tools.$(".checkInput",li)[0];
		var ok = tools.$(".ok",li)[0];
		var cancel = tools.$(".cancel",li)[0];
		var strong = tools.$("strong",li)[0];
		var edtor = tools.$(".edtor",li)[0];
		var names = tools.$(".names",li)[0];

		//点击确定
		tools.addEvent(ok,"click",function (){

			strong.style.display = "block";
			edtor.style.display = "none";
			strong.innerHTML = names.value;
			createFile.isCreateStatus = false;
		})
		//点击取消
		tools.addEvent(cancel,"click",function (){
			filesSet.removeChild(li);
			createFile.isCreateStatus = false;
		})

		tools.addEvent(li,"mouseenter",function (){
			if( !createFile.isCreateStatus ){
				icon.style.borderColor = "#2e80dc";	
				checkInput.style.display = "block";	
			}
			
		})
		tools.addEvent(li,"mouseleave",function (){
			if( !checkInput.checked ){

				icon.style.borderColor = "#fff";	
				checkInput.style.display = "none";	
			}
		});
	};

	function cancelStyle(li){
		var icon = tools.$(".icon",li)[0];
		var checkInput = tools.$(".checkInput",li)[0];
		icon.style.borderColor = "#fff";	
		checkInput.style.display = "none";
		checkInput.checked = false;

	}




})()
