var arr2=['角','分','块',"十","百","千","万","亿"];
		var obj = {
		    "0": "零",
		    "1": "壹",
		    "2": "贰",
		    "3": "叁",
		    "4": "肆",
		    "5": "伍",
		    "6": "陆",
		    "7": "柒",
		    "8": "捌",
		    "9": "玖",
		};
		var obj2 = {
		    "1": "元",
		    "2": "拾",
		    "3": "佰",
		    "4": "仟",
		    "5": "万",
		    "6": "拾",
		    "7": "佰",
		    "8": "仟"
		}

let num = 6500;

function conver(n){
	// let m = n;
	// let arr = [];
	// let leve = -1;
	// while(m > 0){
	// 	leve++;
	// 	arr[leve] = m % 10;
	// 	m = parseInt(m/10);
	// }
	return String(n).split('');
}

let arr = conver(600050);
let length = arr.length;
let len = length;
let str = '';
while(len--){
	let index = length - 1- len;
	let val = arr[index];
	if(val != 0){
		str += val + obj2[len+1]
	}else {
		str += val
	}
}
let re = /0+/g;
str = str.replace(re, function($0){
	console.log($0);
	return '0';
})
console.log(str);