//17. 电话号码的字母组合

/**
 * @param {string} digits
 * @return {string[]}
 */

let obj = {
  "0":[],
 "2" : ["a","b","c"],
 "3" : ["d","e","f"],
 "4" : ["g","h","i"],
 "5" : ["j","k","l"],
 "6" : ["m","n","o"],
 "7" : ["p","q","r","s"],
 "8" : ["t","u","v"],
 "9" : ["w","x","y","z"]
}

function abc(arr1,n2){
 let arr2 = obj[n2];
 let len = arr1.length;
 let result = [];
 for(let i = 0; i < len; i++){
   for(let j = 0; j < arr2.length; j++){
    result.push(arr1[i]+arr2[j]);
   }
 }
 return result;
}

var letterCombinations = function(digits) {
    if(digits === '') return [];
    digits = digits.replace('0','');
    let result = obj[digits[0]];
    for(let i = 1; i < digits.length; i++){
      result = abc(result,digits[i]);
    }
    return result;
};

console.log(11111,letterCombinations(''))