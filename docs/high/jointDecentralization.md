---
title: 联合分散
order: 0
toc: content
group:
  title: high
  order: 3
---

## 分布式条件类型

- 当类型参数为联合类型，并且在条件类型左边直接引用该类型参数的时候，TypeScript 会把每一个元素单独传入来做类型运算，
- 最后再合并成联合类型，
- 这种语法叫做分布式条件类型

## example

```ts
type Camelcase<Str extends string> =
  Str extends `${infer Left}_${infer Right}${infer Rest}`
    ? `${Left}${Uppercase<Right>}${Camelcase<Rest>}`
    : Str;

type CamelcaseArr<Arr extends unknown[]> = Arr extends [
  infer Item,
  ...infer RestArr,
]
  ? [Camelcase<Item & string>, ...CamelcaseArr<RestArr>]
  : [];

type CamelcaseUnion<Item extends string> =
  Item extends `${infer Left}_${infer Right}${infer Rest}`
    ? `${Left}${Uppercase<Right>}${CamelcaseUnion<Rest>}`
    : Item;
```
