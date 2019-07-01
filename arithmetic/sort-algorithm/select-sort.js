let {createNumbers, executeTime} = require('./tools');

let numberArr = createNumbers(0,100,10);


/**
 * 选择排序的基本思路：
 *  先从第一个开始一直到后面，找到最小（最大）的一个，通过交换位置的方式，放在开始位置；
 *  在从剩余的数字中找到最小（最大）的，再交换位置，依次类推，直到找到最后一个为止。
 * 
 *  选择排序的意思就是，每次从中选择最小的那个，依次进行替换位置
 *  
 *  选择排序时间复杂度
    选择排序的时间复杂度是O(N2)。
    假设被排序的数列中有N个数。遍历一趟的时间复杂度是O(N)，需要遍历多少次呢？N-1！因此，选择排序的时间复杂度是O(N2)。

    选择排序稳定性
      是不稳定的
 */
function selectSort(arr) {
  let minIndex;
  for(let i = 0; i < arr.length; i++){  // 循环N次，目的是每一次能找到最小的数
    minIndex = i;
    for(let j = i + 1; j < arr.length; j++){  // 从第2个开始遍历之后所有的
      if(arr[j] < arr[minIndex]){  // 对比找到最小值下标
        minIndex = j;
      }
    }
    if(minIndex !== i) {  // 如果不是在同一位置，则说明找出来最小值的位置，进行交换
      let n = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = n;
    }
  }
}
if(!module.parent){
  executeTime(function(){
    selectSort(numberArr);
  })
}

if(module.parent) {
  module.exports = selectSort;
}
