
//圆环图的交互
if( datas.skills.temp === "circle" ){
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
}else if(datas.skills.temp === "columns"){//柱状图的交互
	var bottom_detail = tools.$(".bottom_detail")[0];
	var detail = tools.$(".detail",bottom_detail);

	var subject_circle = tools.$(".subject_circle",detail[0])[0];
	var subject_con = tools.$(".subject_con",detail[0])[0];



	for( var i = 0; i < detail.length; i++ ){
		(function (i){
			setTimeout(function (){
				var w = detail[i].getAttribute("data-width");
				MTween(detail[i],{width:w},500,"elasticBoth",function (){
					
				});
				//detail[i].style.width = w;

			},i*50);
		})(i);

		detail[i].onmouseover = function (){
			var subject_circle = tools.$(".subject_circle",this)[0];
			var subject_con = tools.$(".subject_con",this)[0];
			subject_con.style.display = "block";
			subject_circle.style.display = "block";
			subject_con.style.left = subject_circle.offsetLeft-subject_con.offsetWidth/2 + 'px';		
			MTween(subject_con,{opacity: 1},500);
			MTween(subject_circle,{opacity: 1},500);
		};
		detail[i].onmouseout = function (){
			var subject_circle = tools.$(".subject_circle",this)[0];
			var subject_con = tools.$(".subject_con",this)[0];
				MTween(subject_con,{opacity: 0},500,"linear",function (){
					subject_con.style.display = "none";
					subject_circle.style.display = "none";	
				});
				MTween(subject_circle,{opacity: 0},500);
		};

	}	

}




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
		rightContent.innerHTML = html;
		rightContent.style.top = 0;

		isRender = _id;

		for( var i = 0; i < case_all_li.length; i++ ){
			tools.removeClass(case_all_li[i],"hoverStyle");
		}

		//给当前点击的li添加class
		tools.addClass(target,"hoverStyle");
	}

	//滚动条高度
	/*changeScrollHeight();
	changeRightScrollHeight();*/

	setTimeout(function (){
		changeScrollHeight();
		changeRightScrollHeight();
		changeImgSize();	
	},0)

	
	ev.preventDefault();
});

//自定义滚动条

var case1 = tools.$(".case1")[0];



tools.addEvent(window,"resize",changeCaseH);

var case_left = tools.$(".case_left")[0];
var list_scroll = tools.$(".list_scroll")[0];
var list_bar = tools.$(".list_bar")[0];

var main = case_left,
	content = case_list_main,
	scrollBar = list_bar,
	scroll = list_scroll;
var contentMaxJL = 0,scrollMaxJL = 0;

changeScrollHeight();
//重新计算所有的数据，重新设置滚动条的高度和top值
function changeScrollHeight(){
	//文档高度
	var clientH = main.clientHeight;
	//内容高度
	var contentHeight = content.scrollHeight;

	//文档能够滚动的最大距离
	contentMaxJL = Math.round(contentHeight - clientH);
	//设置的top高于最大值
	if(contentHeight > clientH &&  Math.abs(content.offsetTop) > contentMaxJL ){
		content.style.top = -Math.round(contentMaxJL) + 'px';
	}else if(contentHeight <= clientH){
		content.style.top = 0 + 'px';
	}
	
	//计算出滚动条的高度
	scrollBar.style.height = Math.round(clientH/contentHeight * clientH)+ 'px';
	//滚动条能滚动的最大距离
	
	if( clientH >= contentHeight ){
		scroll.style.display = 'none';
	}else{
		scroll.style.display = 'block';
	}
	scrollMaxJL = Math.round(clientH - scrollBar.offsetHeight);
	//重新计算滚动条的top值
	scrollBar.style.top = Math.round(Math.abs(content.offsetTop)/contentMaxJL*scrollMaxJL) + 'px';
}
tools.addEvent(scrollBar,"mousedown",function (ev){
	var disY = ev.clientY - scrollBar.offsetTop;

	document.onmousemove = function (ev){
		//限制范围
		var t = ev.clientY - disY;
		changeScrollTop(t);
	};
	document.onmouseup = function (ev){
		document.onmouseup  =document.onmousemove = null;	
	};
	ev.preventDefault();
})

function changeScrollTop(t){
	if( t < 0  ) t = 0;
	if( t > scrollMaxJL ) t = scrollMaxJL;
	// t就是滚动条滚动的top值
	//走的距离会得到一个比例
	scale = t / scrollMaxJL;

	scrollBar.style.top = Math.round(t) + "px";
	content.style.top = -Math.round(scale * contentMaxJL) + 'px';	
}


tools.mouseWheel(main,function (ev){
	if( scrollBar.offsetHeight !== 0 ){
		var t = scrollBar.offsetTop - 5;	
		changeScrollTop(t);
		ev.preventDefault();
	}
},function (ev){
	if( scrollBar.offsetHeight !== 0 ){
		var t = scrollBar.offsetTop + 5;	
		changeScrollTop(t);
		ev.preventDefault();
	}	
})

changeCaseH();
function changeCaseH(){
	var h = tools.view().H  - 60;
	if( h < 400 ){
		h = 400;
	}
	case_main.style.height = h-120 + 'px';	
	case1.style.height = h + 'px';

	changeScrollHeight();	
}

//左侧滚动条
var rightSrcoll = tools.$(".right_srcoll")[0];
var rightBar = tools.$(".right_bar")[0];

var rightMain = tools.$(".right_main")[0];
var rightContent = tools.$(".content",rightMain)[0];
var rightContentMaxJL = 0,rightScrollMaxJL = 0;






setTimeout(function (){
	changeRightScrollHeight();	
},0)
var n = 0;
//重新计算所有的数据，重新设置滚动条的高度和top值
function changeRightScrollHeight(){
	//rightSrcoll.style.height = tools.$(".right_content")[0].offsetHeight + 'px';
	//文档高度
	var clientH = rightMain.clientHeight;
	//内容高度
	var contentHeight = rightContent.scrollHeight;

	//文档能够滚动的最大距离
	rightContentMaxJL = Math.round(contentHeight - clientH);
	//设置的top高于最大值
	if(contentHeight > clientH &&  Math.abs(rightContent.offsetTop) > rightContentMaxJL ){
		rightContent.style.top = -Math.round(rightContentMaxJL) + 'px';
	}else if(contentHeight <= clientH){
		rightContent.style.top = 0 + 'px';
	}
	//计算出滚动条的高度
	rightBar.style.height = Math.round(clientH/contentHeight * clientH)+ 'px';
	//滚动条能滚动的最大距离
	rightContent.innerHTML = rightContent.innerHTML
	if( clientH >= contentHeight ){
		rightSrcoll.style.display = 'none';
	}else{
		rightSrcoll.style.display = 'block';
	}
	rightScrollMaxJL = Math.round(clientH - rightBar.offsetHeight);
	//重新计算滚动条的top值
	rightBar.style.top = Math.round(Math.abs(rightContent.offsetTop)/rightContentMaxJL*rightScrollMaxJL) + 'px';
}
changeImgSize();
function changeImgSize(){
	var contentImg = tools.$("img",rightContent)[0];
	if( contentImg ){
		contentImg.onload = function (){
			var w = this.offsetWidth;
			var h = this.offsetHeight;
			var scale = w/560;

			if( w > 560 ){
				this.style.width = "560px";
				this.style.height = h / scale + 'px';
			}
		};
	}
}


tools.addEvent(rightBar,"mousedown",function (ev){
	var disY = ev.clientY - rightBar.offsetTop;

	document.onmousemove = function (ev){
		//限制范围
		var t = ev.clientY - disY;
		changeRightScrollTop(t);
	};
	document.onmouseup = function (ev){
		document.onmouseup  =document.onmousemove = null;	
	};
	ev.preventDefault();
})

function changeRightScrollTop(t){
	if( t < 0  ) t = 0;
	if( t > rightScrollMaxJL ) t = rightScrollMaxJL;
	// t就是滚动条滚动的top值
	//走的距离会得到一个比例
	scale = t / rightScrollMaxJL;

	rightBar.style.top = Math.round(t) + "px";
	rightContent.style.top = -Math.round(scale * rightContentMaxJL) + 'px';	
}

tools.addEvent(window,"resize",changeRightCaseH);

function changeRightCaseH(){
	changeRightScrollHeight();	
}
tools.mouseWheel(rightMain,function (ev){
	if( rightBar.offsetHeight !== 0 ){
		var t = rightBar.offsetTop - 5;	
		changeRightScrollTop(t);
		ev.preventDefault();
	}
},function (ev){
	if( rightBar.offsetHeight !== 0 ){
		var t = rightBar.offsetTop + 5;	
		changeRightScrollTop(t);
		ev.preventDefault();
	}	
})
tools.mouseWheel(rightSrcoll,function (){
	if( rightBar.offsetHeight !== 0 ){
		var t = rightBar.offsetTop - 5;	
		changeRightScrollTop(t)
	}
},function (){
	if( rightBar.offsetHeight !== 0 ){
		var t = rightBar.offsetTop + 5;	
		changeRightScrollTop(t)
	}	
})

