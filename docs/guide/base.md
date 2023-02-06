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
