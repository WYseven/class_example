/*TMODJS:{"version":20,"md5":"7df7f340f5fb4d5fb1a6f1506dbad92a"}*/
template('case_right_temp',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,caseTitle=$data.caseTitle,publishTime=$data.publishTime,caseDescription=$data.caseDescription,caseThumbnail=$data.caseThumbnail,caseWebsite=$data.caseWebsite,$out='';$out+='<div class="right_content"> <h3 class="case_bt2">';
$out+=$escape(caseTitle);
$out+='</h3> <p class="case_time">发布时间：';
$out+=$escape(publishTime);
$out+='</p> <p class="case_decoration">';
$out+=$escape(caseDescription);
$out+='</p> <img src="';
$out+=$escape(caseThumbnail);
$out+='" class="case_exp"/> <div class="case_share clearfix"> <div class="case_sharebtn"> <a class="case_btn" target="_blank" href="';
$out+=$escape(caseWebsite);
$out+='" />点击预览</a> </div> <div class="case_sharelink clearfix"> <span>分享至：</span> <a href="#" class="weibo"></a> <a href="#" class="kongjian"></a> <a href="#" class="weixin"></a> <a href="#" class="qq"></a> <a href="#" class="douban"></a> </div> </div> </div>';
return new String($out);
});