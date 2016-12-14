/*操作数据的文件*/

//不要写很多个全局变量函数名，避免全局变量被污染

//es6中 在对象中写方法，可以这样写：
/*
	{
		fn(){
	
		}
	}
*/

var handle = {
	//通过id找到对应的数据
	getSelfById(data,id){
		return data.find(function (value){
			return value.id == id;
		})
	},
	//通过指定id找到子数据
	getChildsById (data,id){
		return data.filter(function (value){
			return value.pid == id;
		})	
	},
	//找到指定id所有的父数据，包含自己
	getParentsAllById (data,id){
		var arr = [];
		var self = 	handle.getSelfById(data,id);
		if( self ){
			arr.push(self);
			arr = arr.concat(handle.getParentsAllById(data,self.pid));
		}
		
		return arr;
	},
	//在指定id的所有的子数据中，是否存在某一个title
	// 存在 true
	// 不存在 false
	isTitleExist(data,value,id){
		var childs = handle.getChildsById(data,id);  //先找到指定id的所有子级
		return childs.findIndex(function(item){
			return item.title === value;
		}) !== -1;
	}
	
}


