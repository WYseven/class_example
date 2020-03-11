let arr = [9, 0, 2, 1, 6, 4, 10, 5, 3];

// [begin,end] 这个区间内没有排序的元素
function quickSort(arr, begin=0, end= arr.length-1){
  if(begin >= end) return;
  // 拿到开始段的第一个元素，作为基数，小于基数的放在左边；大于基数的放在右边
  // 定义两个移动的指针，i 为从左边开始，j为从末尾开始
  let key = arr[begin],i = begin, j = end;
  // 左侧指正不能超过右侧
  while( i < j){
    while(i < j && arr[j] >= key) {  // 从后向前看，大于key，则位置不动，指针向前移动;如果小于基数，就停止循环
      j--;
    }
    arr[i] = arr[j];  // 把小于基数的元素，替换在 i 的位置
    while( i < j && arr[i] <= key) {  // 从前向后看，小于key的元素，位置不动，指针向后移动；如果大于基数，就停止循环
      i++;
    }
    arr[j] = arr[i];  // 把大于基数的元素，替换在 j 的位置。

  }
  // 结束后，i 和 j 的位置是重叠的，替换为 key 的值
  arr[i] = key;
  // 分别递归基数的左侧 和 右侧
  quickSort(arr, begin, i-1);
  quickSort(arr, i+1, end);
  return arr;
}

console.log(quickSort(arr));