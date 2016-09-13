(function (window,noGlobal){

	var vQuery = function (selector,content){
		return vQuery.fn.init(selector,content);		
	}

	vQuery.isFunction = function (fn){
		return typeof fn === "function";
	}

	vQuery.fn = vQuery.prototype = {
		constructor:vQuery,
		isFunction:function (fn){
			return typeof fn === "function";
		},
		init:function (selector,content){
			if(typeof selector === "string" ){
				var element = document.querySelectorAll(selector);
				this.length = element.length;
				for( var i = 0; i < this.length; i++ ){
					this[i] = element[i];
				}
				this.selector = selector;
				return this;

			}else if(vQuery.isFunction(selector)){
				document.addEventListener("DOMContentLoaded",selector);
			}
		},
		css:function (key,value){
			if( value ){
				for( var i = 0; i < this.length; i++ ){
					this[i].style[key] = value;
				}
			}else{
				return getComputedStyle(this[0])[key];
			}
			
		},
		html:function (value){
			if( value ){
				for( var i = 0; i < this.length; i++ ){
					this[i].innerHTML = value;
				}
			}else{
				return this[0].innerHTML;
			}
		}
	}

	vQuery.prototype = vQuery.fn.prototype;

	window.vQuery = window.$ = vQuery;
		
}(window))