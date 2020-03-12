let arr = [9, 0, 2, 1, 6, 11, 10, 5, 3, 0, 9, 2];

// 双路快排

// [begin,end] 这个区间内没有排序的元素
function quickSort(arr, begin=0, end= arr.length-1){
  if(begin >= end) return;
  // 防止是几乎有序数组，效率会慢，改进，随机找一个值
  let ele = ~~(Math.random() * (end-begin)+1) + begin;
  let key,r;
  r = arr[begin];
  arr[begin] = arr[ele];
  arr[ele] = r;
  key = arr[begin];
  
  let i = begin+1, j = end;
  // arr[begin+1, i） 之间小于 key
  // arr(j, end] 之前小于key
  while(true) {
    while(i <= end && arr[i] < key) {i++;}
    while(j >= begin+1 && arr[j] > key) {j--;}
    if(i > j) break;
    r = arr[i];
    arr[i] = arr[j];
    arr[j] = r;
    i++;
    j--;
  }
  r = arr[j]
  arr[j] = key;
  arr[begin] = r;

  quickSort(arr, begin, j-1);
  quickSort(arr, j+1, end);
  return arr;
}

console.log(quickSort(arr));