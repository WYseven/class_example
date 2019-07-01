// 利用栈的方式实现
var isValid = function(s) {
    
    let flagMap = {
        ")": "(",
        "}": "{",
        "]": '['
    }
    let stack = [];
    for(let i = 0; i < s.length; i++){
        if(!(s[i] in flagMap)){
            stack.push(s[i]);
        }else if(flagMap[s[i]] !== stack.pop()){
            return false
        }
    }
    // 要保证数组也是空的
    return !stack.length;

};

console.log(isValid('(())'));
console.log(isValid('(([][]{}))'));
console.log(isValid(']'));