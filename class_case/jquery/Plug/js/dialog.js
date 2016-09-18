var drag = {
	dragObj:null,
	moveObj:null,
	disX:0,
	disY:0,
	init:function (options){
		drag.dragObj = options.dragObj;
		drag.moveObj = options.moveObj;
		drag.addEvent();	
	},
	addEvent:function (){
		drag.dragObj.onmousedown  =function (ev){
			drag.disX = ev.clientX - drag.moveObj.offsetLeft;	
			drag.disY = ev.clientY - drag.moveObj.offsetTop;

			document.onmousemove = function (ev){
				console.log( ev.clientX , drag.disX  );
				drag.moveObj.style.left = ev.clientX - drag.disX + 'px';	
				drag.moveObj.style.top = ev.clientY - drag.disY + 'px';		
			};	

			document.onmouseup = function (ev){
				document.onmousemove = document.onmouseup = null;
			}

			ev.preventDefault();
		};	
	}

};

function dialogFn(options){
		
	var dialog = {
		fullPop:null,
		html:function (  ){
			var html = '\
				<h3 class = "move">\
					<p class="title">选择存储位置</p>\
					<a href="javascript:void(0);" class="close" title="关闭">×</a>\
				</h3>\
				<div class="dialogContent">欢迎使用弹框</div>\
				<div class="pop-btns">\
					<span class="error">错误提示</span>\
					<a href="javascript:void(0)" class="confirm">确定</a>\
					<a href="javascript:void(0)" class="cancel">取消</a>\
				</div>';

			return html;		
		},
		view:function (	){
			return {
				W:document.documentElement.clientWidth,
				H:document.documentElement.clientHeight
			}
		},
		setSize:function (){
			dialog.fullPop.style.left = (dialog.view().W - dialog.fullPop.offsetWidth)/2 + "px";
			dialog.fullPop.style.top = (dialog.view().H - dialog.fullPop.offsetHeight)/2 + "px";	
		},
		open:function ( options	){
			//弹窗
			var fullPop  = document.createElement('div');
			//设置遮罩层样式
			//设置弹窗内容和样式。
			fullPop.className = 'full-pop';
			fullPop.style.cssText = 'z-index:2001;position:absolute;left:0px;top:0px;';

			fullPop.innerHTML = dialog.html();

			dialog.fullPop = fullPop;

			document.body.appendChild( fullPop );
			dialog.content(options);
			dialog.setSize();
			dialog.dialogEvent(options);

			return dialog.fullPop;
			
		},
		content:function (options){
			var dialogContent = dialog.fullPop.getElementsByClassName("dialogContent")[0];

			dialogContent.innerHTML = options.content;	
		},
		dialogEvent:function (options){
			window.onresize = dialog.setSize;

			var h3 = dialog.fullPop.getElementsByTagName("h3")[0];
			var close = dialog.fullPop.getElementsByClassName("close")[0];
			var confirm = dialog.fullPop.getElementsByClassName("confirm")[0];
			var cancel = dialog.fullPop.getElementsByClassName("cancel")[0];

			drag.init({
				dragObj:h3,
				moveObj:dialog.fullPop
			});


			close.onclick = function (){
				var bl = options.closeFn.call(dialog.fullPop);
				if( !bl ){
					dialog.fullPop.remove();
				};	
			};
			confirm.onclick = function (){
				var bl = options.okFn.call(dialog.fullPop);
				if( !bl ){
					dialog.fullPop.remove();
				};	
			};
			cancel.onclick = function (){
				var bl = options.cancelFn.call(dialog.fullPop);
				if( !bl ){
					dialog.fullPop.remove();
				};
			};


		}
	}

	dialog.open(options);

	return dialog;
}