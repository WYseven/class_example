/*TMODJS:{"version":53,"md5":"9a22e033dbe744e1d7b2a4e4c608f40d"}*/
template('skills-2',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,skills=$data.skills,$value=$data.$value,$index=$data.$index,$escape=$utils.$escape,$out='';$out+=' <div class="skills"> <div class="skills_bottom"> <div class="bottom_con"> <div class="skills_title"> <h3>技能展示</h3> <p>7年工作经验，编写艺术般的代码</p> </div> <div class="bottom_detail"> <ul> ';
$each(skills.skillsClassify,function($value,$index){
$out+=' <li class="detail_0';
$out+=$escape($index+1);
$out+='"> <div class="percent">';
$out+=$escape($value.percent);
$out+='</div> <div class="subject"> <div class="detail" style="width:0%;padding-left:1%;transition: .5s;" data-width=';
$out+=$escape($value.percent);
$out+='> <span>';
$out+=$escape($value.skillLanguage);
$out+='</span> <div class="subject_circle" style="display: none;opacity: 0;"></div> <div class="subject_con" style="display: none;opacity: 0;"> <p class="boxbg"></p> ';
$each($value.skillTooltip,function($value,$index){
$out+=' <p class="word"> ';
$out+=$escape($value);
$out+=' </p> ';
});
$out+=' </div> </div> </div> </li> ';
});
$out+=' </ul> </div> </div> </div> </div>';
return new String($out);
});