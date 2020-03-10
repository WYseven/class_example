/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function(haystack, needle) {
    if(needle === '') return 0;
    let len = needle.length;
    for(let i = 0; i < haystack.length; i++){
      if(haystack.slice(i, i+len) === needle) {
        return i;
      }
    }
    return -1;
};

const  haystack = "hello", needle = "ll";

console.log(strStr(haystack, needle));
console.log(strStr(haystack, ''));
console.log(strStr(haystack, 'aaa'));