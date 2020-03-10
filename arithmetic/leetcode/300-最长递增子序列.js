
let arr = [10,9,2,5,3,7,101,18];  // [2,3,7,101]
let a = [arr[0]];
for(let i = 1; i < arr.length; i++){
  if(arr[i] > a[a.length-1]){
    a.push(arr[i])
  }else {
    a[a.length-1] = arr[i];
  }
}

console.log(a);


