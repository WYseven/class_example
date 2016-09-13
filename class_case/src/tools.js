var tools = (function(){
	var toolsObj = {
		$:function(selector,context){
			/*

			 * #id
			 * .class
			 * 标签
			 * "#id li"
			 * ".class a"
			 * */
			context = context || document;
			if(selector.indexOf(" ") !== -1){
				return context.querySelectorAll(selector);
			}else if( selector.charAt(0) === "#" ){
				return document.getElementById(selector.slice(1))
			}else if( selector.charAt(0) === "." ){
				return context.getElementsByClassName(selector.slice(1));
			}else{
				return context.getElementsByTagName(selector);
			}
		},
		addEvent:function(ele,eventName,eventFn){
			ele.addEventListener(eventName,eventFn,false);
		},
		removeEvent:function(ele,eventName,eventFn){
			ele.removeEventListener(eventName,eventFn,false);
		},
		addClass:function (element,clsNames){
			if( typeof clsNames === "string" ){
				if(!tools.hasClass(element,clsNames)){
					element.className += " "+clsNames;
				}
			}
		},
		removeClass:function (element,clsNames){
			var classNameArr = element.className.split(" ");
			for( var i = 0; i < classNameArr.length; i++ ){
				if( classNameArr[i] === clsNames ){
					classNameArr.splice(i,1);
					i--;
				}
			}
			element.className = classNameArr.join(" ");
		},
		hasClass:function(ele,classNames){
			
			var classNameArr = ele.className.split(" ");
			for( var i = 0; i < classNameArr.length; i++ ){
				if( classNameArr[i] === classNames ){
					return true;
				}
			}

			return false;
		},
		toggleClass:function (ele,classNames){
			if( tools.hasClass(ele,classNames) ){
				tools.removeClass(ele,classNames);
				return false;
			}else{
				tools.addClass(ele,classNames);
				return true;
			}
		},
		parents:function(obj,selector){
			/*

			 * selector
			 * id
			 * class
			 * 标签
			 * */

			if( selector.charAt(0) === "#" ){
				while(obj.id !== selector.slice(1)){
					obj = obj.parentNode;
				}
			}else if( selector.charAt(0) === "." ){
				while((obj && obj.nodeType !== 9) && !tools.hasClass(obj,selector.slice(1))){
					obj = obj.parentNode;
				}
			}else{
				while(obj && obj.nodeType !== 9 && obj.nodeName.toLowerCase() !== selector){
					obj = obj.parentNode;
				}
			}

			return obj && obj.nodeType === 9  ? null : obj;
		},
		each:function(obj,callBack){
			for( var i = 0; i < obj.length; i++ ){
				callBack(obj[i],i);
			}
		},
		getEleRect:function(obj){
			return obj.getBoundingClientRect();
		},
		collisionRect:function(obj1,obj2){
			var obj1Rect = tools.getEleRect(obj1);
			var obj2Rect = tools.getEleRect(obj2);

			var obj1W = obj1Rect.width;
			var obj1H = obj1Rect.height;
			var obj1L = obj1Rect.left;
			var obj1T = obj1Rect.top;

			var obj2W = obj2Rect.width;
			var obj2H = obj2Rect.height;
			var obj2L = obj2Rect.left;
			var obj2T = obj2Rect.top;
			//碰上返回true 否则返回false
			if( obj1W+obj1L>obj2L && obj1T+obj1H > obj2T && obj1L < obj2L+obj2W && obj1T<obj2T+obj2H ){
				return true
			}else{
				false;
			}
		},
		store:function (namespace, data)  {
			if (data) {
				return localStorage.setItem(namespace, JSON.stringify(data));
			}

			var store = localStorage.getItem(namespace);
			return (store && JSON.parse(store)) || [];
		},
		extend:function (obj){
			var newArr = obj.constructor === Array ? [] : {};
			for( var attr in obj ){
				if( typeof obj[attr] === "object"){
					newArr[attr] = tools.extend(obj[attr]);
				}else{
					newArr[attr] = obj[attr];
				}
			}
			return newArr;
		},
		hide:function (element){
			return element.style.display = "none";
		},
		show:function (element){
			return element.style.display = "block";
		},
		getOffset:function (obj){
			return {
				width:obj.offsetWidth,
				height:obj.offsetHeight
			}
		},
		next:function (element){
			return element.nextElementSibling;
		},
		view:function (){
			return {
				W:document.documentElement.clientWidth,
				H:document.documentElement.clientHeight
			}		
		},
		mouseWheel:function (element,upFn,downFn){
				element.onmousewheel = wheelFn
				if( element.addEventListener ){
					element.addEventListener("DOMMouseScroll",wheelFn,false);
				}
				function wheelFn(ev){
					var direction = true;
					if(ev.wheelDelta){  //ie和chrome
						direction = ev.wheelDelta > 0 ? true : false;
					}else if(ev.detail){ //FF
						direction = ev.detail < 0 ? true : false;
					}
					
					if( direction ){  //向上
						typeof upFn === "function" && upFn.call(element,ev);
					}else{  //向下
						typeof downFn === "function" && downFn.call(element,ev);
					}

					ev.preventDefault();
				}

		},
		attr:function (element,key,value){
			if( typeof value === 'undefined' ){
				return element.getAttribute(key)
			}else{
				return element.setAttribute(key,value);
			}
		}
	}

	return toolsObj;

}())
