/*TMODJS:{"version":151,"md5":"6de572a74e20c49f5f4115512b169ffd"}*/
template('skills-1',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,skills=$data.skills,$value=$data.$value,$index=$data.$index,$string=$utils.$string,len=$data.len,$out='';$out+=' <div class="skills"> <div class="skills_top"> <div class="top_con"> <div class="skills_title"> <h3>技能展示</h3> <p>7年工作经验，编写艺术般的代码</p> </div> <div class="top_detail clearfix"> <div class="left"> ';
$each(skills.pageArr,function($value,$index){
$out+=' <div class="skillLanguage" style="display: ';
$out+=$string($helpers. isAddClass('block' , $index===0 ));
$out+=';opacity: ';
$out+=$string($helpers. isAddClass('1' , $index===0));
$out+='"> ';
$each($value,function($value,$index){
$out+=' <div class="left_01"> <h3> <span class="circle"></span> <span>';
$out+=$string($value.skillLanguage);
$out+='-';
$out+=$string($value.percent);
$out+='</span> </h3> <div style="clear: both;"></div> <div> <ul style="margin-top: 10px;"> ';
$out+=$string(len = $value.skillTooltip);
$out+=' ';
$each($value.skillTooltip,function($value,$index){
$out+=' <li> <div class="skills_content ';
$out+=$string($helpers. isAddClass('skills_first' , $index===0));
$out+=$string($helpers. isAddClass('skills_last' , $index===len.length-1));
$out+='"> <p class="first_con">';
$out+=$string($value);
$out+='</p> </div> <div class="skills_circle"></div> </li> ';
});
$out+=' </ul> </div> </div> ';
});
$out+=' </div> ';
});
$out+='  ';
if(skills.pageArr.length>1){
$out+=' <ul class="pages"> ';
$each(skills.pageArr,function($value,$index){
$out+=' <li class="';
$out+=$string($helpers. isAddClass('pages_select' , $index==0));
$out+='"></li> ';
});
$out+='  </ul> ';
}
$out+=' </div> <div class="right skills_canval_circle">  </div> </div> </div> </div> </div>';
return new String($out);
});