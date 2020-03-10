// 节点 生成器
class Node {
  constructor(node){
    this.node = node;
    this.next = null;
  }
}
/**
 * 实现增删改查
 */
class LinkendList {
  constructor(){
    // 头节点
    this.head = new Node('head');
    LinkendList.currentNode = this.head;
  }
  // 查找节点
  findNode(node){
    let currentNode = this.head;
    while(currentNode && currentNode.node !== node){
      currentNode = currentNode.next;
    }
    return currentNode;
  }
  // 根据下表查找
  findNodeByIndex(index){
    let currentNode = this.head.next;
    let pos = 0;
    while(currentNode && pos !== index){
      currentNode = currentNode.next;
      pos++
    }
    return currentNode;
  }
  // 找到最后一个节点
  findLastNode(){
    let currentNode = this.head;
    while(currentNode && currentNode.next){
      currentNode = currentNode.next;
    }
    return currentNode;
  }
  // 查找指定节点的上一个节点
  findPreNode(node){
    // 如果找不到当前节点，直接返回null
    let currentNode = this.head;
    while(currentNode && currentNode.next && currentNode.next.node !== node){
      currentNode = currentNode.next;
    }
    // 如果找到了最后一个，说明指定node这个不存在，则返回null
    if(currentNode.next === null) return null;
    return currentNode;
  }
  // 增加节点
  append(node){
    let newNode = new Node(node);
    LinkendList.currentNode.next = newNode;
    LinkendList.currentNode = newNode;

    // let currentNode = this.head;
    // while(currentNode.next){
    //   currentNode = currentNode.next;
    // }
    // currentNode.next = newNode;
  }
  // 删除节点
  remove(node){
    // 找到当前node节点
    let preNode = this.findPreNode(node);
    if(preNode === null){
      return false;
    }
    preNode.next = preNode.next.next;
    return true;
  }
  // 插入到某个节点的位置
  insert(newNode, node){
    let currentNode = this.findNode(node);
    if(currentNode === null){
      return false;
    }
    let createNewNode = new Node(newNode);
    createNewNode.next = currentNode.next;
    currentNode.next = createNewNode;
  }
  // 总共有多少个节点
  nodesLength(){
    let currentNode = this.head;
    let length = 0;
    while(currentNode){
      currentNode = currentNode.next;
      length++;
    }
    return length;
  }
}

let h = new LinkendList();
h.append('1')
h.append('2')
h.append('3')
// console.log('append',JSON.stringify(h));

// let item1 = h.findNode('4');
// console.log('找到当前节点',item1);

// let preItem = h.findPreNode('head');
// console.log('找到上',preItem);

// // h.remove('1');
// // h.remove('2');
// // h.remove('3');

// console.log('remove',JSON.stringify(h));

// h.insert('100', '1');

// console.log('insert',JSON.stringify(h));

// let item3 = h.findNodeByIndex(3);
// console.log('findNodeByIndex',item3);
// console.log('findLastNode',h.findLastNode());


module.exports = LinkendList;


