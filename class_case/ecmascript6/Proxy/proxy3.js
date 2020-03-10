// 简单实现一下

function hasOwn(obj, key){
  return Object.prototype.hasOwnProperty.call(obj, key);
}

// 检测对象的增删改查

const rawToReactive = new WeakMap();  // 原数据 -> 响应数据 的映射
const reactiveToraw = new WeakMap();  // 响应数据 -> 原数据 的映射

// 用一个weakMap，来存映射

const targetWeakMap = new WeakMap();  // {target, map<key, set[]>}

let effectStack = []; // 存放正在执行的effect函数栈

function reactive(target){ // target = [] || {}
  // 先存一下相互之间的映射
  let proxyTarget = new Proxy(target, {
    get(target, key, receiver){
      //console.log('获取值', key, receiver);
      const value = Reflect.get(target, key, receiver);
      track(target, 'get', key);
      return (value && typeof value === 'object') ? reactive(value) : value;
    },
    set(target, key, value, receiver){
      //console.log('设置值', key, value, receiver);
      let hasKey = hasOwn(target, key);
      let oldValue = target[key]; // 之前的值
      let result = Reflect.set(target, key, value, receiver);
      //console.log('value oldValue', value, oldValue, key);
      if(!hasKey) {
       // console.log('trigger add');
        trigger(target, 'add', key);
      }else if(oldValue !== value) {  // 改变了
        //console.log('trigger set');
        trigger(target, 'set', key);
      }
      return result;
    }
  })

  return proxyTarget;
}

// 收集依赖
// 那个数据的那个key值？
function track(target, type, key){
  if(effectStack.length === 0) return;  // 不需要收集
  let keyMap = targetWeakMap.get(target);
  // 当前正在执行的effect
  const effect = effectStack[effectStack.length - 1];
  if(!keyMap) {
    targetWeakMap.set(target, (keyMap = new Map()));
  }
  let deps = keyMap.get(key);
  if(!deps) {
    keyMap.set(key, (deps = new Set()));
  }

  if(!deps.has(effect)){
    deps.add(effect);
    // 拿到所有的依赖函数
    effect.deps.push(deps);
  }
}

function trigger(target, type, key){
  const keyMap = targetWeakMap.get(target);
  if(!keyMap) return;
  const deps = keyMap.get(key);
  if(deps) {
    const depsColne = new Set();
    deps.forEach(effect => {
      depsColne.add(effect);
    });
    depsColne.forEach(effect => {
      effect();
    });
    
  }
}

function cleanup(effect) {
  const { deps } = effect;
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].delete(effect)
    }
    deps.length = 0; 
  }
}

function run(effect, callback){
  // 防止循环调用
  if(!effectStack.includes(effect)){
    // 先把当前这个effect从所有的依赖中删除，重新收集
    cleanup(effect);
    try {
      effectStack.push(effect);
      return callback();
    }finally{
      effectStack.pop();
    }
  }
  
}
function effect(callback){
  const effect = function createEffect() {
    return run(effect, callback);
  }
  effect.deps = [];  // 存放那些所有关于某个key值的依赖
  // 一上来先执行一次
  effect();
  return effect
}

// 使用
let o = {a: 1, bl: true};
let reactive1 = reactive(o);

// effect(() => {
//   console.log(reactive1.a);
// })

// reactive1.a = 100;

let n;

const e = effect(() => {
  n = reactive1.bl ? reactive1.a : 'other';
  console.log('n', n);
})

reactive1.bl = false;
console.log(123, n);

reactive1.a = 900000;   // 不能通过分支来获取属性来触发

console.log(123, n);

console.log(targetWeakMap);
