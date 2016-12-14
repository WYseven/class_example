(function (){
	var methods = {
		on(element,evName,evFn){
			element.addEventListener(evName,evFn,false);
		},
		off(element,evName,evFn){
			element.removeEventListener(evName,evFn,false);
		},
		//可视区域的宽高
		view(){
			return {
				w: document.documentElement.clientWidth,
				h: document.documentElement.clientHeight
			}
		},
		//给元素添加指定的class
		addClass(element,className){
			if( !methods.hasClass(element,className) ){
				element.className += " "+ className;
			}
		},
		//删除元素指定的class
		removeClass(element,className){
			if( methods.hasClass(element,className) ){
				var classArr = element.className.split(" ");
				//["a","b","c"]
				for( var i = classArr.length-1; i >= 0; i-- ){
					if( classArr[i] === className){
						classArr.splice(i,1);
					}
				}
				element.className = classArr.join(" ");

			}
		},
		hasClass(element,className){
			var classArr = element.className.split(" ");
			for( var i = 0; i < classArr.length; i++ ){
				if( classArr[i] === className ){
					return true;
				}
			}
			return false;
		},
		//有指定class，就删除；没有，就添加。
		toggleClass(element,className){
			if( methods.hasClass(element,className) ){
				methods.removeClass(element,className);
				return false;
			}else{
				methods.addClass(element,className);
				return true;
			}
		},
		parent(element,attr){
			//先找到attr的第一个字符
			var firstChar = attr.charAt(0);
			if( firstChar === "." ){

				while(element.nodeType !== 9 && !methods.hasClass(element,attr.slice(1))){
					//element没有指定的class，那么element就为父级，继续向上找
					element = element.parentNode;
				}
			}else if(firstChar === "#"){
				while(element.nodeType !== 9 && element.id !== attr.slice(1)){
					//element没有指定的class，那么element就为父级，继续向上找
					element = element.parentNode;
				}
			}else{
				while(element.nodeType !== 9 && element.nodeName !== attr.toUpperCase()){
					//element没有指定的class，那么element就为父级，继续向上找
					element = element.parentNode;
				}
			}

			return element.nodeType === 9 ? null : element;

		}
	}
	window.t = methods;
})();