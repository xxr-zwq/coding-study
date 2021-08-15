// 1.类型注解
let var1: string;
var1 = "zwq";
// var1 = 1; // 报错
console.log(var1);

// 类型推论
let var2 = true;
// var2 = 1

// 原始类型：string，number，boolean，undefined，null，symbol

let var3: string | undefined;

// 类型数组
let arr: string[];
arr = ["tom", "2"];

// 任意类型
let varAny: any;
varAny = "xxx";
varAny = 3;

// any用于数组
let arrAny: any[];
arrAny = [1, "2", false];
arrAny[1] = 52;

// 函数类型约束
function greet(person: string): string {
  return "hello," + person;
}

const msg = greet("anniu");

// viod类型(无返回值)
function warn(): void {
  console.log("报错啦");
}

// 对象object,不是原始类型的就是对象类型
// function fn1(o:object) {
//     console.log(o);
// }
// fn1({prop: 1});
// fn1(1)

// 正确的姿势
function fn2(o: { prop: number }) {
  o.prop;
}
fn2({ prop: 10 });
// fn2({prop: "10"});

// 类型别名 type,可以自定义类型
type Prop = { prop: number } & { foo: string };
function fn3(o: Prop) {
  console.log(o);
} // 等同于fn2

// type和接口interface的区别，基本完全相同
// interface prop2 {
//     prop: number
// }

// 类型断言
const someValue: any = "this is a string";
const strLen = (someValue as string).length;

// 联合类型
let union: string | number;
union = "1";
union = 1;

// 交叉类型
type First = { first: number };
type Second = { second: number };
// 扩展新的type
type FirstAndSecond = First & Second;
function fn4(): FirstAndSecond {
  return { first: 1, second: 2 };
}

// 函数
// 1.设置了就是必填参数
// 2.默认值
// 3.可选参数 ?
function greeting(person: string, msg = "afs", info?: string): string {
  return "";
}
greeting("tto");

// 函数重载: 场景主要是源码和框架，函数用参数个数、类型或者返回值类型区分同名参数
// 先声明，再实现
function watch(cb1: () => void): void;
function watch(cb1: () => void, cb2: (v1: any, v2: any) => void): void;
// 实现
function watch(cb1: () => void, cb2?: (v1: any, v2: any) => void) {
  if (cb1 && cb2) {
    console.log("执行重载2");
  } else {
    console.log("执行重载1");
  }
}

// watch()

// class
class Parent {
  private _foo = "foo"; // 私有属性，不能在类的外部访问
  protected bar = "bar"; // 保护属性，可以在子类中访问

  // 参数属性：构造函数参数加修饰符，能够定义为成员属性
  constructor(public tua = "tua") {}

  // 方法也有修饰符
  private someMethod() {
    console.log("do something");
  }

  // 存取器：属性方式访问，可添加额外逻辑，控制读写性
  // 可用于计算属性
  get foo() {
    return this._foo;
  }
  set foo(val) {
    this._foo = val;
  }
}

class Child extends Parent {
  say() {
    console.log(this.bar);
  }
}
const p = new Parent();
const c = new Child();
// p能访问foo，tua，c也可以

// 接口
interface Person {
  firstName: string;
  lastName: string;
}
// greeting函数通过Person接口约束参数解构
function greeting2(person: Person) {
  return "Hello," + person.firstName + " " + person.lastName;
}
greeting2({ firstName: "jane", lastName: "User" }); // 正确
// greeting2({firstName:"jane"}) // 错误

// 不用泛型
// interface Result {
//   ok: 0 | 1;
//   data: Feature[];
// }

// 使用泛型
interface Result<T> {
  ok: 0 | 1;
  data: T;
}

// 泛型方法
function getResult<T>(data: T): Result<T> {
  return { ok: 1, data };
}
// 用尖括号方式指定T为string
getResult<string>("hello");
// 用类型推断指定T为number
getResult(1);
