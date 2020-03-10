/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function(s) {
    if(s.trim() === '') return 0;
    const a = s.trim().split(' ');
    return a[a.length-1].length;
};

console.log(lengthOfLastWord('Hello World '));
console.log(lengthOfLastWord('Hello W'));
console.log(lengthOfLastWord('a '));