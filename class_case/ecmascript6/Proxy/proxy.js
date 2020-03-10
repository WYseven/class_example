
let testObj = {
  a: 1,
  c: {
    d: 123
  }
}

// Object.defineProperty(testObj, 'b', {
//   get(){
//     console.log('this', this);
//     return 3;
//   }
// })

const abc = {
  a: 1
}

const proxyAbc = new Proxy(abc, {
  get(target, key){
    console.log('取值proxyAbc');
    return target[key];
  }
})

console.log('proxyAbc',proxyAbc);

const proxyAbc2 = new Proxy(proxyAbc, {
  get(target, key){
    console.log('取值proxyAbc2', target);
    return target[key];
  }
})

console.log(proxyAbc2.a);

function reactive(target){
  let proxyObj = new Proxy(target, {
    get(target, key, receiver){
      console.log('---------取值-------')
      console.log(target, key, receiver);
      const reflctValue = Reflect.get(target, key, receiver);
      return typeof reflctValue === 'object' ? reactive(reflctValue) : reflctValue;
    },
    set(target, key, value, receiver){
      console.log('-----------设置了值------------');
      console.log(target, key, value, receiver);
      const re = Reflect.set(target, key, value, receiver);
    }
  });

  return proxyObj;
}

const proxyObj = reactive(testObj);

console.log('testObj', testObj);
console.log('proxyObj', proxyObj);


console.log(proxyObj.c.d);

proxyObj.c.d = 90;

console.log(proxyObj.c.d);


