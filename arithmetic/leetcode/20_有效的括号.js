var isValid = function(s) {
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
        }
        s = s.slice(1);
    }
    
    
    return true;
};

console.log(isValid(')(())'));
console.log(isValid('(([][]{}))'));