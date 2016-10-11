(function($a){
	jQuery.noConflict();
	$a("body").width($a(window).width());
	$a("body").height($a(window).height());
	function fn(){
		this.element = $a("#con1Canvas");							//获取元素
		this.width = $a(window).width();						//获取元素的width
		this.height = $a(window).height();						//获取元素的height
		this.targetQuyu = {x: this.width/2, y: this.height/2};	//设置渲染区域
		this.points = [];										//设置一个空数组，用于储存效果区域的每个点的位
		this.ctx;
		this.init();	
		//this.drawArc();										//初始化
		this.animate1();
		//this.drawLines()
	}
	fn.prototype = {											//fn函数的原型
		constructor:fn,											//把函数的原型指向fn函数
		init:function(){
			this.element[0].width = this.width;
			this.element[0].height = this.height;
			this.ctx = this.element[0].getContext('2d');		//getContext是一个方法，调用以后可以用上面的方法，进行画布
	        //for循环画布区域的宽，每个点的位置相差=x+width/20
	        for(var x = 0; x < this.width; x = x + this.width/20) {
	        	//高也一样
	        	// console.log(x);
	            for(var y = 0; y < this.height; y = y + this.height/20) {
	                var px = x + Math.random()*this.width/20;
	                var py = y + Math.random()*this.height/20;
	               
	                var p = {x: px, originX: px, y: py, originY: py };
	                //把每个点的坐标都push进points里面
	                this.points.push(p);
	            }
	        }
			
			//找到每个点相邻的最近的5个点
			for(var i = 0; i<this.points.length; i++){
				var arr1 = [];
				var p1 = this.points[i];
				for(var j = 0; j<this.points.length; j++){
					var p2 = this.points[j];
					if(!(p1 == p2)){

						//p2 = {4}

						//[{1},{2},{3},{4}]   //arr1 = [{2},{3}];

						var onOff = false;
						if( arr1.length === 5 ){

							for(var l = 0; l<5; l++){		//当arr1[k]不为空时，把每个点与它进行比较，小于的时候赋值，并且，重新开始，不小于的时候再循环下一个
								if(!onOff){
									if(this.pow(p1,p2) < this.pow(p1,arr1[l])){
										arr1[l] = p2;
										onOff = true;
										break;
									}
								}
							}
						}else{
							arr1.push(p2);
						}
					}
				}
				this.points[i].newArr = arr1.map(function (item){
					return $a.extend(true,{},item)
				});
		    };

		 	window.addEventListener('mousemove', $a.proxy(this.mouseMove,this));
		},
		drawArc:function(){
			for(var i = 0; i<this.points.length; i++){

				this.ctx.beginPath();//丢弃任何当前定义的路径并且开始一条新的路径。它把当前的点设置为 (0,0)。
				this.ctx.arc(this.points[i].x, this.points[i].y, 4, 0, 2 * Math.PI, false);

				this.ctx.fillStyle = 'rgba(156,217,249,1)';//绘制颜色
				//this.ctx.fillStyle = 'rgba(156,217,249,.9)'
				this.ctx.fill();
			}
	    },
		drawLines:function (index) {
	        for(var i = 0; i < 5; i++) {
	            this.ctx.beginPath();
	            this.ctx.moveTo(index.x, index.y);
	            this.ctx.lineTo(index.newArr[i].x, index.newArr[i].y);
	            this.ctx.strokeStyle = 'rgba(156,217,249,'+ index.newArr[i].active+')';
	            this.ctx.stroke();
	    	}
	    },
		animate0:function(index){
			var _this = this;
	        TweenLite.to(index, 1+1*Math.random(), {x:index.originX-50+Math.random()*100,
	            y: index.originY-50+Math.random()*100, ease:"linear",
	            onComplete: function() {
	                $a.proxy(_this.animate0(index),_this);
	            }});
		   
		},
		animate1:function(){
			this.chonghui();
			for(var i = 0; i<this.points.length; i++){
				this.animate0(this.points[i]);
			}
		},
		chonghui:function(target){
			///console.log(this);
			target = target || this.targetQuyu;
			//在给定的矩形内清除指定的像素。
			this.ctx.clearRect(0,0,this.width,this.height);
			for(var i = 0; i<this.points.length; i++){
				if(Math.abs(Math.sqrt(this.pow(target, this.points[i]))) < 100){
					this.points[i].active = 0.2;
					for(var j = 0; j<5; j++){
						this.points[i].newArr[j].active = 0.6;
					}
				}else if(Math.abs(Math.sqrt(this.pow(target, this.points[i]))) < 200) {
                    this.points[i].active = 0.1;
                    for(var j = 0; j<5; j++){
						this.points[i].newArr[j].active = 0.3;
					}
                } else if(Math.abs(Math.sqrt(this.pow(target, this.points[i]))) < 300) {
                    this.points[i].active = 0.05;
                    for(var j = 0; j<5; j++){
						this.points[i].newArr[j].active = 0.1;
					}
                } else {
                    this.points[i].active = 0;
                    for(var j = 0; j<5; j++){
						this.points[i].newArr[j].active = 0;
					}
                }
                this.drawLines(this.points[i]);
			};
			this.drawArc();
			var _this = this;
			setTimeout(function(){
				_this.chonghui(target);
			})
		},
		mouseMove:function (ev) {
	        var posx = posy = 0;
	        if (ev.pageX || ev.pageY) {
	            posx = ev.pageX;
	            posy = ev.pageY;
	        }
	        else if (ev.clientX || ev.clientY)    {
	            posx = ev.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
	            posy = ev.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	        }
	        this.targetQuyu.x = posx;
	        this.targetQuyu.y = posy;
	    },
		pow:function(p1,p2){
			return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
		}
	}
	var main = new fn();
})(jQuery)