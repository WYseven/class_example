/*TMODJS:{"version":134,"md5":"2169412fa18f15d038c2afda2ce1e324"}*/
template('case',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,casees=$data.casees,$value=$data.$value,$index=$data.$index,$escape=$utils.$escape,include=function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);$out+=text;return $out;},$out='';$out+='<div class="case"> <div class="casecon"> <div class="case1 clearfix"> <div class="bts"> <h2 class="bt">前端知识汇总&案例展示</h2> </div> <div class="case_main"> <div class="case_left"> <div class="case_list_main"> ';
$each(casees,function($value,$index){
$out+=' <div class="case_list"> <h3 class="case_listbt1"> <em class="';
$out+=$escape($helpers. isAddClass('unload' , $value.isDisplay ));
$out+=' ';
$out+=$escape($helpers. isAddClass('add' , !$value.isDisplay));
$out+='"></em> ';
$out+=$escape($value.caseName);
$out+='（';
$out+=$escape($value.caseList.length);
$out+='） </h3> ';
if($value.caseList && $value.caseList.length !== 0){
$out+=' <ul class="case_listcon" style="display:';
$out+=$escape($helpers. isAddClass('block' , $value.isDisplay ));
$out+=$escape($helpers. isAddClass('none' , !$value.isDisplay));
$out+=';"> ';
$each($value.caseList,function($value,$index){
$out+=' <li _id=';
$out+=$escape($value.id);
$out+=' class="case_li1 ';
$out+=$escape($helpers. isAddClass('hoverStyle' , $value.initShow ));
$out+='"> <a href="javascript:;">';
$out+=$escape($value.caseTitle);
$out+='</a> <i></i><span></span> </li> ';
});
$out+=' </ul> ';
}
$out+=' </div> ';
});
$out+=' </div> <div class="list_scroll"> <div class="list_bar"></div> </div> </div> <div class="case_right"> ';
$each(casees,function($value,$index){
$out+=' ';
if($value.isDisplay){
$out+=' ';
$each($value.caseList,function($value,$index){
$out+=' ';
if($value.initShow){
$out+=' ';
include("./case_right_temp",$value);
$out+=' ';
}
$out+=' ';
});
$out+=' ';
}
$out+=' ';
});
$out+=' </div> <div class="right_srcoll"> <div class="right_bar"></div> </div> </div> </div> </div> </div>';
return new String($out);
});