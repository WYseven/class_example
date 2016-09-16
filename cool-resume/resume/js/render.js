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

//人物信息
var userInfoArr = {
	userName: "姓名" , 
    userPortrait:"头像",
    jobWant:  "职位",
    userQQ:  "QQ",
    userEmail:   "Email",
    motto:  "箴言", 
    userPhone: "手机",
    userOrignPlace:  "籍贯" ,
    userSeatPlace:  "所在地",
    userWeibo: "微博",
    userAssessment: "自我评价",   
    userHobby: '爱好',
    userAward: '个人奖项'

}

var info = ["userPhone","userOrignPlace","userSeatPlace",
"userWeibo","userAssessment","userHobby","userAward"

];

userInfo.newUserInfo = [];
userInfo.newUserInfoArr = [];

for( var i = 0,len = info.length; i < len; i++ ){
	if( userInfo[info[i]] && userInfo[info[i]] !== '' ){
		userInfo.newUserInfo.push({
			title:userInfoArr[info[i]],
			content:userInfo[info[i]]
		})
		
	}
}

//ie8加载柱状图
var browser=navigator.appName 
var b_version=navigator.appVersion 
var version=b_version.split(";"); 

if( version[1] ){

	var trim_Version=version[1].replace(/[ ]/g,""); 

	if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE8.0"){ 
		skills.temp = "columns";
	} 
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


