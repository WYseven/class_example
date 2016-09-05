
var skills = tools.$(".skills")[0];
var topDetail = tools.$(".top_detail")[0];
var skillLeft = tools.$(".left",topDetail)[0];
var pages = tools.$(".pages",skillLeft)[0];
var pageLi = tools.$("li",pages);
var skillLanguage = tools.$(".skillLanguage",skillLeft);

var prev = 0;

//给按钮添加点击处理
for( var i = 0; i < pageLi.length; i++ ){
	pageLi[i].index = i;
	tools.addEvent(pageLi[i],"mouseover",function (ev){
		if( prev === this.index ) return;
		var _this = this;
		MTween(skillLanguage[prev],{opacity: 0},300,"linear",function (){
			skillLanguage[prev].style.display = "none";
			skillLanguage[_this.index].style.display = "block";
			MTween(skillLanguage[_this.index],{opacity: 1},300,"linear")	
			prev = 	_this.index;

		});

		tools.removeClass(pageLi[prev],"pages_select");
		tools.addClass(this,"pages_select");

		
	});
}

//圆环
var skills_canval_circle = tools.$(".skills_canval_circle")[0];

//通过数据拿到要展示的数据

var skilsData = datas.skills.skillsClassify;
var customData = [];
for( var i = 0; i < skilsData.length; i++ ){
	customData.push([skilsData[i].skillLanguage,parseFloat(skilsData[i].percent)/100])
}

var data = {
	W:590,
	data:customData,
	animationEnd:function (){
		MTween(skillLeft,{opacity: 1},30);
	}
};
setTimeout(function (){
	var halo = H5_Component_Halo(data);
	skills_canval_circle.appendChild(halo.componentHtml());	
},0)

var case_left = tools.$(".case_left")[0];
var case_ul = tools.$("ul",case_left);
var case_all_li = tools.$("li",case_left);
var allEm = tools.$("em",case_left);
var case_main = tools.$(".case_main")[0];
var case_list_main = tools.$(".case_list_main")[0];

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
tools.addEvent(case_list_main,"click",function (ev){
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

	case_list_main.style.top = -scale * mainMaxJL + 'px';
	//滚动条高度
	changeScrollH();
	ev.preventDefault();
});

//自定义滚动条

var case1 = tools.$(".case1")[0];

changeCaseH();
function changeCaseH(){
	var h = tools.view().H  - 60;
	if( h < 400 ){
		h = 400;
	}
	case_main.style.height = h-120 + 'px';	
	case1.style.height = h + 'px';	
}

tools.addEvent(window,"resize",changeCaseH);

var case_left = tools.$(".case_left")[0];
var list_scroll = tools.$(".list_scroll")[0];
var list_bar = tools.$(".list_bar")[0];


var mainMaxJL = 0;
var maxJL = 0;

var wenH = 0;
changeScrollH();



function changeScrollH(){
	//文档高度
	var clientH = case_left.clientHeight;
	
	//内容高度
	var contentH = case_list_main.scrollHeight;
	console.log( wenH,contentH,clientH );

	//内容那个滚动条滚动的最大距离
	mainMaxJL = contentH - clientH;

	wenH = contentH;

	//滚动条的高度

	list_bar.style.height = clientH/contentH * clientH + 'px';
	//滚动条滚动的最大距离
	maxJL = clientH - list_bar.offsetHeight;

	

	changeScrollT();
}


tools.addEvent(window,"resize",changeScrollH);

function changeScrollT(){
	var t = case_list_main.offsetTop;
	var scrollT = list_bar.offsetTop;

	if( t < -mainMaxJL ){
		case_list_main.style.top = -mainMaxJL +'px';
		list_bar.style.top = maxJL + 'px';
	}
	if( scrollT > maxJL ){
		list_bar.style.top = maxJL + 'px';
	}


}

var scale = 0;

list_bar.onmousedown = function (ev){
	var disY = ev.clientY - list_bar.offsetTop;

	document.onmousemove = function (ev){

		//限制范围
		var t = ev.clientY - disY;

		if( t < 0  ) t = 0;

		if( t > maxJL ) t = maxJL;

		// t就是滚动条滚动的top值
		//走的距离会得到一个比例
		scale = t / maxJL;


		list_bar.style.top = t + "px";

		case_list_main.style.top = -scale * mainMaxJL + 'px';
	};

	document.onmouseup = function (ev){
		document.onmouseup  =document.onmousemove = null;	
	};

	ev.preventDefault();
};

//添加上滚动条
tools.mouseWheel(case_left,function (){
	var t = list_bar.offsetTop - 5;
	if( t < 0  ) t = 0;

	// t就是滚动条滚动的top值
	//走的距离会得到一个比例
	scale = t / maxJL;


	list_bar.style.top = t + "px";

	case_list_main.style.top = -scale * mainMaxJL + 'px';	
},function (){
	var t = list_bar.offsetTop + 5;

	if( t > maxJL ) t = maxJL;

	// t就是滚动条滚动的top值
	//走的距离会得到一个比例
	scale = t / maxJL;


	list_bar.style.top = t + "px";

	case_list_main.style.top = -scale * mainMaxJL + 'px';	
})




