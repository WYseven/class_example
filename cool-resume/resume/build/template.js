/*TMODJS:{"version":"1.0.0"}*/
!function () {

    function template (filename, content) {
        return (
            /string|function/.test(typeof content)
            ? compile : renderFile
        )(filename, content);
    };


    var cache = template.cache = {};
    var String = this.String;

    function toString (value, type) {

        if (typeof value !== 'string') {

            type = typeof value;
            if (type === 'number') {
                value += '';
            } else if (type === 'function') {
                value = toString(value.call(value));
            } else {
                value = '';
            }
        }

        return value;

    };


    var escapeMap = {
        "<": "&#60;",
        ">": "&#62;",
        '"': "&#34;",
        "'": "&#39;",
        "&": "&#38;"
    };


    function escapeFn (s) {
        return escapeMap[s];
    }


    function escapeHTML (content) {
        return toString(content)
        .replace(/&(?![\w#]+;)|[<>"']/g, escapeFn);
    };


    var isArray = Array.isArray || function(obj) {
        return ({}).toString.call(obj) === '[object Array]';
    };


    function each (data, callback) {
        if (isArray(data)) {
            for (var i = 0, len = data.length; i < len; i++) {
                callback.call(data, data[i], i, data);
            }
        } else {
            for (i in data) {
                callback.call(data, data[i], i);
            }
        }
    };


    function resolve (from, to) {
        var DOUBLE_DOT_RE = /(\/)[^/]+\1\.\.\1/;
        var dirname = ('./' + from).replace(/[^/]+$/, "");
        var filename = dirname + to;
        filename = filename.replace(/\/\.\//g, "/");
        while (filename.match(DOUBLE_DOT_RE)) {
            filename = filename.replace(DOUBLE_DOT_RE, "/");
        }
        return filename;
    };


    var utils = template.utils = {

        $helpers: {},

        $include: function (filename, data, from) {
            filename = resolve(from, filename);
            return renderFile(filename, data);
        },

        $string: toString,

        $escape: escapeHTML,

        $each: each
        
    };


    var helpers = template.helpers = utils.$helpers;


    function renderFile (filename, data) {
        var fn = template.get(filename) || showDebugInfo({
            filename: filename,
            name: 'Render Error',
            message: 'Template not found'
        });
        return data ? fn(data) : fn; 
    };


    function compile (filename, fn) {

        if (typeof fn === 'string') {
            var string = fn;
            fn = function () {
                return new String(string);
            };
        }

        var render = cache[filename] = function (data) {
            try {
                return new fn(data, filename) + '';
            } catch (e) {
                return showDebugInfo(e)();
            }
        };

        render.prototype = fn.prototype = utils;
        render.toString = function () {
            return fn + '';
        };

        return render;
    };


    function showDebugInfo (e) {

        var type = "{Template Error}";
        var message = e.stack || '';

        if (message) {
            // 利用报错堆栈信息
            message = message.split('\n').slice(0,2).join('\n');
        } else {
            // 调试版本，直接给出模板语句行
            for (var name in e) {
                message += "<" + name + ">\n" + e[name] + "\n\n";
            }  
        }

        return function () {
            if (typeof console === "object") {
                console.error(type + "\n\n" + message);
            }
            return type;
        };
    };


    template.get = function (filename) {
        return cache[filename.replace(/^\.\//, '')];
    };


    template.helper = function (name, helper) {
        helpers[name] = helper;
    };


    if (typeof define === 'function') {define(function() {return template;});} else if (typeof exports !== 'undefined') {module.exports = template;} else {this.template = template;}
    
    /*v:119*/
template('case',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,casees=$data.casees,$value=$data.$value,$index=$data.$index,$escape=$utils.$escape,include=function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);$out+=text;return $out;},$out='';$out+='<div class="case"> <div class="casecon"> <div class="case1 clearfix"> <div class="bts"> <h2 class="bt">前端知识汇总&案例展示</h2> </div> <div class="case_left"> ';
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
$out+=' </div> <div class="case_right"> ';
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
$out+=' </div> </div> </div> </div> </div>';
return new String($out);
});/*v:15*/
template('case_right_temp',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,caseTitle=$data.caseTitle,publishTime=$data.publishTime,caseDescription=$data.caseDescription,caseThumbnail=$data.caseThumbnail,caseWebsite=$data.caseWebsite,$out='';$out+='<section> <h3 class="case_bt2">';
$out+=$escape(caseTitle);
$out+='</h3> <p class="case_time">发布时间：';
$out+=$escape(publishTime);
$out+='</p> <p class="case_decoration">';
$out+=$escape(caseDescription);
$out+='</p> <img src="';
$out+=$escape(caseThumbnail);
$out+='" class="case_exp"/> <div class="case_share clearfix"> <div class="case_sharebtn"> <a class="case_btn" target="_blank" href="';
$out+=$escape(caseWebsite);
$out+='" />点击预览</a> </div> <div class="case_sharelink clearfix"> <span>分享至：</span> <a href="#" class="weibo"></a> <a href="#" class="kongjian"></a> <a href="#" class="weixin"></a> <a href="#" class="qq"></a> <a href="#" class="douban"></a> </div> </div> </section>';
return new String($out);
});/*v:2*/
template('footer','<div class="footer"> <div class="footcon clearfix"> <div class="footleft"> <p>最后更新于2015年7月25日</p> <p>简历模板由妙味课堂Miaov.com设计开发（使用本模板请注明此项）</p> </div> <div class="footright"> <dl> <dt><img src="images/erweima.png"/></dt> <dd> <p>您还可以使用手机或iPad</p> <p>扫描左侧二维码打开本页</p> </dd> </dl> </div> </div> </div>');/*v:54*/
template('hea_intro',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,userInfo=$data.userInfo,$out='';$out+='<div class="hea_intro"> <div class="high_light">  <div class="header"> <div class="hea_con"> <div class="hea_left"> <h3>';
$out+=$escape(userInfo.userName);
$out+='</h3> <p>';
$out+=$escape(userInfo.jobWant);
$out+='</p> </div> <div class="hea_right"> <div class="hea_qq">';
$out+=$escape(userInfo.userQQ);
$out+='</div> <div class="hea_mail">';
$out+=$escape(userInfo.userEmail);
$out+='</div> </div> </div> </div>  <div class="intro clearfix"> <div class="intro_con clearfix"> <div class="intro_left"> <p>';
$out+=$escape(userInfo.motto);
$out+='</p> </div> <div class="intro_right"> <div class="pic"></div> <div class="intro_detail"> <ul> <li> <div class="detail_left"> <p>手机</p> </div> <div class="detail_right intro_first"> <p class="intro_firstcon">';
$out+=$escape(userInfo.userPhone);
$out+='</p> </div> <div class="intro_circle"></div> </li> <li> <div class="detail_left"> <p>籍贯</p> </div> <div class="detail_right"> <p>';
$out+=$escape(userInfo.userOrignPlace);
$out+='</p> </div> <div class="intro_circle"></div> </li> <li> <div class="detail_left"> <p>所在地</p> </div> <div class="detail_right"> <p>';
$out+=$escape(userInfo.userSeatPlace);
$out+='</p> </div> <div class="intro_circle"></div> </li> <li> <div class="detail_left"> <p>微博</p> </div> <div class="detail_right"> <p>';
$out+=$escape(userInfo.userWeibo);
$out+='</p> </div> <div class="intro_circle"></div> </li> <li> <div class="detail_left"> <p>自我评价</p> </div> <div class="detail_right"> <p>';
$out+=$escape(userInfo.userAssessment);
$out+='</p> </div> <div class="intro_circle"></div> </li> <li> <div class="detail_left"> <p>爱好</p> </div> <div class="detail_right"> <p> ';
$out+=$escape($helpers. arrayJoin(userInfo.userHobby , "、"));
$out+=' </p> </div> <div class="intro_circle"></div> </li> <li> <div class="detail_left"> <p>个人奖项</p> </div> <div class="detail_right intro_last"> <p class="intro_lastcon">';
$out+=$escape($helpers. arrayJoin(userInfo.userAward , "、"));
$out+='</p> </div> <div class="intro_circle"></div> </li> </ul> </div> </div> </div> </div> </div> </div> ';
return new String($out);
});/*v:41*/
template('init',function($data,$filename
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
});/*v:27*/
template('project',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,projects=$data.projects,$value=$data.$value,$index=$data.$index,$escape=$utils.$escape,$out='';$out+='<div class="project"> <div class="bts"> <h2 class="bt">项目池</h2> <h3 class="smallbt">业余项目与公司项目相互促进</h3> </div> ';
$each(projects,function($value,$index){
$out+=' <div class="project_ex"> <dl class="pro clearfix"> <dt><img src="';
$out+=$escape($value.projectThumbnail);
$out+='"/></dt> <dd> <h2 class="project_bt">';
$out+=$escape($value.projectName);
$out+='</h2> <p class="project_time">';
$out+=$escape($value.startTime);
$out+='~';
$out+=$escape($value.endTime);
$out+='</p> <p class="project_dec">';
$out+=$escape($value.projectExplain);
$out+='</p> <p class="project_lable"> ';
$each($value.projectLabel,function($value,$index){
$out+=' <span>';
$out+=$escape($value);
$out+='</span> ';
});
$out+=' </p> </dd> </dl> </div> ';
});
$out+=' </div>';
return new String($out);
});/*v:12*/
template('skills-1',' <div class="skills"> <div class="skills_top"> <div class="top_con"> <div class="skills_title"> <h3>技能展示</h3> <p>7年工作经验，编写艺术般的代码</p> </div> <div class="top_detail clearfix"> <div class="left"> <div class="left_01"> <h3> <span class="circle"></span> <span>HTML5-10%</span> </h3> <div style="clear: both;"></div> <div> <ul style="margin-top: 10px;"> <li> <div class="skills_content skills_first"> <p class="first_con">移动端响应式</p> </div> <div class="skills_circle"></div> </li> <li> <div class="skills_content"> <p>canvas游戏开发</p> </div> <span class="skills_circle"></span> </li> <li> <div class="skills_content"> <p>webGL尝试移动</p> </div> <span class="skills_circle"></span> </li> <li> <div class="skills_content skills_last"> <p class="last_con">端响应式canvas游戏开发</p> </div> <span class="skills_circle"></span> </li> </ul> </div> </div> <div class="left_02"> <h3> <span class="circle circle_diff"></span> <span>CSS3-60%</span> </h3> <p>尝试写过 3D效果 阴影渐变</p> </div> <div class="left_03"> <h3> <span class="circle circle_diff"></span> <span>JS-80%</span> </h3> <p> 指弹吉他手非常喜欢应用的一个技术就是自然泛音，所谓泛音技术就是通过精确的手指控制使得吉他弦达到共鸣从而发出吉他本身音域意外的音。对于电吉他来说，有一种技术叫人工泛音，那个技术的要点是通过推弦的方法使得吉他弦的紧绷程度上升从而能够弹奏更高的音 </p> </div> <ul class="pages"> <li class="pages_select"></li> <li></li> <li></li> </ul> </div> <div class="right skills_canval_circle">  </div> </div> </div> </div> </div>');/*v:2*/
template('skills-2',' <div class="skills"> <div class="skills_bottom"> <div class="bottom_con"> <div class="skills_title"> <h3>技能展示</h3> <p>7年工作经验，编写艺术般的代码</p> </div> <div class="bottom_detail"> <ul> <li class="detail_01"> <div class="percent">10%</div> <div class="subject"> <div class="detail" style="width:9%;padding-left:1%;"> <span>HTML</span>  </div> </div> </li> <li class="detail_02"> <div class="percent">60%</div> <div class="subject"> <div class="detail" style="width:59%;padding-left:1%;"> <span>CSS3</span>  </div> </div> </li> <li class="detail_03"> <div class="percent">80%</div> <div class="subject"> <div class="detail" style="width:79%;padding-left:1%;"> <span>JS</span> <div class="subject_circle"></div> <div class="subject_con"> <p class="boxbg"></p> <p class="word"> 指弹吉他手非常喜欢应用的一个技术就是自然泛音，所谓泛音技术就是通过精确的手指控制使得吉他弦达到共鸣从而发出吉他本身音域意外的音。对于电吉他来说，有一种技术叫人工泛音，那个技术的要点是通过推弦的方法使得吉他弦的紧绷程度上升从而能够弹奏更高的音 </p> </div> </div> </div> </li> <li class="detail_04"> <div class="percent">100%</div> <div class="subject"> <div class="detail" style="width:99%;padding-left:1%;"> <span>JAVA</span>  </div> </div> </li> <li class="detail_05"> <div class="percent">90%</div> <div class="subject"> <div class="detail" style="width:89%;padding-left:1%;"> <span>JAVA</span>  </div> </div> </li> <li class="detail_06"> <div class="percent">50%</div> <div class="subject"> <div class="detail" style="width:49%;padding-left:1%;"> <span>JS</span>  </div> </div> </li> <li class="detail_07"> <div class="percent">90%</div> <div class="subject"> <div class="detail" style="width:89%;padding-left:1%;"> <span>HTML5</span>  </div> </div> </li> <li class="detail_08"> <div class="percent">70%</div> <div class="subject"> <div class="detail" style="width:89%;padding-left:1%;"> <span>CSS3</span>  </div> </div> </li> <li class="detail_09"> <div class="percent">80%</div> <div class="subject"> <div class="detail" style="width:79%;padding-left:1%;"> <span>JS</span>  </div> </div> </li> <li class="detail_10"> <div class="percent">80%</div> <div class="subject"> <div class="detail" style="width:79%;padding-left:1%;"> <span>JS</span>  </div> </div> </li> </ul> </div> </div> </div> </div>');/*v:82*/
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
});/*v:1*/
template('timeAxis-2',' <div class="timeAxis"> <div class="timecon"> <div class="skills_title"> <h3>工作时光轴</h3> <p>有大型网站开发、优化经验</p> </div> <div class="timeline_top"> <div class="dot dot2"></div> <div class="line line2"></div> </div> <div class="exper_detail"> <div class="exper"> <div class="exper_item exper_item2"> <div class="item_title"> <div class="ball"> <div class="icon icon2"><img src="images/expre_bgL.png" /></div> </div> <div class="title_word title_word2"> <p class="date"> 2013.12.11~2015.10.09 <img src="images/date.png" /> </p> <div class="company"> <h4>广州市千钧网络科技有限公司</h4> <p>前端开发工程师</p> </div> </div> </div> <div class="item_con"> <p>前端负责人。搭建了前端的整体构架</p> <p>包括：制定前端静态资源目录结构和代码发布流程；根据前者开发代码构建工具，简化发布操作；开发前后端中间平台，分离前后端职责，提高开发效率。此外，还负责美黛拉App内嵌页面和PC网站的开发。</p> </div> </div> </div> <div class="timeline_top"> <div class="dot_dom"></div> </div> </div> <div class="exper_detail"> <div class="exper"> <div class="exper_item exper_item2"> <div class="item_title"> <div class="ball"> <div class="icon icon2"><img src="images/expre_bgL.png" /></div> </div> <div class="title_word title_word2"> <p class="date"> 2013.12.11~2015.10.09 <img src="images/date.png" /> </p> <div class="company"> <h4>广州市千钧网络科技有限公司</h4> <p>前端开发工程师</p> </div> </div> </div> <div class="item_con"> <p>前端负责人。搭建了前端的整体构架</p> <p>包括：制定前端静态资源目录结构和代码发布流程；根据前者开发代码构建工具，简化发布操作；开发前后端中间平台，分离前后端职责，提高开发效率。此外，还负责美黛拉App内嵌页面和PC网站的开发。</p> </div> </div> </div> <div class="timeline_top"> <div class="dot_dom"></div> </div> </div> </div> </div>');

}()