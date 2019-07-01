function createNumbers (start, end, n) {
  let arr = [];
  let json = {};
  for(let i = 0; i < n; i++){
    let num = Math.round(Math.random() * (end-start) + start);
    if(!json[num]){
      arr.push(num);
      json[num] = 1;
    }else {
      i--;
    }
    
  }

  return arr;
}
/**
 *
 * 生成一个近乎有序的数组，指定交换m次
 * @param {*} n 生成的个数
 * @param {*} m 交换的次数
 */
function createNearlyOrderNumbers(n, m){
  let arr = [];
  for(let i = 0; i < n; i++){
    arr.push(i);
  }
  for(let j = 0; j < m; j++){
    let x = Math.round(Math.random() * (n-1));
    let y = Math.round(Math.random() * (n-1));
    let k = arr[x];
    arr[x] = arr[y];
    arr[y] = k;
  }
  return arr;
}

function  executeTime(sortMethod){
  console.time('sort')
  sortMethod();
  console.timeEnd('sort');
}

module.exports = {
  createNearlyOrderNumbers,
  createNumbers,
  executeTime
}