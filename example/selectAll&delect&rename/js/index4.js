(function(){


	/*tools.store("baidu",data.files);*/

	var files = tools.store("baidu");
	//如果之前store中已经存有数据结构，直接拿出来使用，如果没有存，默认附一个值

	
	function createLi(options){

		options = options || {};

		//传进来的对象，某些调用函数的时候，可能只不会传入很多值，只会传入需要的值

		var defaults = {
			name:options.name || "新建文件夹",
			id:options.id || 0
		};



		var li = document.createElement("li");
		var str =   '<div class="icon">'
							+'<input type="checkbox"  class="checkInput" />'
						+'</div>'
						+'<strong>'+defaults.name+'</strong>'
						+'<div class="clearFix edtor">'
							+'<input type="text" value="'+defaults.name+'" class="names"  />'
							+'<input type="button" value="√" class="ok" />'
							+'<input type="button" value="×" class="cancel" />'
						+'</div>';
				;
		
		li.innerHTML = str;
		li.id = defaults.id;
		return li;
	}


	var filesSet = tools.$(".filesSet")[0];
	//创建文件夹按钮
	var createFile = tools.$(".createFile")[0];

	//获取到所有的li
	var allLi = tools.$("li",filesSet);
	//隐藏的input
	var hiddenInput = tools.$(".hiddenInput")[0]

	
	var names = null;


	//先渲染数据

	//传入指定id，渲染指定id下的子元素

	getPidChild(0);

	function getPidChild(id){
		//如果files中没有数据，那么就不再生成li
		if(!files.length){
			return;
		}
		tools.each(files,function (item){
			if( item.pid == id ){

				var newLi = createLi({
					name:item.name,
					id:item.id   //传入id，挂载在生成的li上
				});
				filesSet.appendChild(newLi);
				handleLi(newLi);
			}
		});
	}


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
			cancelStyle(itemLi);
		});
	});

	//初始的时候，给页面中已经存在的li添加事件处理
	tools.each(allLi,function (itemLi){
		handleLi(itemLi);
	});

	var random = 100;

	function handleLi(li){

		var icon = tools.$(".icon",li)[0];
		var checkInput = tools.$(".checkInput",li)[0];
		var ok = tools.$(".ok",li)[0];
		var cancel = tools.$(".cancel",li)[0];
		var strong = tools.$("strong",li)[0];
		var edtor = tools.$(".edtor",li)[0];
		var names = tools.$(".names",li)[0];

		//点击确定
		tools.addEvent(ok,"click",function (ev){

			strong.style.display = "block";
			edtor.style.display = "none";
			strong.innerHTML = names.value;
			createFile.isCreateStatus = false;

			//放入新建的文件
			/*
				{
					id
					pid
					name

				}
			*/

			files.push({
				id:++random,
				pid:hiddenInput.value,
				name:names.value
			});

			//存在store中
			tools.store("baidu",files);


			//阻止冒泡
			ev.stopPropagation();
		})
		//点击取消
		tools.addEvent(cancel,"click",function (ev){
			filesSet.removeChild(li);
			createFile.isCreateStatus = false;
			ev.stopPropagation();
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
		tools.addEvent(li,"click",function (){
			filesSet.innerHTML = "";
			getPidChild(this.id);
			hiddenInput.value = this.id;
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
