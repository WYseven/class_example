let obj = {
  name: 'leo'
}

let proxyObj = new Proxy(obj, {
  get(target, prop, receiver){
    console.log('get',target, prop, receiver);
    return target[prop];
  },
  set(target, prop, value, receiver){
    console.log('set',target, prop, value, receiver);
    target[prop] = value;
    return false;
  }
});

// console.log(proxyObj)
// console.log(proxyObj.name)
// console.log(obj.name)
// console.log('--------------');
// proxyObj.name = 'lala';
// proxyObj.age = 31;
// proxyObj.age = 32;
// proxyObj.age = 33;
// console.log(obj);

let arr = [{name: {age: 40}},1,2,3,4];

let proxyArr = new Proxy(arr, {
  get(target, prop, receiver){
    console.log('get',target, prop, receiver);
    let g = Reflect.get(target, prop, receiver);
    console.log('get返回值', g)
    return g;
  },
  set(target, prop, value, receiver){
    console.log('set',target, prop, value, receiver);
    let f = Reflect.set(target, prop, value, receiver);
    console.log('Reflect返回值',f);
    return f;
  }
});

console.log(proxyArr)
console.log(proxyArr[0])

console.log('--------------');
proxyArr.push(10)

console.log('--------------');

console.log(arr[0].name.age);
