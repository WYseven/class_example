var removeElement = function(nums, val) {
    for(let i = 0; i < nums.length; i++) {
      if(nums[i] === val){
        nums.splice(i,1)
        i--;
      }
    }
    return nums.length;
};
let arr = [0,1,2,2,3,0,4,2];

/** 从后向前循环，就不需要--啦
 * var removeElement = function(nums, val) {
    for(var i = nums.length - 1; i >= 0; i--){
        if(nums[i] === val){
            nums.splice(i, 1);
        }
    }
};
*/
// 以下可以统计删除后的个数，但是nums变得不对了
// var removeElement = function(nums, val) {
//   let i = 0;
//   for (let j = 0; j < nums.length; j++) {
//     if (nums[j] !== val) {
//       nums[i] = nums[j];
//       i++;
//     }
//   }
//   console.log(nums)
//   return i;
// };

var removeElement = function(nums, val) {
  
  for(let i = 0; i < nums.length; i++){
    if(nums[i] === val) {
      
    }
  }
};


console.log(removeElement(arr,2)); // [ 1, 3, 9, 12, 0, 0, 0, 0 ]