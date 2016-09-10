//通过某个连接符把数组转化为字符串
template.helper("arrayJoin",function (data,format){
	return data.join(format);
});
//通过这个方法决定是否要添加class
template.helper("isAddClass",function (data,bl){
	return bl ? data : "";
});
//向上取整,返回一个数组
template.helper("mathCeil",function (data,bl){
	var arr = [];
	for( var i = 0; i < Math.ceil(data); i++ ){
		arr.push(i);
	}
	return arr;
});


//给每一个案例上加一个id
var isDisplay = true;
var initShow = true;
for( var i = 0; i < casees.length; i++ ){
	casees[i].id = "miaov_"+(i+1);
	if( casees[i].isDisplay ) isDisplay = false;
	for( var j = 0; j < casees[i].caseList.length; j++ ){
		casees[i].caseList[j].id = casees[i].id+"_"+(j+1);
		if( casees[i].caseList[j].initShow ) initShow = true;
	}
}
//默认展示的案例为第一个的第一个案例
if( isDisplay ){
	casees[0].isDisplay = true;
}
if( initShow ){
	casees[0].caseList[0].initShow = true;
}

//准备技能展示的分页数据
var pageNum = Math.ceil(skills.skillsClassify.length/3);

skills.pageArr = [];
var n = 0;
for( var i = 0; i < pageNum; i++ ){
	skills.pageArr = skills.pageArr.concat([skills.skillsClassify.slice(n,n+3)]);
	n+=3;
}

var datas = {
	userInfo:userInfo,
	skills:skills,
	timeAxis:timeAxisArr,
	casees:casees,
	projects:projects
}

if( theme.theme === "red" ){
	document.body.id = 'red';
}else if(theme.theme === "blue"){
	document.body.id = 'blue';
}


var html = template('init', datas);
document.getElementById('resume_content').innerHTML = html;


