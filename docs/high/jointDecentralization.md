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

## isUnion

- 非联合类型 [A] extends [B] 是相同的
- 当作用于联合类型比较 使用 [] 就会分发

```ts
[C] extends [T] ? false : true;
// 如果是string
[T] = [string][C] = [string];
// 如果是联合类型例如 string | number
[T] = [string] | [number]
[C] = [string | number]
```

- 如果 extends 左边的类型是联合类型
- 会把每个元素单独传入做计算，而右边不会
- 需要泛型

```ts
type IsUnion<A, B = A> = A extends A ? ([B] extends [A] ? false : true) : never;
```

## 字符串

- 数组转联合
- type union = ['aaa','bbb'][number]

```ts
type BEM<
  Block extends string,
  Element extends string[],
  Modifiers extends string[],
> = `${Block}__${Element[number]}--${Modifiers[number]}`;

type bemResult = BEM<'guang', ['aaa', 'bbb'], ['warning', 'success']>;
```

## Combination

```ts
type Combination<A extends string, B extends string> =
  | A
  | B
  | `${A}${B}`
  | `${B}${A}`;

type AllCombinations<A extends string, B extends string = A> = A extends A
  ? // 由于分布式计算(A extends A) A这里会单独计算 B 不会
    // Combination<'a',AllCombinations<Exclude<'a'|'b'|'c','a'>>>
    // ...
    Combination<A, AllCombinations<Exclude<B, A>>>
  : never;

type AllCombinationsResult = AllCombinations<'A' | 'B' | 'C'>;
```
