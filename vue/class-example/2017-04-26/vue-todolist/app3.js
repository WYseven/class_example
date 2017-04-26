var list = [
	{
		title: 1,
		isSelected:false
	},
	{
		title: 2,
		isSelected:false
	}
]

new Vue({
	el:"#app",
	data:{
		list:list,
		newTodo:'',  //纪录新添加的value值,
		editTodo:'' //记录正在编辑的数据
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