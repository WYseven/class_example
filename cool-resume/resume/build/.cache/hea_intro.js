/*TMODJS:{"version":57,"md5":"0827b02b0a17af52c54eb957d4c7a064"}*/
template('hea_intro',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$string=$utils.$string,userInfo=$data.userInfo,$out='';$out+='<div class="hea_intro"> <div class="high_light">  <div class="header"> <div class="hea_con"> <div class="hea_left"> <h3>';
$out+=$string(userInfo.userName);
$out+='</h3> <p>';
$out+=$string(userInfo.jobWant);
$out+='</p> </div> <div class="hea_right"> <div class="hea_qq">';
$out+=$string(userInfo.userQQ);
$out+='</div> <div class="hea_mail">';
$out+=$string(userInfo.userEmail);
$out+='</div> </div> </div> </div>  <div class="intro clearfix"> <div class="intro_con clearfix"> <div class="intro_left"> <p>';
$out+=$string(userInfo.motto);
$out+='</p> </div> <div class="intro_right"> <div class="pic"></div> <div class="intro_detail"> <ul> <li> <div class="detail_left"> <p>手机</p> </div> <div class="detail_right intro_first"> <p class="intro_firstcon">';
$out+=$string(userInfo.userPhone);
$out+='</p> </div> <div class="intro_circle"></div> </li> <li> <div class="detail_left"> <p>籍贯</p> </div> <div class="detail_right"> <p>';
$out+=$string(userInfo.userOrignPlace);
$out+='</p> </div> <div class="intro_circle"></div> </li> <li> <div class="detail_left"> <p>所在地</p> </div> <div class="detail_right"> <p>';
$out+=$string(userInfo.userSeatPlace);
$out+='</p> </div> <div class="intro_circle"></div> </li> <li> <div class="detail_left"> <p>微博</p> </div> <div class="detail_right"> <p>';
$out+=$string(userInfo.userWeibo);
$out+='</p> </div> <div class="intro_circle"></div> </li> <li> <div class="detail_left"> <p>自我评价</p> </div> <div class="detail_right"> <p>';
$out+=$string(userInfo.userAssessment);
$out+='</p> </div> <div class="intro_circle"></div> </li> <li> <div class="detail_left"> <p>爱好</p> </div> <div class="detail_right"> <p> ';
$out+=$string($helpers. arrayJoin(userInfo.userHobby , "、"));
$out+=' </p> </div> <div class="intro_circle"></div> </li> <li> <div class="detail_left"> <p>个人奖项</p> </div> <div class="detail_right intro_last"> <p class="intro_lastcon">';
$out+=$string($helpers. arrayJoin(userInfo.userAward , "、"));
$out+='</p> </div> <div class="intro_circle"></div> </li> </ul> </div> </div> </div> </div> </div> </div> ';
return new String($out);
});