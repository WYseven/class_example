/*
 * 使用说明：var halo = H5_Component_Halo(data); 无需new  halo储存的就是dom节点 直接插入页面即可
 * 数据格式 ：var data = {
				W:590,   //设置大小 可以不设置，页面切图尺寸默认590
				id: 'h5_halo',  //返回节点的ID 不穿默认 #h5_halo
				data:[    //数据格式，每一项技能  不超过8条 其中百分比要不超过1 注意名字最好不要超过12个字符，已经做了处理 只能显示12个字符
					['JS',0.2],
					['Canvas',0.4],
					['CSS3',0.5],
					['React',0.6],
				]
			};
 */

function H5_Component_Halo(data, w) {

	return new H5_Component_Halo.fn.init(data, w);
}

H5_Component_Halo.fn = H5_Component_Halo.prototype = {
	constructor: H5_Component_Halo,
	animationEnd:null,
	init: function(data) {
		//每项数据
		this.data = data.data || [
			['JS', 0.8]
		];
		this.animationEnd = data.animationEnd;
		//判断数据的长度是否超过8个，超过8个就默认只取得前8个 也就是 0 - 7
		if(this.data.length > 8) {
			this.data.length = 8;
		}
		//console.log(data.data);
		//外层画布大小
		this.W = data.W || 590;
		//创建外层容器并初始化
		this.component = document.createElement('div');
		this.component.id = this.data.id || 'h5_halo';
		this.component.style.width = this.component.style.height = this.W + 'px';
		this.component.style.position = 'relative';
		this.component.style.borderRadius = '50%';
		//透明度颜色值
		this.alpha = ['rgba(59, 221, 223, .2)', 'rgba(59, 221, 223, .2)', 'rgba(37, 208, 245, .2)', 'rgba(27, 183, 241, .2)', 'rgba(27, 158, 241,.2)', 'rgba(20, 128, 236,.2)', 'rgba(39, 97, 177, .2)', 'rgba(34, 60, 139, .2)', ];
		//数据对应颜色值
		this.colors = ['rgba(59, 221, 223, 1)', 'rgba(59, 221, 223, 1)', 'rgba(37, 208, 245, 1)', 'rgba(27, 183, 241, 1)', 'rgba(27, 158, 241,1)', 'rgba(20, 128, 236,1)', 'rgba(39, 97, 177, 1)', 'rgba(34, 60, 139, .4)', ];

		this.outterArr = []; //存储数据层
		this.innerArr = []; //存储空白层

		this.flag = 0;
		this.ev = 0;
		this.onOff = false; //用来判断是否移入的是提示框

		this.initDraws(); //初始化 画布
		this.initPath(); //初始化动画
		this.initData(); //初始化数据框
		this.eachOther() //初始化交互
	},
	componentHtml:function (){
		return this.component;		
	},
	someNum: function(n) {
		var arr = [];
		for(var i = 0; i < n; i++) {
			arr.push(0);
		}
		return arr;
	},
	animateEnd:function (callback){
		callback();
	},
	//创建所有画布
	initDraws: function() {
		var temp = document.createDocumentFragment();
		for(var i = 0; i < 16; i++) {
			var canvas = document.createElement('canvas');
			//初始化画布样式
			canvas.style.position = 'absolute';
			canvas.style.borderRadius = '50%';
			canvas.style.transition = '500ms cubic-bezier(.15,1.93,.64,.58)';
			//canvas.style.background = '#eef2f5';
			if(i % 2 === 0) {
				canvas.width = canvas.height = this.W - (i / 2) * this.W * 6 / 59;
				canvas.style.left = canvas.style.top = this.W * 6 / 59 / 2 * (i / 2) + 'px';
				this.outterArr.push(canvas);
			} else {
				canvas.width = canvas.height = this.W - (this.W * 14 / 295) * 2 - (i - 1) / 2 * (this.W * 6 / 59);
				canvas.style.left = canvas.style.top = ((this.W * 14 / 295) + (this.W * 6 / 59 / 2) * (i - 1) / 2) + 'px';
				canvas.style.background = '#eef2f5';
				this.innerArr.push(canvas);
			}
			temp.appendChild(canvas);
		}
		this.component.appendChild(temp);
	},
	//载入动画初始化
	initPath: function() {
		var _this = this;
		var speed = 10;
		//创建8个变量，用来控制每组动画
		var indexArr = this.someNum(8);
		indexArr.forEach(function(item, j) {
			for(var i = 0; i < 100; i++) {
				setTimeout(function() {
					item += 0.01;
					if(item > 1) {
						item = 1;
					}
					_this.drawPath(item, j);
					_this.flag++;
					//console.log(_this.flag);
				}, 700 - j * 20 + i * (speed += 0.001))
			}
		});
		var per = 0;
		var dataTimer = setInterval(function() {
			if(_this.flag === 800) {
				clearInterval(dataTimer);
				for(var i = 0; i < 100; i++) {
					setTimeout(function() {
						per += 0.01;
						if(per > 1) {
							per = 1;
						}
						for(var i = 0; i < _this.data.length; i++) {
							_this.initLd(per, (7 - i), _this.data[i][1]);
							_this.initRd(per, (7 - i), _this.data[i][1]);
						}
						_this.ev++;

						if( _this.ev === 100 ){
							_this.animationEnd();
						}

					}, 200 + i * 5);
				}
			}
		}, 16);
	},
	//绘制载入动画
	drawPath: function(per, index) {
		var cxt = this.outterArr[index].getContext('2d');
		cxt.clearRect(0, 0, cxt.canvas.width, cxt.canvas.height);
		cxt.beginPath();
		cxt.lineWidth = this.W * 4 / 59;
		cxt.strokeStyle = this.alpha[index];
		cxt.arc((this.W - index * (this.W * 6 / 59)) / 2, (this.W - index * (this.W * 6 / 59)) / 2, (this.W - index * (this.W * 6 / 59) - (this.W * 4 / 59 + 2)) / 2, 1.5 * Math.PI, 1.5 * Math.PI + 2 * Math.PI * per);
		cxt.stroke();
	},
	//初始化数据动画左侧
	initLd: function(per, index, x) {
		this.outterArr[index].data = true;
		var cxt = this.outterArr[index].getContext('2d');
		cxt.beginPath();
		cxt.strokeStyle = this.colors[index];
		cxt.lineWidth = this.W * 4 / 59;
		cxt.arc((this.W - index * (this.W * 6 / 59)) / 2, (this.W - index * (this.W * 6 / 59)) / 2, (this.W - index * (this.W * 6 / 59) - this.W * 4 / 59) / 2, 1.5 * Math.PI, 1.5 * Math.PI - Math.PI * (x) * per, true);
		cxt.stroke();
	},
	//初始化数据动画右侧
	initRd: function(per, index, x) {
		var cxt = this.outterArr[index].getContext('2d');
		cxt.beginPath();
		cxt.strokeStyle = this.colors[index];
		cxt.lineWidth = this.W * 4 / 59;
		cxt.arc((this.W - index * (this.W * 6 / 59)) / 2, (this.W - index * (this.W * 6 / 59)) / 2, (this.W - index * (this.W * 6 / 59) - this.W * 4 / 59) / 2, 1.5 * Math.PI, 1.5 * Math.PI + Math.PI * (x) * per);
		cxt.stroke();
	},
	//数据提示框动画
	initData: function() {
		this.tipsCanvas = document.createElement('canvas');
		this.tipsCanvas.id = 'canTips';
		this.tipsCanvas.style.position = 'absolute';
		this.tipsCanvas.style.visibility = 'hidden';
		this.tipsCanvas.style.top = (-this.W) + 'px';
		this.tipsCanvas.style.left = (this.W - this.W * 144 / 590) / 2 + 'px';
		this.tipsCanvas.style.transition = '200ms';
		this.tipsCanvas.style.opacity = 0;
		//this.tipsCanvas.style.background = '#fff'
		this.tipsCanvas.width = this.W * 144 / 590;
		this.tipsCanvas.height = this.W * 100 / 590;
		//this.tipsCanvas.style.border = '1px solid red';

		this.tipsCxt = this.tipsCanvas.getContext('2d');
		this.tipsCxt.lineWidth = 2;

		this.component.appendChild(this.tipsCanvas);
	},
	//提示框动画交互
	tipsIn: function(index) {
		//var context = document.getElementById('canvas').getContext('2d');
		var _this = this;
		var p = _this.data[index][1].toString().length > 4 ? 1 : 0; //用来判断传入的百分比是几位小数
		//说明文字
		function textCan(index, context) {
			context.beginPath();
			context.fillStyle = 'rgba(0,0,0,1)';
			context.font = '' + ((_this.W * 144 / 590) * 18 / 144) + 'px/' + ((_this.W * 100 / 590) * 20 / 100) + 'px Courier New';
			context.textAlign = 'center';
			context.fillText(_this.data[index][0].substring(0, 12), (_this.W * 144 / 590) / 2, (_this.W * 126 / 590) / 2);
		}

		var per = this.onOff ? 1 : 0;

		moveData();

		function moveData() {
			for(var i = 0; i < 100; i++) {
				setTimeout(function() {
					per += 0.01;
					if(per >= 1) {
						per = 1;
					}
					drawText(per, index, _this.tipsCxt);
					textCan(index, _this.tipsCxt);
					//_this.num++;
				}, 200 + i * 2);
			}
		}
		//百分比文字
		function drawText(per, index, context) {
			context.clearRect(0, 0, context.canvas.width, context.canvas.height);
			drawWrap();
			context.beginPath();
			context.fillStyle = 'rgba(39, 97, 177, .7)';
			context.font = '' + ((_this.W * 144 / 590) * 28 / 144) + 'px/' + ((_this.W * 100 / 590) * 20 / 100) + 'px Courier New';
			context.textAlign = 'center';
			context.fillText((_this.data[index][1] * 100 * per).toFixed(p) + '%', (_this.W * 144 / 590) / 2, ((_this.W * 120 / 590) * 30 / 100));
		}

		function drawWrap() {
			drawRoundedRect(_this.tipsCxt, 'rgba(20, 128, 236,.95)', 'rgba(255,255,255,.95)', 2, 2, (_this.W * 144 / 590 - 4), ((_this.W * 100 / 590) * 78) / 100, 8); //矩形框
			//小三角
			_this.tipsCxt.beginPath();
			_this.tipsCxt.lineWidth = 1.5;
			_this.tipsCxt.fillStyle = '#fff';
			_this.tipsCxt.lineTo((_this.W * 144 / 590 - 10) / 2, ((_this.W * 100 / 590) * 78) / 100 + 2);
			_this.tipsCxt.lineTo((_this.W * 144 / 590 - 10) / 2 + 5, ((_this.W * 100 / 590) * 78) / 100 + 6);
			_this.tipsCxt.lineTo((_this.W * 144 / 590 - 10) / 2 + 10, ((_this.W * 100 / 590) * 78) / 100 + 2);
			_this.tipsCxt.stroke();
			_this.tipsCxt.fill();
			//小三角
			_this.tipsCxt.beginPath();
			_this.tipsCxt.strokeStyle = '#fff';
			_this.tipsCxt.lineTo((_this.W * 144 / 590 - 10) / 2 + 5, ((_this.W * 100 / 590) * 78) / 100 + 2);
			_this.tipsCxt.lineTo((_this.W * 144 / 590 - 10) / 2, ((_this.W * 100 / 590) * 78) / 100 + 2);
			_this.tipsCxt.stroke();
			//小圆点
			_this.tipsCxt.beginPath();
			_this.tipsCxt.fillStyle = '#fff';
			_this.tipsCxt.arc((_this.W * 144 / 590) / 2, (_this.W * 100 / 590 - (_this.W * 100 / 590) / 25 - 2), (_this.W * 100 / 590) / 25, 0, 2 * Math.PI);
			_this.tipsCxt.fill();

			function roundedRect(context, cornerX, cornerY, width, height, cornerRadius) {
				if(width > 0) context.moveTo(cornerX + cornerRadius, cornerY);
				else context.moveTo(cornerX - cornerRadius, cornerY);
				context.arcTo(cornerX + width, cornerY, cornerX + width, cornerY + height, cornerRadius);
				context.arcTo(cornerX + width, cornerY + height, cornerX, cornerY + height, cornerRadius);
				context.arcTo(cornerX, cornerY + height, cornerX, cornerY, cornerRadius);
				if(width > 0) {
					context.arcTo(cornerX, cornerY, cornerX + cornerRadius, cornerY, cornerRadius);
				} else {
					context.arcTo(cornerX, cornerY, cornerX - cornerRadius, cornerY, cornerRadius);
				}
			}

			function drawRoundedRect(context, strokeStyle, fillStyle, cornerX, cornerY, width, height, cornerRadius) {
				var context = context;
				context.beginPath();
				roundedRect(context, cornerX, cornerY, width, height, cornerRadius);
				context.strokeStyle = strokeStyle;
				context.fillStyle = fillStyle;
				context.stroke();
				context.fill();
			}
		}
	},
	//交互效果
	eachOther: function() {
		var _this = this;
		this.tipsCanvas.addEventListener('mouseenter', function() {
			_this.onOff = true;
		});
		this.tipsCanvas.addEventListener('mouseleave', function() {
			setTimeout(function() {
				_this.onOff = false;
			}, 20);
		});
		this.component.addEventListener('mouseleave', function() {
			if(_this.ev === 100){
				console.log(1);
				_this.tipsCanvas.style.visibility = 'hidden';
				_this.tipsCanvas.style.top = (-_this.W) + 'px';
				_this.tipsCanvas.style.opacity = 0;
				_this.outterArr[0].style.transform = 'scale(1)';
				_this.outterArr[1].style.transform = 'scale(1)';
				_this.innerArr[0].style.transform = 'scale(1)';
			}
		});
		_this.outterArr.forEach(function(item, i, arr) {
			item.addEventListener('mouseover', function(e) {
				var e = e || window.event;
				if(_this.ev === 100) {

					_this.outterArr.forEach(function(item) {
						item.style.transform = 'scale(1)';
					})
					_this.innerArr.forEach(function(item) {
						item.style.transform = 'scale(1)';
					})
					_this.tipsCanvas.style.visibility = 'hidden';
					//_this.tipsCanvas.style.transition = '1000ms';

					this.style.transform = 'scale(' + (1 + (i + 1) * 0.008) + ')';
					if(i == 0) {
						this.style.transform = 'scale(' + (1.008) + ')';
						arr[1].style.transform = 'scale(' + (0.995) + ')';
						_this.innerArr[i].style.transform = 'scale(' + (0.995) + ')';
					} else if(i >= 1 && i < arr.length - 1) {
						arr[i + 1].style.transform = 'scale(' + (0.99) + ')';
						arr[i - 1].style.transform = 'scale(' + (1.003) + ')';
						_this.innerArr[i - 1].style.transform = 'scale(' + (1 + (i + 1) * 0.007) + ')';
						_this.innerArr[i].style.transform = 'scale(' + (0.99) + ')';
					} else {
						this.style.transform = 'scale(' + (1.08) + ')';
						arr[i - 1].style.transform = 'scale(' + (0.99) + ')';
						_this.innerArr[i - 1].style.transform = 'scale(' + (1.08) + ')';
						_this.innerArr[i - 2].style.transform = 'scale(' + (0.99) + ')';
						_this.innerArr[i].style.transform = 'scale(' + (0.92) + ')';
					}
					if(this.data && _this.tipsCanvas.style.visibility == 'hidden') {
						_this.tipsCanvas.style.visibility = 'visible';
						//如果不需要动画就打开注释
						/*if(_this.tipsCanvas.style.transition !== 'none'){
							setTimeout(function (){
								_this.tipsCanvas.style.transition = 'none';
							},200)
						}*/
						_this.tipsCanvas.style.opacity = 0.9;
						_this.tipsCanvas.style.left = (_this.W - _this.W * 144 / 590) / 2 + 'px';
						_this.tipsCanvas.style.top = '' + ((_this.W * 6 / 59 / 2) * 8 - _this.W * 114 / 590 - (7 - i) * (_this.W * 6 / 59 / 2)) + 'px';
						_this.tipsIn(7 - i);
						_this.num = 100;
					}
				}
				e.stopPropagation();
			});
			item.addEventListener('mouseout', function(e) {
				var e = e || window.event;
				e.stopPropagation();
			});

		})
		this.innerArr.forEach(function(item, i, arr) {
			item.addEventListener('mouseover', function(e) {
				var e = e || window.event;
				_this.tipsCanvas.style.visibility = 'hidden';

				if(i == arr.length - 1) {
					_this.outterArr[i].style.transform = 'scale(1)';
					arr[i - 1].style.transform = 'scale(1)';
				}
				e.stopPropagation();
			})
			item.addEventListener('mouseout', function(e) {
				var e = e || window.event;
				e.stopPropagation();
			})
		});
	}
};

H5_Component_Halo.fn.init.prototype = H5_Component_Halo.fn;