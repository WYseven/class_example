/*TMODJS:{"version":70,"md5":"dd48fb93f949873c0b63b6374a624446"}*/
template('case_right_temp',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$string=$utils.$string,caseTitle=$data.caseTitle,publishTime=$data.publishTime,caseDescription=$data.caseDescription,caseThumbnail=$data.caseThumbnail,caseWebsite=$data.caseWebsite,$out='';$out+=' <h3 class="case_bt2">';
$out+=$string(caseTitle);
$out+='</h3> <p class="case_time">发布时间：';
$out+=$string(publishTime);
$out+='</p> <p class="case_decoration">';
$out+=$string(caseDescription);
$out+='</p> <div class="case_pic"> <img src="" _src="';
$out+=$string(caseThumbnail);
$out+='" class="case_exp"/> </div> <div class="case_share clearfix"> <div class="case_sharebtn"> <a class="case_btn" target="_blank" href="';
$out+=$string(caseWebsite);
$out+='" />点击预览</a> </div> <div class="case_sharelink jiathis_style_32x32 clearfix"> <span>分享至：</span> <a href="#" class="weibo"></a> <a href="#" class="kongjian"></a> <a href="#" class="weixin"></a> <a href="#" class="qq jiathis_button_qzone"></a> <a href="#" class="douban"></a> </div> </div> ';
return new String($out);
});