//生成树形菜单方法
function createTreeHtml(datas,id){
	//先找指定id的子数据
	var childs = handle.getChildsById(datas,id);

	var html = "<ul>";

	childs.forEach(function (value){
		//找到当前数据层级
		var level = handle.getParentsAllById(datas,value.id).length;
		//获取这条数据的子数据，目的是用来判断是否要添加带图标的class
		var childs2 = handle.getChildsById(datas,value.id);

		var className = childs2.length ? "tree-contro" : "tree-contro-none";

		html += '<li>'+
                '<div style="padding-left:'+level*14+'px;" class="tree-title '+className+'" data-id="'+value.id+'">'+
                    '<span>'+
                        '<strong class="ellipsis">'+value.title+'</strong>'+
                        '<i class="ico"></i>'+
                    '</span>'+
                '</div>';

                html += createTreeHtml(datas,value.id);	
                html += '</li>';	
	})

	html += "</ul>";

	return html;

}
//生成导航菜单
function createNavHtml(datas,id){
	var parents = handle.getParentsAllById(datas,id).reverse();	
	var len = parents.length;
	//渲染下标从0到length-1
	var navHtml = '';
	for( var i = 0; i < len-1; i++ ){
		navHtml += '<a href="javascript:;" data-id="'+parents[i].id+'" style="z-index:'+(len-i)+';">'+parents[i].title+'</a>';
	}

	navHtml += '<span class="current-path" style="z-index:0;">'+parents[len-1].title+'</span>';

	return navHtml;
}
//生成文件区域
function createFileHtml(datas,id){
	var fileChilds = handle.getChildsById(datas,id);
	var fileHtml = '';
	fileChilds.forEach(function (value){
		fileHtml += `<div class="file-item" data-id="${value.id}">
                          ${fileHtmlFn(value)}
                     </div>`;
	});

	return fileHtml;
}
//文件的结构
function fileHtmlFn(value){

	var str = `<div class="item">
                 <lable class="checkbox"></lable>
                     <div class="file-img">
                     <i></i>
                     </div>
                 <p class="file-title-box">
                     <span class="file-title">${value.title}</span>
                     <span class="file-edtor">
                         <input class="edtor" type="text">
                     </span>
                 </p>
             </div>`

    return str;	
}
//通过生成元素创建文件
function createFileElement(){
	var div = document.createElement("div");
	div.className = "file-item";
	div.innerHTML = fileHtmlFn({})
	return div;

}