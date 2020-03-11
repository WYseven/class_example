function inserSort4(arr){
  let mEle; // 存放替换的元素
  // 从[0,i) 位置的元素，为排序好的元素
  for(let i = 1; i < arr.length; i++){
    for(let j = i; j > 0; j--){
      if(arr[j] < arr[j-1]){
        mEle = arr[j];
        arr[j] = arr[j-1];
        arr[j-1] = mEle;
      }else {
        break;
      }
    }
  }
  return arr;
}

function inserSort5(arr){
  let ele;
  for(let i = 1; i < arr.length; i++){
    ele = arr[i];  // 先复制一份为对比元素
    for(var j = i; j > 0 && ele < arr[j-1]; j--){
      arr[j] = arr[j-1];
    }
    // 循环结束后，j 位置就是 对边元素 要插入的位置
    arr[j] = ele;
  }
  return arr;
}

console.log('inserSort4', inserSort4([3,2,1,6,8,0]))
console.log('inserSort4', inserSort4([2,3,1,6,8,0]))
console.log('inserSort4', inserSort5([2,3,1,6,8,0]))