/*TMODJS:{"version":160,"md5":"7d16ffdce5ee121237909aaf625912e9"}*/
template('case',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,casees=$data.casees,$value=$data.$value,$index=$data.$index,$string=$utils.$string,include=function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);$out+=text;return $out;},$out='';$out+='<div class="case" > <div class="casecon"> <div class="case1 clearfix"> <div class="bts"> <h2 class="bt">前端知识汇总&案例展示</h2> </div> <div class="case_main clearfix"> <div class="case_left"> <div class="case_list_main"> ';
$each(casees,function($value,$index){
$out+=' <div class="case_list"> <h3 class="case_listbt1"> <em class="';
$out+=$string($helpers. isAddClass('unload' , $value.isDisplay ));
$out+=' ';
$out+=$string($helpers. isAddClass('add' , !$value.isDisplay));
$out+='"></em> ';
$out+=$string($value.caseName);
$out+='（';
$out+=$string($value.caseList.length);
$out+='） </h3> ';
if($value.caseList && $value.caseList.length !== 0){
$out+=' <ul class="case_listcon" style="display:';
$out+=$string($helpers. isAddClass('block' , $value.isDisplay ));
$out+=$string($helpers. isAddClass('none' , !$value.isDisplay));
$out+=';"> ';
$each($value.caseList,function($value,$index){
$out+=' <li _id=';
$out+=$string($value.id);
$out+=' class="case_li1 ';
$out+=$string($helpers. isAddClass('hoverStyle' , $value.initShow ));
$out+='"> <a href="javascript:;">';
$out+=$string($value.caseTitle);
$out+='</a> <i></i><span></span> </li> ';
});
$out+=' </ul> ';
}
$out+=' </div> ';
});
$out+=' </div> <div class="list_scroll"> <div class="list_bar"></div> </div> </div> <div class="case_right"> <div class="right_content"> <div class="right_main"> <div class="content"> ';
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
$out+=' </div> </div> </div> </div> <div class="right_srcoll"> <div class="right_bar"></div> </div> <div style="clear:both;"></div> </div> </div> </div> </div>';
return new String($out);
});