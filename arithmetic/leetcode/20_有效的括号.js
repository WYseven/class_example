var isValid = function(s) {
    let reLeft = /\(|\{|\[/g; // 左侧
    let reRight = /\)|\]|\}/g; // 左侧
    let all = /\(\)|\[\]|\{\}/; // 左侧
    
    console.log(s,s.match(reLeft));
    console.log(s,s.match(reRight));

    let valueLeft = s.match(reLeft);
    let valueRight = s.match(reRight);

    for(let i = valueLeft.length - 1; i >= 0; i-- ){
        let a = valueLeft[i] + valueRight[valueLeft.length - 1 - i];
        if(!all.test(a)){
            return false;
        }
    }

    return true;

};

console.log(isValid('(())'));
console.log(isValid('(([][]{}))'));