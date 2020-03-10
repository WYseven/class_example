
let testObj = ['a', 'b'];

const proxyObj = new Proxy(testObj, {
  get(target, key){
    console.log('target, key: ', target, key);
    const res = Reflect.get(target, key); 
    console.log('get length', target.length, key , res);
    return res;
  },
  set(target, key, value, revicer){
    console.log('set', target, key, value, revicer);
    console.log('set length1', target.length, key, value);
    const r = Reflect.set(target, key, value, revicer);
    console.log('r: ', r);
    console.log('set length', target.length, key, value);
    //target[key] = value;
    return r;
  }
});


//proxyObj.push('c');
console.log(proxyObj[1]);
//proxyObj.length = 10;
proxyObj[1] = 10;  // length并不会触发set
console.log(proxyObj);

// testObj[2] = 10;
// console.log('testObj: ', testObj);
