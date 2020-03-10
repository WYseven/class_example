  /**
 * @param {number[]} nums
 * @return {number}
 */
// var maxSubArray = function(nums) {
//     if(nums.length === 1) return nums[0];
//     let total = NaN;
//     let maxTotal = -Infinity, m = -Infinity;
//     for(let i = 0; i< nums.length - 1; i++) {
//       total = nums[i];
//       maxTotal = nums[i];
//       for(let j = i+1; j < nums.length; j++){
//         total += nums[j];
//         m = Math.max(m, maxTotal, total,  nums[j])
//       }
//     }

//     return m;
// };


var maxSubArray = function(nums) {
  if(nums.length === 0) return 0;
  let max = nums[0], sum = 0;
  // 如果是负数，则比大小，如果是正负数，则相加再比较
  for(let i = 0; i < nums.length; i++) {
    if(sum > 0){
      sum += nums[i]
    }else {
      sum = nums[i];
    }

    max = Math.max(max, sum);
  }
  return max;
};


console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]));
console.log(maxSubArray([1]));
console.log(maxSubArray([2,1]));
console.log(maxSubArray([-2,1]));
console.log(maxSubArray([-2,-3,-1]));
console.log(maxSubArray([-1, -2]));