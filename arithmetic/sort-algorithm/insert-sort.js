let {createNumbers, executeTime} = require('./tools');

let numberArr1 = createNumbers(0,50,10);
let numberArr2 = numberArr1.concat();
let numberArr3 = numberArr1.concat();

/**
 * 从第二个元素开始取，依次对比之前的每个元素，如果对比比较小，就交换位置。
 * 
 * 插入排序，其实就是拿到一个数字后，和已经排好序的进行对比，对比过后插入到合适的位置。
 * 
 * 没必要每次都对比后交换位置，而是找到要插入的合适位置，直接替换即可。
 * 
 * 当有个近乎有序的数组时，插入排序的耗时非常的少
 * 在已经排序好的数组来说，插入排序可以变成是o(n)的时间复杂度，因为循环到内层后就不满足条件，内层循环不走了
 */
// 缺点： 每次都要交换位置，太耗时
function insertSort(arr){
  let mVal;
  // 有多少个元素就循环多少次,第一个元素没必要对比，少循环一次
  for(let i = 1; i < arr.length; i++){
    // 从大位置到小位置依次对比
    for(let j = i; j > 0; j--){
      if(arr[j] < arr[j - 1]){  // 小于前一个位置，交换位置
        mVal = arr[j];
        arr[j] = arr[j-1];
        arr[j-1] = mVal;
      }
    }
  }
}
// 改进：拿到要对比的数字，和排好序的之前元素依次对比，当不满足条件时，就是要插入的位置
function insertSort2(arr){
  let mVal;
  // 有多少个元素就循环多少次,第一个元素没必要对比，少循环一次
  for(let i = 1; i < arr.length; i++){
    // 从大位置到小位置依次对比
    mVal = arr[i];
    let j;  // 要插入的位置
    for(j = i; j > 0 && mVal < arr[j - 1]; j--){
      arr[j] = arr[j - 1];
    }
    arr[j] = mVal;
  }
}
/** 对数组[l...r]之间的数进行排序*/
function insertSortRange(arr, l, r){
  let mVal;
  for(let i = l; i <= r; i++){
    mVal = arr[i];
    let j;
    for(j = i; j > 0 & mVal < arr[j-1]; j--){
      arr[j] = arr[j - 1];
    }

    arr[j] = mVal;
  }
}

// node xx.js 执行
if(!module.parent) {
  executeTime(function(){
    //insertSort(numberArr);
    insertSort(numberArr1);
    //console.log(numberArr1);
  })
  executeTime(function(){
    insertSort2(numberArr2);
    //console.log(numberArr2);
  })
  console.log('测试指定范围排序')
  executeTime(function(){
    insertSort2(numberArr3, 0, numberArr3.length-1);
  })
  console.log(numberArr3);
}

if(module.parent){
  module.exports = {
    insertSort: insertSort,
    insertSortRange
  };
}