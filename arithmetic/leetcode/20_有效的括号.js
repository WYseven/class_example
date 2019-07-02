// 利用栈的方式实现
var isValid = function(s) {
<<<<<<< HEAD
    let left = /[([{]/;
    let right = /\)|\]|\}/;
    let total = /\(\)|\[\]|\{|\}/;
    let obj = {
        '(':')',
        '[':']',
        '{':'}',
    }
    let arr = [];
    let first;
    while(s){
        first = s.slice(0,1);
        if(left.test(first)){
            arr.push(first)
        }
        if(right.test(first)){
            let t = arr[arr.length-1]+first;
            if(total.test(t)){
                arr.pop();
            }else {
                return false;
            }
=======
    
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
>>>>>>> f7e54eca434230d0ed22091612cb00a05fa50c54
        }
        s = s.slice(1);
    }
<<<<<<< HEAD
    
    
    return true;
};

console.log(isValid(')(())'));
console.log(isValid('(([][]{}))'));
=======
    // 要保证数组也是空的
    return !stack.length;

};

console.log(isValid('(())'));
console.log(isValid('(([][]{}))'));
console.log(isValid(']'));
>>>>>>> f7e54eca434230d0ed22091612cb00a05fa50c54
