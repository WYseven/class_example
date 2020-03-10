/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
// var addBinary = function(a, b) {
//     const aLen = a.length;  
//     const bLen = b.length;
//     let max = Math.max(aLen, bLen);
//     let s = '';
//     let m = 0;
//     let r = 0;
//     for(let i = 1;i <= max; i++){
//       let A = +(a[aLen-i] || 0);
//       let B = +(b[bLen-i] || 0);
//       let r = (A + B + m);
//       if(r >= 2){
//         r = r % 2;
//         m = 1;
//       }else {
//         m = 0;
//       }
//       s = r + s;
//     }
//     if(m === 1) {
//       s = m + s;
//     }
//     return s;
// };

var addBinary = function(a, b) {
  let s = '';
  let m = 0;
  for(let i = a.length - 1, j = b.length - 1; i >= 0 || j >= 0 || m; i--, j--){
    m += ~~a[i] + ~~b[j];  // ~~ 转成整数， undefined为0； 加上上次超出2的数 0 或者 1
    console.log('m: ', ~~a[i], ~~b[j], m);
    s = String(m%2) + s; // 总数取余，便是填充的位置 拼接之前计算的字符串
    m = m > 1; // 大于1 说明超过进制的限制，向前补 1 否则补 0
  }
  return s;
};

console.log(addBinary("11", "1"));
//console.log(addBinary("1010", "11"));
//console.log(addBinary("10", "11"));