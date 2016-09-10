/*TMODJS:{"version":43,"md5":"85b2daf54e2edbc6beeb7138a411bba0"}*/
template('project',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,projects=$data.projects,$value=$data.$value,$index=$data.$index,$string=$utils.$string,$out='';$out+='<div class="project"> <div class="bts"> <h2 class="bt">项目池</h2> <h3 class="smallbt">业余项目与公司项目相互促进</h3> </div> ';
$each(projects,function($value,$index){
$out+=' <div class="project_ex"> <dl class="pro clearfix"> <dt> <a target="_blank" href="';
$out+=$string($value.projectWebsite);
$out+='"> <img src="';
$out+=$string($value.projectThumbnail);
$out+='"/> </a> </dt> <dd> <h2 class="project_bt"> <a target="_blank" href="';
$out+=$string($value.projectWebsite);
$out+='"> ';
$out+=$string($value.projectName);
$out+=' </a> </h2> <p class="project_time">';
$out+=$string($value.startTime);
$out+='~';
$out+=$string($value.endTime);
$out+='</p> <p class="project_dec">';
$out+=$string($value.projectExplain);
$out+='</p> <p class="project_lable"> ';
$each($value.projectLabel,function($value,$index){
$out+=' <span>';
$out+=$string($value);
$out+='</span> ';
});
$out+=' </p> </dd> </dl> </div> ';
});
$out+=' </div>';
return new String($out);
});