var list = [
	{
		title:"hello",
		isSelected:false
	},
	{
		title:"hello",
		isSelected:true
	},
	{
		title:"hello",
		isSelected:false
	}
]

new Vue({
	el:"#app",
	data:{
		list:list
	},
	methods:{
		removeTodo(index){
			console.log(index);
			this.list.splice(index,1);
		}
	}
})