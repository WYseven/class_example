(function(){
	
	function createLi(){
		var li = document.createElement("li");
		var str =   '<div class="icon">'
							+'<input type="checkbox"  class="checkInput" />'
						+'</div>'
						+'<strong style="display:block;">123</strong>'
						+'<div class="clearFix edtor"  style="display:none;">'
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

	

	tools.addEvent(createFile,"click",function (){
		var newLi = createLi();
		filesSet.appendChild(newLi);

		var icon = tools.$(".icon",newLi)[0];
		var checkInput = tools.$(".checkInput",newLi)[0];
		tools.addEvent(newLi,"mouseenter",function (){
			icon.style.borderColor = "#2e80dc";	
			checkInput.style.display = "block";	
		})
		tools.addEvent(newLi,"mouseleave",function (){
			icon.style.borderColor = "#fff";	
			checkInput.style.display = "none";	
		});

		//handleLi(newLi);
	});










	/*tools.each(allLi,function (itemLi){
		handleLi(itemLi)
	});

	function handleLi(li){

		var icon = tools.$(".icon",li)[0];
		var checkInput = tools.$(".checkInput",li)[0];

		tools.addEvent(li,"mouseenter",function (){
			icon.style.borderColor = "#2e80dc";	
			checkInput.style.display = "block";	
		})
		tools.addEvent(li,"mouseleave",function (){
			icon.style.borderColor = "#fff";	
			checkInput.style.display = "none";	
		});
	}*/









})()
