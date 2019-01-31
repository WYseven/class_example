
// 模拟传统面向对象的实现

// 先定义一个人，之后会对这个人进行装饰
let Man = function(){

}

Man.prototype.show = function(){
  console.log('我要变成超人')
}

// 定义给超人附加的技能和衣服

let fly = function(man){
  this.man = man;
}

fly.prototype.show = function(){
  this.man.show();
  console.log('超人会飞')
}


let neiku = function(man){
  this.man = man;
}

neiku.prototype.show = function(){
  this.man.show();
  console.log('超人内裤外穿')
}

// 需要给人装饰技能和衣服  一层一层的对原有的类进行装饰
// 在不改变原有对象方法的基础上，增加新的功能
// 原有的功能还继续的运行，在包装之后新增了功能，形成了一条包装链
// 由于知道了上一个类需要实现的方法，属于是半透明的状态
let m = new Man();
let f = new fly(m);
let n = new neiku(f);

n.show();
