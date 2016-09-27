/*TMODJS:{"version":112,"md5":"b7ea8f4b25be04da9416a3554cd4f07c"}*/
template('hea_intro',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,userInfo=$data.userInfo,$string=$utils.$string,images=$data.images,icon=$data.icon,intro_03=$data.intro_03,$each=$utils.$each,$value=$data.$value,$index=$data.$index,$out='';$out+='<div class="hea_intro"> <div class="high_light">  <div class="header"> <div class="hea_con"> <div class="hea_left"> ';
if(userInfo.userName){
$out+=' <h3>';
$out+=$string(userInfo.userName);
$out+='</h3> ';
}
$out+=' ';
if(userInfo.jobWant){
$out+=' <p>';
$out+=$string(userInfo.jobWant);
$out+='</p> ';
}
$out+=' </div> <div class="hea_right"> ';
if(userInfo.userQQ){
$out+=' <div class="hea_qq">';
$out+=$string(userInfo.userQQ);
$out+='</div> ';
}
$out+=' ';
if(userInfo.userEmail){
$out+=' <div class="hea_mail">';
$out+=$string(userInfo.userEmail);
$out+='</div> ';
}
$out+=' </div> </div> </div>  <div class="intro clearfix" id="intro"> <div class="intro_con clearfix"> <table class="intro_table" id="intro_table"> <tr> <td> <div class="intro_left"> ';
if(userInfo.motto){
$out+=' <p> ';
$out+=$string(userInfo.motto);
$out+=' <span></span> </p> ';
}
$out+=' </div> </td> </tr> </table> <div class="intro_right"> <div class="pic"> <img src="';
$out+=$string(userInfo.userPortrait || images/icon/intro_03.png);
$out+='" /> </div> <div class="intro_detail"> <ul> ';
$each(userInfo.newUserInfo,function($value,$index){
$out+=' <li> <div class="detail_left"> <p>';
$out+=$string($value.title);
$out+='</p> </div> <div class="detail_right intro_first"> ';
if((typeof $value.content !== "object")){
$out+=' <p class="intro_firstcon">';
$out+=$string($value.content);
$out+='</p> ';
}
$out+=' ';
if((typeof $value.content === "object")){
$out+=' <p class="intro_firstcon">';
$out+=$string($helpers. arrayJoin($value.content , "、"));
$out+='</p> ';
}
$out+=' </div> <div class="intro_circle"></div> </li> ';
});
$out+=' </ul> </div> </div> </div> </div> </div> </div> ';
return new String($out);
});