/*TMODJS:{"version":88,"md5":"240b9c4a686a1c09b6e2272223d29e92"}*/
template('timeAxis-1',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,timeAxis=$data.timeAxis,$value=$data.$value,$index=$data.$index,$string=$utils.$string,nums=$data.nums,$out='';$out+=' <div class="timeAxis"> <div class="timecon"> <div class="skills_title"> <h3>工作时光轴</h3> <p>有大型网站开发、优化经验</p> </div> <div class="timeline_top"> <div class="dot"></div> <div class="line"></div> </div> <div class="exper_detail"> ';
$each(timeAxis,function($value,$index){
$out+=' ';
$out+=$string(nums = $index%2 === 0);
$out+=' <div class="exper"> <div class="exper_item ';
$out+=$string($helpers. isAddClass('exper_itemL' , nums));
$out+='"> <div class="item_title"> <div class="ball" ';
if(!nums){
$out+=' style="float: right;" ';
}
$out+=' > <div class="icon ';
$out+=$string($helpers. isAddClass('icon2' , $index%3 === 1));
$out+=' ';
$out+=$string($helpers. isAddClass('icon3' , $index%3 === 2));
$out+=' "> ';
if($index%2 === 0){
$out+=' <img src="images/icon/expre_bgL.png" /> ';
}else if($index%2 === 1){
$out+=' <img src="images/icon/expre_bgR.png" /> ';
}
$out+=' </div> </div> <div class="title_word"> <p class="date ';
$out+=$string($helpers. isAddClass('date2' , !nums));
$out+='"> ';
$out+=$string($value.startTime);
$out+='~';
$out+=$string($value.endTime);
$out+=' <img src="images/icon/date.png" /> </p> <div class="company"> <h4>';
$out+=$string($value.companyNam);
$out+='</h4> <p>';
$out+=$string($value.jobPost);
$out+='</p> </div> </div> </div> <div class="';
$out+=$string($helpers. isAddClass('item_con' , nums));
$out+=' ';
$out+=$string($helpers. isAddClass('item_con2' , !nums));
$out+='"> <p>';
$out+=$string($value.jonTask);
$out+='</p> <p>';
$out+=$string($value.jobContent);
$out+='</p> </div> </div> </div> ';
});
$out+=' </div> </div> </div>';
return new String($out);
});