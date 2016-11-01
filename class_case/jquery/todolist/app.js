

var list = [
	{
		id:1,
		title:"hello,vuejs",
		isSelected:true
	},
	{
		id:2,
		title:"hello,vuejs2",
		isSelected:false
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


list.forEach(function (item){
	$(".todo-list").append(itemHtml(item));
});


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

	list.splice(i,1,oneList);

	console.log( list );

})
.on("click",'.destroy',function (){
	console.log(123);
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
	};

	
})