/**
 * Created by wangyun on 17/2/5.
 */


var obj = require("./tools.js");

console.log(obj.add(1,2));

function add2(n,m){
	return obj.add(n,m)
}

exports.add2 = add2;