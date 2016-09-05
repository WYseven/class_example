/*TMODJS:{"version":86,"md5":"73c7c8c4456e59a2d95f09d58db6adad"}*/
template('timeAxis-1',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,timeAxis=$data.timeAxis,$value=$data.$value,$index=$data.$index,$escape=$utils.$escape,nums=$data.nums,$out='';$out+=' <div class="timeAxis"> <div class="timecon"> <div class="skills_title"> <h3>工作时光轴</h3> <p>有大型网站开发、优化经验</p> </div> <div class="timeline_top"> <div class="dot"></div> <div class="line"></div> </div> <div class="exper_detail"> ';
$each(timeAxis,function($value,$index){
$out+=' ';
$out+=$escape(nums = $index%2 === 0);
$out+=' <div class="exper"> <div class="exper_item ';
$out+=$escape($helpers. isAddClass('exper_itemL' , nums));
$out+='"> <div class="item_title"> <div class="ball" ';
if(!nums){
$out+=' style="float: right;" ';
}
$out+=' > <div class="icon ';
$out+=$escape($helpers. isAddClass('icon2' , $index%3 === 1));
$out+=' ';
$out+=$escape($helpers. isAddClass('icon3' , $index%3 === 2));
$out+=' "> ';
if($index%2 === 0){
$out+=' <img src="images/expre_bgL.png" /> ';
}else if($index%2 === 1){
$out+=' <img src="images/expre_bgR.png" /> ';
}
$out+=' </div> </div> <div class="title_word"> <p class="date ';
$out+=$escape($helpers. isAddClass('date2' , !nums));
$out+='"> ';
$out+=$escape($value.startTime);
$out+='~';
$out+=$escape($value.endTime);
$out+=' <img src="images/date.png" /> </p> <div class="company"> <h4>';
$out+=$escape($value.companyNam);
$out+='</h4> <p>';
$out+=$escape($value.jobPost);
$out+='</p> </div> </div> </div> <div class="';
$out+=$escape($helpers. isAddClass('item_con' , nums));
$out+=' ';
$out+=$escape($helpers. isAddClass('item_con2' , !nums));
$out+='"> <p>';
$out+=$escape($value.jonTask);
$out+='</p> <p>';
$out+=$escape($value.jobContent);
$out+='</p> </div> </div> </div> ';
});
$out+=' </div> </div> </div>';
return new String($out);
});