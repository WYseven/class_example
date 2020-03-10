/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
// var isMatch = function(s, p) {
//     const re = new RegExp(`^${p}$`, 'g');
//     return re.test(s);
// };

var isMatch = function(s, p) {
  
  for(let i = 0; i < p.length; i++){
    if(p[i] === '.') {
      
      continue;
    }
    if(p[i] === '*') {
      continue;
    }
    if(p[i] === s[i]) {
        
    }
  }

};

const s = "aa", p = "a*b";

console.log(isMatch(s, p));
console.log(isMatch('ab', '.*'));
console.log(isMatch('mississippi', 'mis*is*p*.'));