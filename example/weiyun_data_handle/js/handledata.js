function getChildById(arr,pid){
	var newArr = [];
	for( var i = 0; i < arr.length; i++ ){
		if( arr[i].pid == pid ){
			newArr.push(arr[i]);
		}
	};

	return newArr;
};
//找到当前数据的所有父级的name名字
function getParentsNameAll(currentId){
	return getParents(currentId).map(function (item){
		return item.name
	});
};
//获取当前id在第几层
function getLevelById(data,id){
	return getParents(data,id).length;
}
//获取当前id的所有的父级
function getParents(data,currentId){
	var arr = [];
	for( var i = 0; i < data.length; i++ ){
		if( data[i].id == currentId ){
			arr.push(data[i]);
			arr = arr.concat(getParents(data,data[i].pid))
			break;
		}
	}
	return arr;
}
//获取数据的父级
function getParent(data,id){
	var parent = null;
	for( var i = 0; i < data.length; i++ ){
		if( data[i].id == id ){
			for( var j = 0; j < data.length; j++ ){
				if( data[i].pid == data[j].id ){
					parent = data[j]
				}
			}
			break;
		}
	}
	return parent;
}
function getChilds(data,currentId,arr,bl){
	/*
	 bl代表是否包含当前元素
	 */
	if( arr.constructor === Boolean ){
		bl = arr;
		arr = null;
	}
	var arr = arr || [];

	var childs = getChildById(data,currentId);
	if( bl ){
		for( var j = 0; j < data.length; j++ ){
			if( data[j].id == currentId ){
				arr.push(data[j]);
			}
		}
	}
	for( var i = 0; i < childs.length; i++ ){
		arr.push(childs[i]);
		getChilds(data,childs[i].id,arr)
	}
	return arr;
}
//修改自上而下的数据的id 数据的第一个为总的文件夹
function changeDataId(newChild,item,pid){
	//改变数据的id
	var prevId = item.id;
	var prevPid = item.pid;
	var newId = random();
	var newPid = pid;
	item.id = newId;
	item.pid = newPid;
	for( var i = 1; i < newChild.length; i++ ){
		if( newChild[i].pid == prevId ){
			changeDataId(newChild,newChild[i],newId);
		}
	}
}

function changeDataById(newChild,pid){
	//把数据重新拷贝一份
	var extendChild = tools.extend(newChild,true);
	changeDataId(extendChild,extendChild[0],pid);
	return 	extendChild;
}
function random(){
	return new Date().getTime() + Math.round(Math.random()*1000000);
}
//判断一个数组中是否包含另一个项
function contains(arr,item){
	for( var j = 0; j < arr.length; j++ ){
		if( arr[j] === item ) return true
	}
	return false;
}
//要删除的数据，传入一个数组
function delectDataByData(data,childs){
	return data.filter(function (item){
		return !contains(childs,item)
	});
}

//数据中是否已经存在这个名字
function isNameExsit(data,id,names){
	var childs = getChildById(data,id);
	for( var i = 0; i < childs.length; i++ ){
		if( childs[i].name === names ){
			return true;
			break;
		}
	}
	return false;
}

//修改某个id的名字
function changeNameById(data,id,names){
	for( var i = 0; i < data.length; i++ ){
		if( data[i].id == id ){
			data[i].name = names;

			return true;
		}
	}
	return false;	
}