let arr = [9,0,2,1,6,4];

// 把左右两个数组归并起来
function merge(left, right){
  // 对比两个数组的第一个元素，决定把谁放在前面,同时把第一个元素从数组中删除掉
  let result = [];
  while(left.length && right.length){
    if(left[0] <= right[0]){
      result.push(left.shift());
    }else {
      result.push(right.shift());
    }
  }
  // 结束之后，如果有一个还有值的话，就把剩下的元素直接放在数组中
  while(left.length) result.push(left.shift())
  while(right.length) result.push(right.shift())
  return result;
}

// 自上而下的递归方式
function mergeSort(arr){
  let len = arr.length;
  if(len < 2) return arr;
  // 先从中间分成左右两个数组
  let middle = ~~(len/2);
  let left = arr.slice(0, middle);
  let right = arr.slice(middle);
  // 再次把左右两个数组，继续分割，递归调用 mergeSort 这个方法
  // 把左右两个数组，归并起来
  return merge(mergeSort(left), mergeSort(right));
}

console.log(mergeSort(arr));