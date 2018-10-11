
// 1. 传入的参数必须完全要匹配到,多了或少了都不行
function init(n:{a:String,b:any}):Number{
  console.log(n)
  return 1
}
// 不能传入，多了一项c
init({b:1,a:'10'})

// 2. 使用接口定义

interface n {
  readonly a:Number,
  b?: String
}
// 定义n这个接口，来描述需要的参数类型，? 代表是可选的
function hello(n:n):{name?:String} {
  // n.a = 10;  // error a是只读的
  return {}
}

hello({a:1});

// 用接口定义变量类型
let m:n = {a:1,b:"2"};

// m.a = 90; // error a是只读的


// 3. 接口定义函数的类型

interface funcTyle {
  (a: String,
    b?: Number): Boolean;
}
let func: funcTyle;
func = function (c: String, k: Number){
  console.log(c,k)
  return true;
}

func("1",2);

<funcTyle>function testTyple(){
  return false;
}


// 4. 接口在类中使用

interface users {
  a: String,
  b: String
}

class Person<T> {
  constructor(a:String){
    console.log(a)
  }
}

class child extends Person<users> {

}

new Person('1');