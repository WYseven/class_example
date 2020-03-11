
/*var moveZeroes = function(nums) {
    let nonZeroArr = [];  // 用来存放非0元素
    for(let i = 0; i < nums.length; i++) {
      if(nums[i]){
        nonZeroArr.push(nums[i])
      }
    }
    // 把新数组中的每一项对位的赋值给原数组
    for(let j = 0; j < nonZeroArr.length; j++){
      nums[j] = nonZeroArr[j]
    }

    // 把nums中之后的位置都补上0
    for(let k = nonZeroArr.length; k < nums.length; k++){
      nums[k] = 0;
    }
    
    return nums;
};*/

/*var moveZeroes = function(nums) {
  let repalceIndex = 0;  // 记录要被替换的位置
  for(let i = 0; i < nums.length; i++){
    if(nums[i]) {  // 当不为0
      nums[repalceIndex++] = nums[i];  // 把遍历到不为0的数字，替换在下标repalceIndex的位置,替换的位置向后推一步;
    }
  }
  // 从k的位置开始之后的都应该为0
  while(repalceIndex < nums.length){
    nums[repalceIndex++] = 0;
  }
  return nums;
};*/

// var moveZeroes = function(nums) {
//   let repalceIndex = 0;  // 记录要被交换的位置
//   let replaceElement; // 中间变量，用来存不为0的数字
//   for(let i = 0; i < nums.length; i++){
//     if(nums[i]) {  // 当不为0
//       if(i != repalceIndex) {  // 第i个和repalceIndex相同，说明要交换的是同一个元素，没必要进行交换操作
//         replaceElement = nums[i];
//         nums[i] = 0;
//         nums[repalceIndex] = replaceElement;
//       }
//       repalceIndex++
//     }
//   }
  
//   return nums;
// };
var moveZeroes = function(nums) {
  let k = 0;  // 含义[0，k) 之间为非 0 的元素
  let mreplace;
  for(let i = 0; i < nums.length; i++){
    if(nums[i]) { // 当第 i 这个位置的元素，不为 0 时
      if( i !== k) { 
        mreplace = nums[k];
        nums[k] = nums[i];
        nums[i] = mreplace;
      }
      k++;
    }
  }
  return nums;
};
let arr = [3,4,0,0,0,0,1,0,3,0,9,0,12,0,0,1];

console.log(moveZeroes(arr)); // [ 3, 4, 1, 3, 9, 12, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]