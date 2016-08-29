/*TMODJS:{"version":6,"md5":"09e1263ca500f69942236a3fedb3d267"}*/
template('temp/init',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,include=function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);$out+=text;return $out;},timeAxis=$data.timeAxis,projects=$data.projects,$out='';$out+=' ';
include('./hea_intro');
$out+='  ';
include('./skills-1');
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