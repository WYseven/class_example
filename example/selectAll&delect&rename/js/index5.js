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
	var hiddenInput = tools.$(".hiddenInput")[0];

	//导航菜单
	var files_nav = tools.$(".files_nav")[0];

	var allSelected = tools.$(".allSelected")[0];  //全选
	var allSelectInput = tools.$(".checkInput",filesSet); // 所有input
	var allIcon = tools.$(".icon",filesSet)

	var seletedNum = 0;  //统计多少条被选中了
	var selectedSpan = tools.$("span",tools.$(".selectNum")[0])[0];

	
	var names = null;

	var info = tools.$(".info")[0];


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
	};
	function getIdItem(id){
		for( var i = 0; i < files.length; i++ ){
			if( files[i].id == id ){
				return files[i];
			}
		}
	}


	tools.addEvent(createFile,"click",function (){

		if( this.isCreateStatus || rename.isRename ){
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
	/*tools.each(allLi,function (itemLi){
		handleLi(itemLi);
	});*/

	var random = Math.floor(Math.random()*1000);
	//保存导航的名字
	var filesNavArr = [{
		fileName:"返回上一级"
	},{
		fileName:"全部文件夹",
		currentId:0
	}
	];

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
			
			info.style.display = "none";

			//放入新建的文件
			/*
				{
					id
					pid
					name

				}
			*/
			if( createFile.isCreateStatus ){
				var n = ++random;
				li.id = n; 
				files.push({
					id:n,
					pid:hiddenInput.value,
					name:names.value
				});
			};
			if( rename.isRename ){
				console.log( li.id );
				var item = getIdItem( li.id );
				console.log( item );
				item.name = names.value;
			}

			//存在store中
			tools.store("baidu",files);

			createFile.isCreateStatus = false;
			rename.isRename = false;
			//阻止冒泡
			ev.stopPropagation();
		})
		//点击取消
		tools.addEvent(cancel,"click",function (ev){
			if( rename.isRename ){
				strong.style.display = "block";
				edtor.style.display = "none";
				names.innerHTML = strong.value;
				rename.isRename = false;
			}else{

				filesSet.removeChild(li);
				createFile.isCreateStatus = false;
			}
			info.style.display = "none";
			ev.stopPropagation();
		})

		tools.addEvent(li,"mouseenter",function (){
			if( !createFile.isCreateStatus && !rename.isRename ){
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
			console.log( this.id );
			getPidChild(this.id);
			hiddenInput.value = this.id;

			console.log( files );

			//每点击一下，把当前文件的名字存起来
			filesNavArr.push( {
				fileName:strong.innerHTML,
				currentId:this.id
			} );
			renderFileNav(filesNavArr);
			seletedNum = 0;
			allSelected.checked = false;
			info.style.display = "none";
			selectedSpan.innerHTML = seletedNum;
		});

		tools.addEvent(checkInput,"click",function (ev){
			if( this.checked ){
				//选中的状态
				allSelected.checked = true;
				//只要有一个没选中，就不选中
				tools.each(allSelectInput,function (input){
					if( !input.checked ){
						allSelected.checked = false;
					}	
				});
				seletedNum++;
				info.style.display = "block";
			}else{
				allSelected.checked = false;
				seletedNum--;

			};
			selectedSpan.innerHTML = seletedNum;
			ev.stopPropagation();	
		})
	};
	var nav_a = tools.$("a",files_nav);
	//渲染文件导航
	function renderFileNav( filesNavArr,startIndex ){
		var str = "",startIndex = startIndex || 0;
		var pId = filesNavArr[filesNavArr.length-2].currentId;
		for( var i = startIndex; i < filesNavArr.length-1; i++ ){
			if(i === 0){
				str += '<a href="javascript:;" class="nav_level" currentId='+pId+'>'+filesNavArr[i].fileName+'</a>|';
			}else{
				str += '<a href="javascript:;" currentId='+filesNavArr[i].currentId+' class="nav_level">'+filesNavArr[i].fileName+'</a>>>>';
			}
		}
		str += '<span>'+filesNavArr[filesNavArr.length-1].fileName+'</span>';

		files_nav.innerHTML = str;

		//找到所有的a
		
	}

	tools.addEvent(files_nav,"click",function (ev){
		var target = ev.target;
		if( target.nodeName === "A" ){
			var currentId = target.getAttribute("currentId");

			console.log( currentId );

			filesSet.innerHTML = "";
			getPidChild(currentId);
			//每点击一下，把当前文件的名字存起来
			
			tools.each(filesNavArr,function (item,index){
				if( currentId == item.currentId ){
					filesNavArr.length = index+1;
				}
			});
			startIndex = 0;
			if( currentId == 0 ){
				startIndex = 1;
			}

			renderFileNav(filesNavArr,startIndex);
		}		
	})	

	function cancelStyle(li){
		var icon = tools.$(".icon",li)[0];
		var checkInput = tools.$(".checkInput",li)[0];
		icon.style.borderColor = "#fff";	
		checkInput.style.display = "none";
		checkInput.checked = false;
	};

	

	//点击全选
	tools.addEvent(allSelected,"click",function (){
		var _this = this;
		tools.each(allIcon,function (item,i){
			allIcon[i].style.borderColor = _this.checked ? "#2e80dc" : "#fff";
			allSelectInput[i].style.display = _this.checked ? "block" : "none";
			allSelectInput[i].checked = _this.checked;	
		});
		seletedNum = this.checked ? allSelectInput.length : 0;
		if( this.checked ){
			info.style.display = "block";
		}else{
			info.style.display = "none";
		};

		selectedSpan.innerHTML = seletedNum;
	});

	var delectItem = tools.$(".delectItem")[0];
	var rename = tools.$(".rename")[0];

	tools.addEvent(delectItem,"click",function (){
		var selected = whoSelect();
		console.log( selected );
		tools.each(selected,function (item,i){
			filesSet.removeChild(item);
		});
		allSelected.checked = false;
		info.style.display = "none";
	});

	tools.addEvent(rename,"click",function (){
		
		var selected = whoSelect();
		if( selected.length === 1 ){
			if( this.isRename){
				names.select();
				return;
			}
			this.isRename = true;
			var checkInput = tools.$(".checkInput",selected[0])[0];
			var strong = tools.$("strong",selected[0])[0];
			var edtor = tools.$(".edtor",selected[0])[0];
			var newNames = tools.$(".names",selected[0])[0];
			strong.style.display = "none";
			edtor.style.display = "block";
			newNames.select();
			checkInput.checked = false;
			names = newNames;
			seletedNum = 0;
			selectedSpan.innerHTML = seletedNum;
		}
	})

	//判断有多少个被选中了
	function whoSelect(){
		var arr = [];
		for( var i = 0; i < allSelectInput.length; i++ ){
			if(allSelectInput[i].checked){
				arr.push(tools.parents(allSelectInput[i],"LI"));
			};
		}
		return arr;
	};


})()
