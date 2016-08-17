
//读一个文件夹下所有的内容
let fs = require("fs");
let path = require("path");

fs.readdir(__dirname+"/example",(...arg) => {
	console.log( arg );
})


