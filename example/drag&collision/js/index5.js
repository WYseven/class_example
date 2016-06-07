(function(){
	
	var content = tools.$(".content")[0];
	
	//保存所有li的坐标
	var liPosition = [];
	
	var filesSet = tools.$(".filesSet")[0];
	var aLi = tools.$("li",filesSet);
	
	tools.addEvent(content,"mousedown",function(ev){
		ev.preventDefault();
		if(tools.parents(ev.target,"LI")){
			var target = tools.parents(ev.target,"LI");
			var checkInput = tools.$(".checkInput",target)[0];
			if( checkInput.checked ){
				return;
			}
		}
		
		var disX = ev.clientX;
		var disY = ev.clientY;
		var arr = [];
		var collisionDiv;
		document.onmousemove = function (ev){
			
			var e = ev || event;

			var w = e.clientX - disX;
			var h = e.clientY - disY;
			if( Math.abs(w)>5 || Math.abs(h)>5){
				var x = w < 0 ? e.clientX : disX;
				var y = h < 0 ? e.clientY : disY;
				if(!collisionDiv){
					collisionDiv = document.createElement("div");
					collisionDiv.className = "collision";
					collisionDiv.style.left = ev.clientX + "px";
					collisionDiv.style.top = ev.clientY + "px";
					document.body.appendChild(collisionDiv);
				}
				
	
				collisionDiv.style.left = x + "px";	
				collisionDiv.style.top = y + "px";
	
				collisionDiv.style.width = Math.abs(w) + "px";	
				collisionDiv.style.height = Math.abs(h) + "px";
				
				tools.each(arr,function(item){
					licontentHandle(item);
				});
				
				if( !arr.length ){
					tools.each(aLi,function(item){
						licontentHandle(item);
					});
				}
				
				arr.length = 0;
				
				tools.each(aLi,function(item){
					if(tools.collisionRect(collisionDiv,item)){
						arr.push(item);
						licontentHandle(item,true);
					}
				});
			}

			


			ev.preventDefault();
		};
		document.onmouseup = function (){
			document.onmousemove = null;
			document.onmouseup = null;
			if(collisionDiv) document.body.removeChild(collisionDiv);
			collisionDiv = null;
		};
	});
	
	function licontentHandle(currentLi,status){
		var icon = tools.$(".icon",currentLi)[0];
		var checkInput = tools.$(".checkInput",currentLi)[0];
		if( status ){
			icon.style.borderColor = "#2e80dc";
			checkInput.style.display = "block";
			checkInput.checked = true;
		}else{
			icon.style.borderColor = "#fff";
			checkInput.style.display = "none";
			checkInput.checked = false;
		}
	}
	
})()
