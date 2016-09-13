/*TMODJS:{"version":59,"md5":"129fb71a7cc8522b1cc206e87c87aefc"}*/
template('skills-2',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,skills=$data.skills,$value=$data.$value,$index=$data.$index,$string=$utils.$string,$out='';$out+=' <div class="skills"> <div class="skills_bottom"> <div class="bottom_con"> <div class="skills_title"> <h3>技能展示</h3> <p>7年工作经验，编写艺术般的代码</p> </div> <div class="bottom_detail"> <ul> ';
$each(skills.skillsClassify,function($value,$index){
$out+=' <li class="detail_0';
$out+=$string($index+1);
$out+='"> <div class="percent">';
$out+=$string($value.percent);
$out+='</div> <div class="subject"> <div class="detail" style="width:0%;padding-left:1%;transition: .5s;" data-width=';
$out+=$string($value.percent);
$out+='> <span>';
$out+=$string($value.skillLanguage);
$out+='</span> <div class="subject_circle" style="display: none;opacity: 0;"></div> <div class="subject_con" style="display: none;opacity: 0;"> ';
$each($value.skillTooltip,function($value,$index){
$out+=' <p class="word"> ';
$out+=$string($value);
$out+=' </p> ';
});
$out+=' </div> <p class="boxbg"></p> </div> </div> </li> ';
});
$out+=' </ul> </div> </div> </div> </div>';
return new String($out);
});