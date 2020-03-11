let arr = [9,0,2,1,6,4,10,5,0]; 

// 将数组的[l,m]个元素和[m+1,r]个元素，进行归并
function merge(arr, l, m, r){
  // 找到要操作的元素
  // 新建一个数组，将[l,r]之间的元素存放在新数组中
  let newArr = [];
  for(let i = l; i <= r; i++){
    newArr[i-l] = arr[i];
  }
  
  // 定义两个指正，分别从左边和右边开始
  let i = l,j = m + 1;
  // 再定义k，是应该要填入的值
  for(let k = l; k <= r; k++) {
    // 如果左边指针查过了中间值，说明左边循环完了，把右边的值依次赋值给k位置即可
    if(i > m) {
      arr[k] = newArr[j-l];
      j++;
    }else if(j > r) {
      arr[k] = newArr[i-l]; 
      i++
    }else if(newArr[i-l] < newArr[j-l]){  // 如果左边的值小于右边，就把左边值给到k位置，通水左边位置向前挪一位
      arr[k] = newArr[i-l];
      i++;
    }else {
      arr[k] = newArr[j-l];
      j++;
    }
  }
}

// 自上而下的递归方式
function mergeSort(arr,l=0,r=arr.length-1){
  // 如果数量级小的话（15） 个元素，可以使用插入排序，效率更高


  if(l>=r) return;
  // 先从中间分成左右两个数组
  let middle = ~~((r+l)/2);

  // 左边下标从 [l,mindel]
  // 右边下标从 [middle+1, r]

  mergeSort(arr, l, middle)
  mergeSort(arr, middle+1, r)
  // 优化： 如果中间值大于下一位，才需要判断排序合并，否则的话，说明已经排好了
  if(arr[middle] > arr[middle+1]){
    merge(arr, l, middle, r);
  }
  
  return arr;
}

console.log(mergeSort(arr));