function dialog(option){
			option = option || {};

			var defaults = {
				title:"这是一个弹框",
				content:"我是弹框",
				okFn:function(){}
			};		

			for( var attr in option ){
				defaults[attr] = option[attr];
			}

			//封装弹框
			//弹框的结构，appendChild到body中

			var diaDiv = document.createElement("div");
			diaDiv.className = "full-pop";

			var diaHtml = `<h3>
				<p class="title">${defaults.title}</p>
				<a href="javascript:void(0);" class="close" title="关闭">×</a>
			</h3>
			<div class="content">
				${defaults.content}
			</div>
			<div class="pop-btns">
				<span class="error"></span>
				<a href="javascript:void(0)" class="confirm">确定</a>
				<a href="javascript:void(0)" class="cancel">取消</a>
			</div>`;

			diaDiv.innerHTML = diaHtml;

			diaDiv.style.zIndex = 200;

			document.body.appendChild(diaDiv);

			//居中显示
			diaDiv.style.left = (document.documentElement.clientWidth - diaDiv.offsetWidth)/2 + "px";
			diaDiv.style.top = (document.documentElement.clientHeight - diaDiv.offsetHeight)/2 + "px";

			//遮罩
			var mask = document.createElement("div");

			mask.style.cssText = "width:100%;height:100%;background:#000;opacity:.5;position:fixed;left:0;top:0;"
			mask.style.zIndex = 199;
			document.body.appendChild(mask);

			//给确定取消关闭添加点击处理

			window.addEventListener("resize",function (){
				diaDiv.style.left = (document.documentElement.clientWidth - diaDiv.offsetWidth)/2 + "px";
				diaDiv.style.top = (document.documentElement.clientHeight - diaDiv.offsetHeight)/2 + "px";		
			},false);

			//获取元素

			var close = diaDiv.querySelector(".close");
			var ok = diaDiv.querySelector(".confirm");
			var cancel = diaDiv.querySelector(".cancel");

			close.addEventListener("click",function (){
				document.body.removeChild(diaDiv);
				document.body.removeChild(mask);
			},false)
			ok.addEventListener("click",function (){

				var bl = defaults.okFn();

				if( !bl ){
					document.body.removeChild(diaDiv);
					document.body.removeChild(mask);
				}

				
			},false)
			cancel.addEventListener("click",function (){
				document.body.removeChild(diaDiv);
				document.body.removeChild(mask);
			},false)

		}