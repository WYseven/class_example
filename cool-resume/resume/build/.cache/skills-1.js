/*TMODJS:{"version":126,"md5":"f5285b2a72c9eee948dca50713506708"}*/
template('skills-1',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,skills=$data.skills,$value=$data.$value,$index=$data.$index,$escape=$utils.$escape,$out='';$out+=' <div class="skills"> <div class="skills_top"> <div class="top_con"> <div class="skills_title"> <h3>技能展示</h3> <p>7年工作经验，编写艺术般的代码</p> </div> <div class="top_detail clearfix"> <div class="left"> ';
$each(skills.pageArr,function($value,$index){
$out+=' <div class="skillLanguage" style="display: ';
$out+=$escape($helpers. isAddClass('block' , $index===0 ));
$out+=';opacity: ';
$out+=$escape($helpers. isAddClass('1' , $index===0));
$out+='"> ';
$each($value,function($value,$index){
$out+=' <div class="left_01"> <h3> <span class="circle"></span> <span>';
$out+=$escape($value.skillLanguage);
$out+='-';
$out+=$escape($value.percent);
$out+='</span> </h3> <div style="clear: both;"></div> <div> <ul style="margin-top: 10px;"> ';
$each($value.skillTooltip,function($value,$index){
$out+=' <li> <div class="skills_content skills_first"> <p class="first_con">';
$out+=$escape($value);
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
$out+=$escape($helpers. isAddClass('pages_select' , $index==0));
$out+='"></li> ';
});
$out+='  </ul> ';
}
$out+=' </div> <div class="right skills_canval_circle">  </div> </div> </div> </div> </div>';
return new String($out);
});