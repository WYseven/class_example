/*TMODJS:{"version":27,"md5":"1d565084d510feb10e12221596275829"}*/
template('project',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,projects=$data.projects,$value=$data.$value,$index=$data.$index,$escape=$utils.$escape,$out='';$out+='<div class="project"> <div class="bts"> <h2 class="bt">项目池</h2> <h3 class="smallbt">业余项目与公司项目相互促进</h3> </div> ';
$each(projects,function($value,$index){
$out+=' <div class="project_ex"> <dl class="pro clearfix"> <dt><img src="';
$out+=$escape($value.projectThumbnail);
$out+='"/></dt> <dd> <h2 class="project_bt">';
$out+=$escape($value.projectName);
$out+='</h2> <p class="project_time">';
$out+=$escape($value.startTime);
$out+='~';
$out+=$escape($value.endTime);
$out+='</p> <p class="project_dec">';
$out+=$escape($value.projectExplain);
$out+='</p> <p class="project_lable"> ';
$each($value.projectLabel,function($value,$index){
$out+=' <span>';
$out+=$escape($value);
$out+='</span> ';
});
$out+=' </p> </dd> </dl> </div> ';
});
$out+=' </div>';
return new String($out);
});