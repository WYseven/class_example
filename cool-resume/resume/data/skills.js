
/*		技能展示
	*   {
	*       temp: @value String         				*         模板
	*       skillsClassify: @value Array                *         掌握的技能综合
	*       	{
					skillLanguage: @value String        *         技能名称
	*       		percent: @value String              *         技能百分比
	*       		skillTooltip: @value Array          *         对技能的描述
				}
	*   }

	temp 有两个值可选：
		"circle"：饼形
		"columns":圆柱
*/

var skills = {
		temp:"circle",
		skillsClassify:[
		{
			skillLanguage:"html5",
			percent:"75%",
			skillTooltip:[
				"熟练掌握各类语义化标签",
				"熟悉对各种标签特性及其相互转换",
				"H5拖拽、视频音频",
				"表格，H5新增表单等……"
			]
		},
		{
			skillLanguage:"CSS3",
			percent:"90%",
			skillTooltip:[
				"掌握浮动及文档流特性",
				"精通定位、浏览器兼容性",
				"CSS3圆角阴影字体等样式有实际案例经验",
				"移动端响应式"
			]
		},
		{
			skillLanguage:"javascript",
			percent:"86%",
			skillTooltip:[
				"了解数据类型、作用域闭包等语言特性",
				"掌握定时器、数组字符串及递归、数组去重等",
				"深入使用DOM\BOM\EVENT，能完成各类组件开发",
				"掌握JS的数据调用、ajax实现机制、各类接口调用",
				"掌握面向对象编程，对封装、继承、多态等均有了解",
				"了解正则表达式，熟悉JS兼容性、JS性能提升"
			]
		},
		{
			skillLanguage:"canvas",
			percent:"60%",
			skillTooltip:[
				"能熟练使用相关接口绘制各类图形",
				"能运用canvas开发小游戏",
				"可封装小型图表等数据可视化技术解决方案"
			]
		},
		{
			skillLanguage:"react",
			percent:"50%",
			skillTooltip:[
				"虚拟DOM、单向数据流、JX",
				"组件通信、props、语法糖、组件嵌套",
				"数组储存结构,map,事件规则……"
			]
		},
		{
			skillLanguage:"jQuery",
			percent:"60%",
			skillTooltip:[
				"移动端响应式",
				"canvas游戏开发"
			]
		},
		{
			skillLanguage:"vue.js",
			percent:"40%",
			skillTooltip:[
				"移动端响应式",
				"canvas游戏开发"
			]
		},
		{
			skillLanguage:"node.js",
			percent:"58%",
			skillTooltip:[
				"移动端响应式",
				"canvas游戏开发"
			]
		}
		
	]
}