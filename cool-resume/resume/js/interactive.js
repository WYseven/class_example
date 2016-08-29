
var skills = tools.$(".skills")[0];
setTimeout(function (){
	skills.style.opacity = 1;	
},0)


//圆环
var skills_canval_circle = tools.$(".skills_canval_circle")[0];

var data = {
	W:590,
	data:[
		['PhotoShop',0.722],
		['Canvas',0.65],
		['CSS3',0.44],
		['React',0.86],
		['Node.js',0.55],
		['backbone',0.4],
		['ES6',0.47],
		['JavaScript',0.80],
		['other',1]
	]
};
setTimeout(function (){
	var halo = H5_Component_Halo(data);
	skills_canval_circle.appendChild(halo);	
},0)

var case_left = tools.$(".case_left")[0];
var case_ul = tools.$("ul",case_left);
var case_all_li = tools.$("li",case_left);
var allEm = tools.$("em",case_left);

function getCaseById(casees,_id){
	for( var i = 0; i < casees.length; i++ ){
		for( var j = 0; j < casees[i].caseList.length; j++ ){
			if( casees[i].caseList[j].id == _id ){
				return casees[i].caseList[j];
			}
		}
	}
}

var isRender = null;
tools.addEvent(case_left,"click",function (ev){
	var target = ev.target;
	
	if( tools.parents(target,".case_listbt1") ){
		target = tools.parents(target,".case_listbt1");
		var next = tools.next(target);
		var icon = tools.$("em",target)[0];
		for( var i = 0; i < case_ul.length; i++ ){
			if(next !== case_ul[i]) {
				case_ul[i].style.display = "none";
				allEm[i].className = "add ";
			}
		}
		next.style.display = next.style.display === "block" ? "none" : "block";
		icon.className = next.style.display === "block" ? "unload" : "add";

	}else if( tools.parents(target,".case_li1") ){
		target = tools.parents(target,".case_li1");
		var _id = target.getAttribute("_id");
		if( _id === isRender ) return;
		//找到数据，重新渲染
		var oneCase = getCaseById(casees,_id);

		var html = template('case_right_temp', oneCase);
		tools.$(".case_right")[0].innerHTML = html;

		isRender = _id;

		for( var i = 0; i < case_all_li.length; i++ ){
			tools.removeClass(case_all_li[i],"hoverStyle");
		}

		//给当前点击的li添加class
		tools.addClass(target,"hoverStyle");
	}

	ev.preventDefault();
})