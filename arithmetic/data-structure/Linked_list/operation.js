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
      console.log(fast);
      slow = slow.next;
    }
    console.log('fast', fast);
    console.log('slow', slow);
    return slow;
  }
}
let list = new operation();

for(let i = 0; i < 6; i++){
  list.append(i+123);
}

console.log('append',JSON.stringify(list));
//list.reverse();
//console.log('reverse',JSON.stringify(list));

console.log(list.findMiddleNode());