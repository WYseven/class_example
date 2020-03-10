var util = require("util")

let LinkendList = require('./create.js');
let h = new LinkendList();

for(let i = 0; i < 4; i++){
  h.append(i+123);
}

//console.log('append',JSON.stringify(h));

class operation extends LinkendList {
  // 反转单链表
  reverse(){
    let currentNode = this.head.next;
    let pre = null;
    while(currentNode){
      // 先保存一下next的next
      let next = currentNode.next;
      currentNode.next = pre;
      pre = currentNode;
      currentNode = next;
    }
    this.head.next = pre;
  }

  // 求链表的中间结点：使用快慢针
  findMiddleNode(){
    let fast = this.head.next;
    let slow = this.head.next;
    //while(fast.next && fast.next.next){  // 偶数的中间前一个
    while(fast && fast.next){  // 偶数的中间后一个
      fast = fast.next.next;
      slow = slow.next;
    }
    return slow;
  }
  // 链表中环的检测：使用快慢针，如果指针有重叠，说明有环；如果不重叠，说明没有环。
  checkCircle(){
    let fast = this.head.next;
    let slow = this.head;
    while(fast && fast.next){
      fast = fast.next.next;
      slow = slow.next;
      if(fast === slow) return true; // 说明有环
    }
    return false // 没环
  }
  // 删除倒数第k个节点
  // 先遍历，算出总共有多少个节点，根据k，找到正序中的位置(n - k + 1)
  removeByIndexFromEnd1(k){
    if(k <= 0) return;
    let len = this.nodesLength();
    if(k > len - 1) {  // 如果超过总长度,不能删除,头不能删除
      return; 
    }
    let removeIndex = len - k + 1; 
    let currentNode = this.head;
    let prev = null; // 上一个
    let pos = 1;  // 位置不是从0开始的，而是从1开始
    while(currentNode && pos < removeIndex){
      prev = currentNode;
      currentNode = currentNode.next;
      pos++;
    }
    console.log(prev);
    console.log(currentNode);
    prev.next = currentNode.next;
  }
  // 删除倒数第k个节点
  // 慢指针，每次走一步；快指针，每次从慢指针处，走k步。当快指针为null时，则 慢指针+1 位置就是要找的k的位置。
  removeByIndexFromEnd2(k){
    if(k <= 0) return;
    let len = this.nodesLength();
    if(k > len - 1) {  // 如果超过总长度,不能删除,头不能删除
      return; 
    }
    let fast = this.head;
    let slow = this.head;
    let step = k;
    while(fast && fast.next){
      step = k;
      while(step--) {
        fast = fast.next;
      }
      // 如果没有到头，继续向前
      if(fast.next){
        slow = fast = slow.next;
      }
    }
    
    slow.next = slow.next.next;

  }
}
let list = new operation();

for(let i = 1; i <= 6; i++){
  list.append(i+123);
}

console.log('append',JSON.stringify(list, null, 2));
//list.reverse();
//console.log('reverse',JSON.stringify(list));

//console.log(list.findMiddleNode());

// 测试是否有环
// let m = list.findMiddleNode();
// console.log('中间node', m);
// let last = list.findLastNode(); // 找到最后一个，人为的加环
// last.next = m;
// console.log(util.inspect(list,{depth:null})); //depth:null 展开全部层级
// console.log(list.checkCircle());

// console.log(list.nodesLength());
// console.log(list.removeByIndexFromEnd1(1));

// console.log('append',JSON.stringify(list, null, 1));

// console.log(list.nodesLength());

console.log(list.nodesLength());
console.log(list.removeByIndexFromEnd2(6));

console.log('append',JSON.stringify(list, null, 1));

//console.log(list.nodesLength());

