// 696. 计数二进制子串

function match(s){
  let zeroOrOne = s.match(/^(0+)|(1+)/)[0];  // 匹配0或者1
  let reverse = (zeroOrOne[0]^1).toString().repeat(zeroOrOne.length)  // 0变为1，1变为0
  let re = new RegExp(`^${zeroOrOne}${reverse}`);
  if(re.test(s)){
    return s.match(re)[0];
  }
  return '';

  /*if(s.startsWith(zeroOrOne+reverse)){
    return zeroOrOne+reverse
  }
  return '';*/
}

var countBinarySubstrings = function(s) {
  let result = [];
    for(let i = 0; i< s.length; i++){
      let r = match(s.slice(i));
      if(r){
        result.push(r);
      }
    }
  return result;
};

console.log(countBinarySubstrings("00110011"));
console.log(countBinarySubstrings("10101"));

/***  
 * 依次去找
 * 00110011
 * 0110011
 * 110011
 * 10011
 * 
*/