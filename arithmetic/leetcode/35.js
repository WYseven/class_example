/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */

// var searchInsert = function(nums, target) {
//     if(nums.length === 0) return 0;
//     let p = -1;
//     let i = 0;
//     for(; i < nums.length; i++) {
//       if(nums[i] >= target) break;  // 判断条件为 小于等于 target， 因为数组是有序的。target小于前面的数的话，是不可能向后面去找的。
//     }
//     return i;
// };

// 二分法

var searchInsert = function(nums, target) {
  if(nums.length === 0) return 0;
  let l = 0, r = nums.length - 1;
  while(l <= r){
    let m = Math.floor((l+r)/2);
    if(nums[m] === target) {
      return m;
    }
    if(target < nums[m]) {
      r = m-1;
    }else {
      l = m + 1;
    }
  }
  return l;
};

console.log(searchInsert([1,3,5,6], 5));
console.log(searchInsert([1,3,5,6], 2));
console.log(searchInsert([1,3,5,6], 7));
console.log(searchInsert([1,3,5,6], 0));