//通过某个连接符把数组转化为字符串
template.helper("arrayJoin",function (data,format){
	return data.join(format);
});
//通过这个方法决定是否要添加class
template.helper("isAddClass",function (data,bl){
	return bl ? data : "";
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

var datas = {
	userInfo:userInfo,
	timeAxis:timeAxisArr,
	casees:casees,
	projects:projects
}

var html = template('init', datas);
document.getElementById('resume_content').innerHTML = html;


