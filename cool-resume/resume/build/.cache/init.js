/*TMODJS:{"version":51,"md5":"2228be31f1258213e987d25957ad9edf"}*/
template('init',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,include=function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);$out+=text;return $out;},skills=$data.skills,timeAxis=$data.timeAxis,projects=$data.projects,$out='';$out+=' ';
include('./hea_intro');
$out+='  ';
if(skills.temp == "circle"){
$out+=' ';
include('./skills-1');
$out+=' ';
}
$out+=' ';
if(skills.temp == "columns"){
$out+=' ';
include('./skills-2');
$out+=' ';
}
$out+=' ';
if(timeAxis.length){
$out+='  ';
include('./timeAxis-1');
$out+=' ';
}
$out+='  ';
include('./case');
$out+=' ';
if(projects.length){
$out+='  ';
include('./project');
$out+=' ';
}
$out+='  ';
include('./footer');
$out+=' ';
return new String($out);
});