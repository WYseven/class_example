let {createNumbers, executeTime} = require('./tools');
let {insertSortRange} = require('./insert-sort');
let numberArr = createNumbers(0,100,50);
let numberArr2 = numberArr.concat();

/**   
 * 通过二分法，达到了log(N)的层级，每个层级用o(N)的方式来做事情，所以也是Nlog(N)的时间复杂度。
 * 开辟一个和原数组相同大小的数组，作为临时存储的空间，辅助完成排序
 * 多使用了存储空间
*/

function _mergeSort(arr, l, r, temporaryArr){
  if(l >= r) {  // 说明走完了
    return;  
  }
  
  let mid = Math.floor((r + l)/2);
  _mergeSort(arr, l, mid, temporaryArr);
  _mergeSort(arr, mid + 1, r, temporaryArr);
  merge(arr, l, mid, r, temporaryArr);  // 合并起来
}

function merge(arr, l, mid, r, temporaryArr){
  let i = l, // 左开始位置
      j = mid + 1, // 右开始位置
      k = 0; // 临时数组位置，会被比较后填充数字
  while(i <= mid && j <= r ){
    if(arr[i] <= arr[j]){
      temporaryArr[k++] = arr[i];
      i++;
    }else {
      temporaryArr[k++] = arr[j];
      j++;
    }
  }
  while(i <= mid){
    temporaryArr[k++] = arr[i];
    i++;
  }
  while(j <= r){
    temporaryArr[k++] = arr[j];
    j++;
  }
  k = 0;
  while(l <= r){
    arr[l++] = temporaryArr[k++];
  }
}

let mergeSort = function(arr){
  let temporaryArr = [];  // 只需要开辟一个空间
  _mergeSort(arr, 0, arr.length -1, temporaryArr);
}


/***  
 * 第二种是先把原数组按照现在的位置克隆一份出来
*/

function _mergeSort2(arr, l, r){
  if(l >= r) {  // 说明走完了
    return;  
  }

  if(arr.length <= 20){
    insertSortRange(arr, l, r);
    return;
  }
  
  let mid = Math.floor((r + l)/2);
  _mergeSort2(arr, l, mid);
  _mergeSort2(arr, mid + 1, r);
  if(arr[l] > arr[mid+1]){  // 保证在有序的情况下，只有当左边元素大于中间元素，才调用
    merge2(arr, l, mid, r);  // 合并起来
  }
}

function merge2(arr, l, mid, r){
  let i = l, j = mid + 1, k = l, // k是临时存储空间的下标，循环出来
      temporaryArr = [];  // 临时存储的空间
  
  // 按照位置把arr的值给到temporaryArr存储
  let m = l;
  while(m <= r ){
    temporaryArr[m] = arr[m];  // 把数组中对应下标的数字存在临时存储的空间中，从0开始
    m++;
  }
  
  while(k <= r){
    if(i > mid){
      arr[k] = temporaryArr[j];
      j++;
    }else if(j > r){
      arr[k] = temporaryArr[i];
      i++;
    }else if(temporaryArr[i] < temporaryArr[j]){
      arr[k] = temporaryArr[i];
      i++;
    }else {
      arr[k] = temporaryArr[j];
      j++;
    }
    k++;
  }
}

let mergeSort2 = function(arr){
  _mergeSort2(arr, 0, arr.length -1);
}
if(!module.parent){
  console.log('第一种归并排序')
  executeTime(function(){
    mergeSort(numberArr);
  });

  console.log('第二种归并排序')
  executeTime(function(){
    mergeSort2(numberArr2);
  });
}

if(module.parent){
  module.exports = mergeSort2;
}
