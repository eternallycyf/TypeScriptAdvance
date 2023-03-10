---
title: 启程
order: -1
toc: content
---

## [1.学习 TypeScript 的基础知识](https://ts.xcatliu.com/)

- 推荐直接阅读这篇博客。了解和学习 TypeScript 的基础知识，
- 这篇博客已经讲得非常详细了，而且还有很多实例，非常适合初学者学习。

## 交叉: &

- 同一类型可以合并，不同的类型没法合并，会被舍弃
- 求并集 没有并集就是 never

```ts
type Obj = { a: number } & { c: boolean };
type res = { a: number; c: boolean } extends Obj ? true : false;
```

## 重映射

- 索引类型有: string、number symbol
- keyof T = string | number | symbol
- 交叉类型 和 string 交叉后 为 string 将同一类型合并 不同类型舍弃
  - k & sting = string

```ts
type Obj = { a: 1; b: 2 };
type MapType<T> = {
  [k in keyof T as `${k & string}重映射key名`]: [T[k], T[k], T[k]];
};
type text = MapType<Obj>;
```

## length

```ts
// 只有元组的长度是具体的数字
'abc'['length']  是number类型
[1,2,3]['length'] 是具体的某个值
```

## ts 类型显示问题

- ts 的类型只有被用到的时候才会做计算

```ts
// 触发计算

Obj extends any ? xxx : never;
Obj extends never ? xxx :never;
```

## infer

```ts
type TestLast<Arr extends string[]> = Arr extends [...infer Rest, infer Last]
  ? `最后一个是：${Last & string}`
  : never;

type TestLast2<Arr extends string[]> = Arr extends [...infer Rest, infer Last]
  ? Last extends string
    ? `最后一个是：${Last}`
    : never
  : never;

type TestLast3<Arr extends string[]> = Arr extends [
  ...infer Rest,
  infer Last extends string,
]
  ? `最后一个是：${Last}`
  : never;
```

## 协变 逆变

- 子类型可以赋值给父类型，叫做协变（covariant）
- 父类型可以赋值给子类型，叫做逆变（contravariant）。

```ts
interface Person {
  name: string;
  age: number;
}

interface Guang {
  name: string;
  age: number;
  hobbies: string[];
}

let person: Person = {
  name: '',
  age: 20,
};
let guang: Guang = {
  name: 'guang',
  age: 20,
  hobbies: ['play game', 'writing'],
};

person = guang;
```

## satisfies

```ts
type Obj = {
  a: number;
  b: string;
  [key: string]: any;
};

const obj = {
  a: 1,
  b: 'bbb',
  cc: 3,
  dd: 4,
  x: '2',
} satisfies Obj;
```
