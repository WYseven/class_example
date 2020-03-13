// 利用栈的方式实现
var isValid = function(s) {
    
    let flagMap = {
        ")": "(",
        "}": "{",
        "]": '['
    }
    let stack = [];
    for(let i = 0; i < s.length; i++){
        // 碰到是符号的左半边，就压入到栈中
        if(!(s[i] in flagMap)){
            stack.push(s[i]);
        }else if(flagMap[s[i]] !== stack.pop()){ // 先根据映射，拿到左半边，与栈顶元素对比，如果不是相同符号，说明不是有效的，没必要继续比较了
            return false
        }
    }
    // 要保证数组也是空的
    return !stack.length;

};

console.log(isValid('(())'));
console.log(isValid('(([][]{}))'));
console.log(isValid('[()])'));
