---
title: 回顾
order: 0
toc: content
---

## 回顾一些遗漏的部分

### 1. declare

```ts
// 全局类型标注
// 声明不存在的sdk 避免报错
declare module '*.css';
declare module '*.less';
declare module '*.png';
interface jQuery {}
declare module 'jquery' {
    export = jQuery;
}
interface Igradient {
  parse?: string;
  stringify?: string
}
declare module 'gradient-parser' {
  export const gradient: Igradient
}
# 需要在tsconfig.json 引入文件
  "include": [
    "typings.d.ts"
  ],
# react有些包的module需要在这里定义
react-app-env.d.ts => declare
```

### 2.namespace

```ts
# 相当于自执行函数
namespace xxx {
  export function log(){}
}
xxx.log('xx')
# 复制一个类
namespace importing {
  export class Foo {}
}
import Bar = importing.Foo;
let bar: Bar; // ok
```

### 3. 映射修饰符

| 映射修饰符 | 描述      | 其他 |
| ---------- | --------- | ---- |
| -          | -?:       |      |
| +          | 默认      |      |
| readonly   | -readonly |      |
| ?          | -?:       |      |
| as         | as Type   |      |
|            |           |      |

```ts
# 删除属性中的只读属性
type CreateMutable<Type> = {
  -readonly [Property in keyof Type]: Type[Property];
};
type LockedAccount = {
  readonly id: string;
  readonly name: string;
};
type UnlockedAccount = CreateMutable<LockedAccount>;
// type UnlockedAccount = {
//    id: string;
//    name: string;
// }

# 删除属性中的可选属性
type Concrete<Type> = {
  [Property in keyof Type]-?: Type[Property];
};

# as
type MappedTypeWithNewProperties<Type> = {
    [Properties in keyof Type as NewKeyType]: Type[Properties]
}
```

### 4.操作符

#### Uppercase

```ts
# Uppercase 把每个字符转为大写形式：
type Greeting = "Hello, world"
type ShoutyGreeting = Uppercase<Greeting>
// type ShoutyGreeting = "HELLO, WORLD"

type ASCIICacheKey<Str extends string> = `ID-${Uppercase<Str>}`
type MainID = ASCIICacheKey<"my_app">
// type MainID = "ID-MY_APP"
```

#### Lowercase

```js
type Greeting = "Hello, world"
type QuietGreeting = Lowercase<Greeting>
// type QuietGreeting = "hello, world"

type ASCIICacheKey<Str extends string> = `id-${Lowercase<Str>}`
type MainID = ASCIICacheKey<"MY_APP">
// type MainID = "id-my_app"
```

#### Capitalize

```js
# Capitalize 字符串的第一个字符转为大写形式
type LowercaseGreeting = "hello, world";
type Greeting = Capitalize<LowercaseGreeting>;
// type Greeting = "Hello, world"
```

#### Uncapitalize

```js
# Uncapitalize
type UppercaseGreeting = "HELLO WORLD";
type UncomfortableGreeting = Uncapitalize<UppercaseGreeting>;
// type UncomfortableGreeting = "hELLO WORLD"
```

### 5.模板字面量

```js
type World = "world";
type Greeting = `hello ${World}`;
// type Greeting = "hello world"
# 如果是联合类型 就会有多种可能
```

```ts
// 通过模板字面量创建一个新属性名
type Getters<Type> = {
  [Property in keyof Type as `get${Capitalize<
    string & Property
  >}`]: () => Type[Property];
};
interface Person {
  name: string;
  age: number;
  location: string;
}
type LazyPerson = Getters<Person>;
// type LazyPerson = {
//    getName: () => string;
//    getAge: () => number;
//    getLocation: () => string;
// }

// 通过条件类型返回一个never 过滤某些属性
// Remove the 'kind' property
type RemoveKindField<Type> = {
  [Property in keyof Type as Exclude<Property, 'kind'>]: Type[Property];
};
interface Circle {
  kind: 'circle';
  radius: number;
}
type KindlessCircle = RemoveKindField<Circle>;

// type KindlessCircle = {
//    radius: number;
// }
```

### 6.类型断言

```ts
// 手动指定某一个值的类型
1.值 as 类型
(someValue as string)  React-jsx必须用这个
2.<类型>值
(<string>someValue)

# 双重断言
 const element = (event as any) as HTMLElement; // ok
 as any as JSX.Element;
```

### 7.函数

```ts
type Fn = (...arg: number[]) => void
let IdFn: { <Type>(arg: Type): Type } = IdFn;
# 函数的重载
...
# 有属性的函数
type DescribableFunction = {
  description: string;
  (someArg: number): boolean;
};
function doSomething(fn: DescribableFunction) {
  console.log(fn.description + " returned " + fn(6));
}
# new实例化
type SomeConstructor = {
  new (str: string): {
    num: number;
  };
};
function fn(ctor: SomeConstructor) {
  return new ctor('1').num;
}
```

### 8.枚举

- [常量枚举和直接枚举的区别](https://www.typescriptlang.org/docs/handbook/enums.html#const-enums): 会生成额外的代码
- 相同名称的枚举自动合并

```ts
// 默认从0开始递增 直到枚举进行反向映射
enum Days {
  Sun = 3,
  Mon,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat
}
let xxx = Days.Sun
# 常量枚举
const enum xxx { }
# 获取枚举的类型
enum Methods {
  'GET',
  'POST',
}
keyof typeof Methods;  // "GET" | "POST"
```

### 9.typeof

- string | number | boolean | bigint | symbol | undefined | object |function
- 没有 null
- 遵守 falsy 值约定
- 通常结合 keyof 使用
- 可以获取实例的类型 => `InstanceType<typeof 实例>`

### 10.keyof

- 只能返回 number string symbol 类型 需要自己收窄类型

```ts
# 获取一个接口的所有key
interface Foo {
  name: string;
  age: number
}
type T = keyof Foo // -> "name" | "age"
# 当参数传入对象 和 对象的某个键时 有关系
function prop<T extends object, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}
# 生成字符串的联合类型
type xxx = keyof 接口
type xxx = keyof typeof 变量(enum)
```

- 索引访问类型

```ts
# 生成value
type Person = { age: number; name: string; alive: boolean };

type Age = Person['age'];
// type Age = number

type I1 = Person['age' | 'name'];
// type I1 = string | number

type I2 = Person[keyof Person];
// type I2 = string | number | boolean

type AliveOrName = 'alive' | 'name';
type I3 = Person[AliveOrName];
// type I3 = string | boolean

# 数组索引 => number
 const MyArray = [
  { name: "Alice", age: 15 },
  { name: "Bob", age: 23 },
  { name: "Eve", age: 38 },
];
type Person = typeof MyArray[number];
// type Person = {
//    name: string;
//    age: number;
// }

type Age = typeof MyArray[number]["age"];
// type Age = number

// Or
type Age2 = Person["age"];
// type Age2 = number
```

### 11.infer

- 可以理解为设置一个未知的变量 (一元一次方程)
- 可以有多个 infer
- 也可以出现在左侧
  - `type unpack<T> = string extends T ? string : null`;

```ts
// 条件语句 推断传入的类型 如果是 promise里面是stirng 就返回string 否则返回T
type unpack<T> = T extends Promise<string> ? string : T;
type unpack<T> = T extends Promise<R> ? R : T;
```

```ts
// infer 设置推断Promise中的类型
// 相当于将promise中的类型 变成一个变量 它是R
// 如果 传入的 T 是 Promise 就直接返回Promise中的类型 即R
// 否则为传入的类型
type unpack<T> = T extends Promise<infer R> ? R : T;
type a = unpack<Promise<string>>; // string
type b = unpack<() => void>; // () => void
type c = unpack<string>; // string
```

```ts
// 可继承
type FirstIfString<T> = T extends [infer S extends string, ...unknown[]]
  ? S
  : never;
```

### 12 new

```ts
type NEWFN = {
  new (str: string): {
    description: string;
  };
};
function fn(newFn: NEWFN) {
  new newFn('1').description;
}
```

### 13.元组

```ts
type Either2dOr3d = [number, number, number?];
// readonly
readonly[(string, number)];
```

## [Type 和 interface 的区别](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces)

- interface 可以同名会自动合并
- type 可使用模板字面量 索引修饰符等

## tsconfig.json

```json
{
   "compilerOptions": {
       // 开启js提示
       "allowJs": true,
       // 指定压缩代码生成的目录 随便一个不存在的路径就行
       "outDir": "./random",
       "declaration": true, //自动生成.d.ts文件类型校验
        "module": "esnext", // 保留import.then
          // 只允许使用@types的包
         "types" : [ "jquery"],
        "noImplicitAny":true // 默认any不提示
        "--noImplicitThis":true // 自动键入this
        "jsx": "react" // preserve表示自定义转换

   }
}
```
