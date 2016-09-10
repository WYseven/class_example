/*TMODJS:{"version":47,"md5":"0a4d2ca10e6b2e6a4fc61e8f74b94c57"}*/
template('case_right_temp',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$string=$utils.$string,caseTitle=$data.caseTitle,publishTime=$data.publishTime,caseDescription=$data.caseDescription,caseThumbnail=$data.caseThumbnail,caseWebsite=$data.caseWebsite,$out='';$out+='<div class="content"> <h3 class="case_bt2">';
$out+=$string(caseTitle);
$out+='</h3> <p class="case_time">发布时间：';
$out+=$string(publishTime);
$out+='</p> <p class="case_decoration">';
$out+=$string(caseDescription);
$out+='</p> <img src="';
$out+=$string(caseThumbnail);
$out+='" class="case_exp"/> <div class="case_share clearfix"> <div class="case_sharebtn"> <a class="case_btn" target="_blank" href="';
$out+=$string(caseWebsite);
$out+='" />点击预览</a> </div> <div class="case_sharelink clearfix"> <span>分享至：</span> <a href="#" class="weibo"></a> <a href="#" class="kongjian"></a> <a href="#" class="weixin"></a> <a href="#" class="qq"></a> <a href="#" class="douban"></a> </div> </div> </div> ';
return new String($out);
});