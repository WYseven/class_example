function getId(name){
			return document.getElementById(name);
}
function getTag(parent,tag){
	return parent.getElementsByTagName(tag);
}
function getClass(parent,name){
	return parent.getElementsByClassName(name);
}
var Tween = {
	linear: function (t, b, c, d){
		return c*t/d + b;
	},
	easeIn: function(t, b, c, d){
		return c*(t/=d)*t + b;
	},
	easeOut: function(t, b, c, d){
		return -c *(t/=d)*(t-2) + b;
	},
	easeBoth: function(t, b, c, d){
		if ((t/=d/2) < 1) {
			return c/2*t*t + b;
		}
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInStrong: function(t, b, c, d){
		return c*(t/=d)*t*t*t + b;
	},
	easeOutStrong: function(t, b, c, d){
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeBothStrong: function(t, b, c, d){
		if ((t/=d/2) < 1) {
			return c/2*t*t*t*t + b;
		}
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	elasticIn: function(t, b, c, d, a, p){
		if (t === 0) { 
			return b; 
		}
		if ( (t /= d) == 1 ) {
			return b+c; 
		}
		if (!p) {
			p=d*0.3; 
		}
		if (!a || a < Math.abs(c)) {
			a = c; 
			var s = p/4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	elasticOut: function(t, b, c, d, a, p){
		if (t === 0) {
			return b;
		}
		if ( (t /= d) == 1 ) {
			return b+c;
		}
		if (!p) {
			p=d*0.3;
		}
		if (!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},    
	elasticBoth: function(t, b, c, d, a, p){
		if (t === 0) {
			return b;
		}
		if ( (t /= d/2) == 2 ) {
			return b+c;
		}
		if (!p) {
			p = d*(0.3*1.5);
		}
		if ( !a || a < Math.abs(c) ) {
			a = c; 
			var s = p/4;
		}
		else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		if (t < 1) {
			return - 0.5*(a*Math.pow(2,10*(t-=1)) * 
					Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		}
		return a*Math.pow(2,-10*(t-=1)) * 
				Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
	},
	backIn: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
		   s = 1.70158;
		}
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	backOut: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 2.70158;  //回缩的距离
		}
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	}, 
	backBoth: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 1.70158; 
		}
		if ((t /= d/2 ) < 1) {
			return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		}
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	bounceIn: function(t, b, c, d){
		return c - Tween['bounceOut'](d-t, 0, c, d) + b;
	},       
	bounceOut: function(t, b, c, d){
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
		}
		return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
	},      
	bounceBoth: function(t, b, c, d){
		if (t < d/2) {
			return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
		}
		return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
	}
};
function cssTransform(el,attr,value){
            el.transform = el.transform || {};

            if(arguments.length > 2){  //设置
                el.transform[attr] = value;

                var transformVal = '';

                for(var a in el.transform){
                    switch(a){
                        case "scale":
                        case "scaleX":
                        case "scaleY":
                        case "scaleZ":
                            transformVal += a + "("+value+")";
                            break;
                        case "rotate":
                        case "rotateX":
                        case "rotateY":
                        case "rotateZ":
                        case "skew":
                        case "skewX":
                        case "skewY":
                            transformVal += " "+a + "("+value+"deg)";
                            break;
                        default:
                            transformVal += " " + a + "("+value+"px)";

                    }
                }
                el.style.WebkitTransform = el.style.transform = transformVal;


            }else{ //获取
                var transform = el.transform[attr];
                //不存在则设置
                if(!transform){
                    switch(attr){
                        case "scale":
                        case "scaleX":
                        case "scaleY":
                        case "scaleZ":
                            el.transform[attr] = 1;
                        break;
                        default:
                            el.transform[attr] = 0;
                    }

                    
                }
                return el.transform[attr];
            }
        }
var attrs = {
	translate:1,
	translateX:1,
	translateY:1,
	translateZ:1,
	rotate:1,
	rotateX:1,
	rotateY:1,
	rotatZ:1,
	scale:1,
	scaleX:1,
	scaleY:1,
	scaleZ:1,
	skew:1,
	skewY:1,
	skewX:1,
}
/* 当css的参数个数小于3，获取否则 设置 */
function css(el,attr,val) {
	if(arguments.length < 3) {
		if(attrs[attr]){

			return cssTransform(el,attr);
		}
		var val  = 0;
		if(el.currentStyle) {
			val = el.currentStyle[attr];
		} else {
			val = getComputedStyle(el)[attr];
		}
		if(attr == "opacity") {
			val*=100;
		}
		return parseFloat(val);
	}
	if(attr == "opacity") {
		el.style.opacity = val/100;
		el.style.filter = "alpha(opacity = "+val+")";
	} else if(attrs[attr]){
		cssTransform(el,attr,val);
	}else {
		el.style[attr] = val + "px";
	}
}
function mTween(init) {//封装一个名为mTween的函数，传入参数依次为el:元素，target：目标值（一个对象可以传入多个值），time：时间，type：运动类型，callBack：回调函数
			
			var el = init.el;
			var target = init.target || {};
			var time = init.time;
			var type = init.type || "linear";
			var callBack = init.callBack;

			clearInterval(el.timer);//调用函数时先清掉定时器  定时器编号为元素的自定义属性
			var t = 0;//执行到第几次
			var b = {}; //定义一个变量b为空对象 b为初始值
			var c = {}; //定义一个变量c为空对象 c为差值
			var d = time/20; 
			for(var s in target) {//对象的遍历需要用for in循环 
				b[s] = css(el,s);  
				c[s] = target[s] - b[s];
			}				
			el.timer = setInterval(function(){
				t++;
				if(t>d) {
					clearInterval(el.timer);
					callBack&&callBack();
				} else {
					for(var s in target) {
						//width
						var val = Tween[type](t,b[s],c[s],d);
						css(el,s,val);
					}
				}
			},20);
		}