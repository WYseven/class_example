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
			var classNameArr = ele.classNames.split(" ");
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
				while(!containClass(obj)){
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
		}
	}
	
	return toolsObj;
	
}())
