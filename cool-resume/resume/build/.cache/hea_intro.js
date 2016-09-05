/*TMODJS:{"version":56,"md5":"090d4b4de4fd0216fc654134d54eff5b"}*/
template('hea_intro',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,userInfo=$data.userInfo,$out='';$out+='<div class="hea_intro"> <div class="high_light">  <div class="header"> <div class="hea_con"> <div class="hea_left"> <h3>';
$out+=$escape(userInfo.userName);
$out+='</h3> <p>';
$out+=$escape(userInfo.jobWant);
$out+='</p> </div> <div class="hea_right"> <div class="hea_qq">';
$out+=$escape(userInfo.userQQ);
$out+='</div> <div class="hea_mail">';
$out+=$escape(userInfo.userEmail);
$out+='</div> </div> </div> </div>  <div class="intro clearfix"> <div class="intro_con clearfix"> <div class="intro_left"> <p>';
$out+=$escape(userInfo.motto);
$out+='</p> </div> <div class="intro_right"> <div class="pic"></div> <div class="intro_detail"> <ul> <li> <div class="detail_left"> <p>手机</p> </div> <div class="detail_right intro_first"> <p class="intro_firstcon">';
$out+=$escape(userInfo.userPhone);
$out+='</p> </div> <div class="intro_circle"></div> </li> <li> <div class="detail_left"> <p>籍贯</p> </div> <div class="detail_right"> <p>';
$out+=$escape(userInfo.userOrignPlace);
$out+='</p> </div> <div class="intro_circle"></div> </li> <li> <div class="detail_left"> <p>所在地</p> </div> <div class="detail_right"> <p>';
$out+=$escape(userInfo.userSeatPlace);
$out+='</p> </div> <div class="intro_circle"></div> </li> <li> <div class="detail_left"> <p>微博</p> </div> <div class="detail_right"> <p>';
$out+=$escape(userInfo.userWeibo);
$out+='</p> </div> <div class="intro_circle"></div> </li> <li> <div class="detail_left"> <p>自我评价</p> </div> <div class="detail_right"> <p>';
$out+=$escape(userInfo.userAssessment);
$out+='</p> </div> <div class="intro_circle"></div> </li> <li> <div class="detail_left"> <p>爱好</p> </div> <div class="detail_right"> <p> ';
$out+=$escape($helpers. arrayJoin(userInfo.userHobby , "、"));
$out+=' </p> </div> <div class="intro_circle"></div> </li> <li> <div class="detail_left"> <p>个人奖项</p> </div> <div class="detail_right intro_last"> <p class="intro_lastcon">';
$out+=$escape($helpers. arrayJoin(userInfo.userAward , "、"));
$out+='</p> </div> <div class="intro_circle"></div> </li> </ul> </div> </div> </div> </div> </div> </div> ';
return new String($out);
});