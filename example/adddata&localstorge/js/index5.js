(function(){

	//localStorage 中没有 key值为 miaov 的数据 没有话 存一个
	//有的话，拿出来使用，渲染在页面中

	var datas = tools.store("miaov"); // [] {}
	//注意 对象没有length undefined
	if( datas &&　!datas.files ){
	//如果在localStorage中没有取到数据，就走默认的数据，并且存在localStorage
		datas = data;
		tools.store("miaov",datas);
	}


	
	var filesSet = tools.$(".filesSet")[0];
	//创建文件夹按钮
	var createFile = tools.$(".createFile")[0];

	//获取到所有的li
	var allLi = tools.$("li",filesSet);
	//隐藏的input
	var hiddenInput = tools.$(".hiddenInput")[0];

	//导航菜单
	var files_nav = tools.$(".files_nav")[0];

	
	var names = null;

	//拿到数据，渲染在页面中，根据pid渲染，初始的时候pid = 0;
console.log( datas );
	getPidChild(0);
	//通过父id找到并渲染子目录
	function getPidChild(pid){
		console.log( datas );
		for( var i = 0; i < datas.files.length; i++ ){
			console.log( datas.files[i].pid == pid );
			if( datas.files[i].pid == pid ){
				var li = createLi({
					name:datas.files[i].name,
					id:datas.files[i].id //生成的时候，把id挂载当前的元素上
				});
				filesSet.appendChild(li);
				handleLi(li);
			}
		}
	}


	var random = new Date().getTime();

	//新建文件夹
	tools.addEvent(createFile,"click",function (){

		if( this.isCreateStatus ){
			console.log( names );
			names.select();
			return;
		};
		var newLi = createLi({
			//在新建的时候，给这个li复一个id
			id:random
		});

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
	/*tools.each(allLi,function (itemLi){
		handleLi(itemLi);
	});*/


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

			//点击ok，存一下新建文件的数据
			/*
				{
					id,
					pid,
					name
				}
			*/

			datas.files.push({
				id:li.id,
				pid:hiddenInput.value,
				name:strong.innerHTML
			});

			console.log( datas );

			tools.store("miaov",datas);

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
		});
		tools.addEvent(li,"mouseleave",function (){
			if( !checkInput.checked ){
				icon.style.borderColor = "#fff";	
				checkInput.style.display = "none";	
			}
		});
		tools.addEvent(li,"click",function (){
			//点击li的时候，找当前点击的li的子目录中的数据
			//换句话说，找到数据中pid为当前li的id
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
	};
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
})()
