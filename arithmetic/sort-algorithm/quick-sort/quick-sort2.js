let arr = [9, 0, 2, 1, 6, 11, 10, 5, 3, 0, 9, 2];

// 在 [begin, end] 区间排序
function quick(arr, begin, end){
  let key = arr[begin], j = begin,r;
  // 定义两个指针，一个慢指针 j ，从begin位置开始，碰到比基准元素小的，则替换 j+1 位置的元素，同时 j 指针向后移一位
  // 快指针为 i，从 begin + 1开始，不断向后取值，与基准元素进行对比，小于基准元素，则与 j+1 位置元素替换
  for(let i = begin + 1; i <= end; i++){
    if(arr[i] < key){
      if( j + 1 !== i) {
        r = arr[i];
        arr[i] = arr[j+1];
        arr[j+1] = r;  // 是把原来 i 位置上元素
      }
      j++;
    }
  }
  // begin 位置的元素 和 j 位置的元素交换位置
  r = arr[j];
  arr[j] = key;
  arr[begin] = r;
  console.log(begin,j,arr[begin],arr[j]);
  return j;

}

// [begin,end] 这个区间内没有排序的元素
function quickSort(arr, begin=0, end= arr.length-1){
  if(begin >= end) return;
  
  const j = quick(arr, begin, end);
  quickSort(arr, begin, j-1);
  quickSort(arr, j+1, end);
  return arr;
}

console.log(quickSort(arr));