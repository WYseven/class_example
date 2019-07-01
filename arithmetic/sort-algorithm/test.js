let {createNumbers, executeTime, createNearlyOrderNumbers} = require('./tools');

let selectSort = require('./select-sort');
let {insertSort, insertSortRange} = require('./insert-sort');
let mergeSort = require('./merge-sort');

let numberArr1 = createNumbers(0,100000,50000);
let numberArr2 = numberArr1.concat();
let numberArr3 = numberArr1.concat();

// 生成一个近乎有序的数组
let order1 = createNearlyOrderNumbers(50000, 50000);
let order2 = order1.concat();
let order3 = order1.concat();

console.log('selectSort')
executeTime(function(){
  selectSort(numberArr1)
})

console.log('insertSort')
executeTime(function(){
  insertSort(numberArr2)
})

console.log('mergeSort')
executeTime(function(){
  mergeSort(numberArr3)
})

console.log('--------------近乎有序的数组---------------')

console.log('selectSort2')
executeTime(function(){
  selectSort(order1)
})

console.log('insertSort2')
executeTime(function(){
  insertSort(order2)
})
console.log('mergeSort2')
executeTime(function(){
  mergeSort(order3)
});