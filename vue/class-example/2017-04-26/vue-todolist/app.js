var list = [
	{
		title: 1,
		isSelected:false
	},
	{
		title: 2,
		isSelected:true
	}
]

new Vue({
	el:"#app",
	data:{
		list:list,
		newTodo:'',  //纪录新添加的value值,
		editTodo:'' //记录正在编辑的数据
	},
	computed:{
		allSelect:{
			get(){

				//过滤一下没判断是否所有的都选中

				var newList = this.list.filter(function (item){
					return item.isSelected;	
				})

				return newList.length === this.list.length;	
			},
			set(newValue){
				console.log( newValue );
				this.list.forEach(function (item){
					item.isSelected = newValue;	
				})
			}
		},
		unSelected(){ //未选中的条数
			return this.list.filter(function (item){
				return !item.isSelected	
			}).length;
		}
	},
	methods:{
		removeTodo(index){
			this.list.splice(index,1);
		},
		addTodo(){
			if(this.newTodo.trim() === '') return;
			this.list.push({
				title: this.newTodo,
				isSelected:false
			})

			this.newTodo = '';
		},
		editorTodo(todo){
			
			//存正在编辑的数据
			this.editTodo = todo;
		},
		editoDone(){  //编辑完成
			this.editTodo = '';
		}
	}
})