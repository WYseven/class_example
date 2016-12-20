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
	},
	TitleArrExist(data,valueArr,id){
		return valueArr.filter(function(item){
			return !handle.isTitleExist(data,item.title,id);
		})
	},
	//通过指定id，找到这个id的所有的子孙数据，放在数组中
	getChildsAll(data,id){
		var arr = [];

		var self = handle.getSelfById(data,id);
		arr.push(self);
		//在子数据
		var childs = handle.getChildsById(data,self.id);

		childs.forEach(function (value){
			arr = arr.concat(handle.getChildsAll(data,value.id));
		})

		return arr;
	},
	//指定多个id，找到这些多个id的每一个数据的子孙数据
	/*
		idArr:[1,2,3,4]
		1的子孙数据[{},{}]
		2的子孙数据[{},{}]

		[{},{},{},{}]
	*/
	getChildsAllByIdarr(data,idArr){
		var arr = [];
		idArr.forEach(function (value){
			//arr.push(handle.getChildsAll(data,value));	
			arr = arr.concat(handle.getChildsAll(data,value));
		})

		return arr;
	},

	//指定多个id，删除多个id下面的子孙数据

	delectChildsAll(data,idArr){
		//所有的子孙数据
		var childsAll = handle.getChildsAllByIdarr(data,idArr);
		//循环data，拿到data的每一项，跟childsAll每一项对比
		for( var i = 0; i < data.length; i++ ){
			for( var j = 0; j < childsAll.length; j++ ){
				if( data[i] === childsAll[j] ){
					data.splice(i,1);
					i--;
					break;
				}
			}
		}
	}

	
}


