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
		containClass:function(ele,classNames){
			var classNameArr = ele.className.split(" ");
			for( var i = 0; i < classNameArr.length; i++ ){
				if( classNameArr[i] === classNames ){
					return true;
				}
			}
			
			return false;
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
				while(!tools.containClass(obj,selector.slice(1))){
					obj = obj.parentNode;
				}
			}else{
				while(obj && obj.nodeName !== selector){
					obj = obj.parentNode;
				}
			}
			
			return obj;
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
		collision:function(obj1,obj2){
			var obj1W = obj1.offsetWidth;
			var obj1H = obj1.offsetHeight;
			var obj1L = obj1.offsetLeft;
			var obj1T = obj1.offsetTop;

			var obj2W = obj2.offsetWidth;
			var obj2H = obj2.offsetHeight;
			var obj2L = obj2.offsetLeft;
			var obj2T = obj2.offsetTop;
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
		}
	}
	
	return toolsObj;
	
}())
