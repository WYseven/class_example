var list = [
	{
		id:1,
		title:"hello,vuejs",
		isSelected:true
	},
	{
		id:2,
		title:"hello,vuejs2",
		isSelected:true
	}
];

//先渲染数据,拼写模板，在模板中做判断

function itemHtml(options){
	var newLi = $(`<li data-id="${options.id}"></li>`);
	var html = `<div class="view">
                    <input class="toggle" type="checkbox"/>
                    <label>${options.title}</label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="${options.title}">`;	

        newLi.html(html);

        var completed = options.isSelected ? 'completed' : '';

        newLi.find(".toggle").prop("checked",options.isSelected);
        newLi.addClass(completed).data("id",options.id);

    return newLi;
}
//先拿到hash
var active = '#all';
hashchangeFn();

var filtersA = $(".filters a");

var filters = {
	"#all":function (){
		return list.map(function (item){
			return item;
		});	
	},
	"#active":function (){
		return list.filter(function (item){
			return !item.isSelected;
		});	
	},
	"#completed":function (){
		return list.filter(function (item){
			return item.isSelected;
		});	
	}
}

function render(){
	var list2 = filters[active]();

	//根据数据渲染出页面结构
	list2.forEach(function (item){
		$(".todo-list").append(itemHtml(item));
	});
	filtersA.removeClass('selected');
	switch(active){
		case '#all':
			filtersA.eq(0).addClass("selected");
		break
		case '#active':
			filtersA.eq(1).addClass("selected");
		break
		case '#completed':
			filtersA.eq(2).addClass("selected");
		break
	}
}
render();

//获取所有的input[type="checkbox"]
var allCheckboxs = $(".todo-list").find("input[type='checkbox']");

//获取所有的li
var allLi = $(".todo-list").find("li");

//获取strong
var strong = $(".todo-count strong");



//全选是否选中，取决于数据的isSelected是否全为true
function isAddSelect(){
	var num = 0;
	list.forEach(function (item){
		if( item.isSelected ){
			num++;
		}
	});
	return num;
}

$(".toggle-all").prop('checked',isAddSelect() == list.length);
strong.text(list.length-isAddSelect());


//单条信息input的change
$(".todo-list").on("change","input[type='checkbox']",function (){
	var isSelected = $(this).prop("checked");
	if( isSelected ){
		$(this).parents("li").addClass("completed");
	}else{
		$(this).parents("li").removeClass("completed");
	}
	//同时更新数据
	var id = $(this).parents("li").data("id");
	var i = 0;
	var oneList = list.find(function (item,index){
		i = index;
		return id == item.id	
	});

	oneList.isSelected = isSelected;

	$(".toggle-all").prop('checked',isAddSelect() == list.length);
	strong.text(list.length-isAddSelect());

	list.splice(i,1,oneList);

})
.on("click",'.destroy',function (){
	var id = $(this).parents("li").data("id");
	//同时更新数据
	var id = $(this).parents("li").data("id");
	console.log(id);
	list = list.filter(function (item){
		return id != item.id	
	});
	if( list.length ){
		$(".todo-list").html("");
		list.forEach(function (item){
			$(".todo-list").append(itemHtml(item));
		});
	}else{
		$(".todo-list").html("");
	}

	$(".toggle-all").prop('checked',isAddSelect() == list.length);
	strong.text(list.length-isAddSelect());
})



$(".new-todo").on("keyup",function (ev){
	if( ev.keyCode === 13 ){
		var singleItem = {
			id:Math.random(),
			title:$(this).val(),
			isSelected:false
		}
		list.push(singleItem);
		$(".todo-list").append(itemHtml(singleItem));	

		$(this).val("");
		$(".toggle-all").prop('checked',isAddSelect() == list.length);
		strong.text(list.length-isAddSelect());
	};
});

$(".toggle-all").on("change",function (){
	var allCheckboxs = $(".todo-list").find("input[type='checkbox']");
	//获取所有的li
	var allLi = $(".todo-list").find("li");
	var checked = $(this).prop('checked');

	allCheckboxs.prop("checked",checked);

	if( checked ){
		allLi.addClass('completed');
	}else{
		allLi.removeClass('completed');
	}

	//改变数据

	list.forEach(function (item){
		item.isSelected = checked;
	})

	strong.text(list.length-isAddSelect());
});


//监控has


function hashchangeFn(){
	var hash = window.location.hash;
	if( hash ){
		active = hash;
	}

	
}

window.addEventListener('hashchange',function (){
	hashchangeFn();
	$(".todo-list").html("");
	render();	
});

