---
title: 特殊类型
order: 0
toc: content
group:
  title: high
  order: 2
---

# 特殊类型

## IsAny

- any 类型与任何类型的交叉都是 any
- 1 & any 结果是 any

```ts
type IsAny<T> = 'type1' extends 'type2' & T ? true : false;
```

## IsEqual

```ts
type IsEqual<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B
  ? 1
  : 2
  ? true
  : false;
```

## IsUnion

```ts
type IsUnion<A, B = A> = A extends A ? ([B] extends [A] ? false : true) : never;
```

## isNever

- 如果条件类型左边是类型参数，并且传入的是 never，那么直接返回 never：

```ts
type IsNever<T> = [T] extends [never] ? true : false;
```

## isTuple

- 元组类型的 length 是数字字面量

```ts
type NotEqual<A, B> = (<T>() => T extends A ? 1 : 2) extends <
  T,
>() => T extends B ? 1 : 2
  ? false
  : true;
type IsTuple<T> = T extends [...params: infer Eles]
  ? NotEqual<Eles['length'], number>
  : false;
```

## UnionToIntersection

- 如果允许父类型赋值给子类型，就叫做逆变。
- 如果允许子类型赋值给父类型，就叫做协变。

```ts
type UnionToIntersection<U> = (
  U extends U ? (x: U) => unknown : never
) extends (x: infer R) => unknown
  ? R
  : never;

type UnionToIntersectionResult = UnionToIntersection<
  { guang: 1 } | { dong: 2 }
>;
```

## GetOptional

- 可选索引的值为 undefined 和值类型的联合类型

```ts
type GetOptional<Obj extends Record<string, any>> = {
  [Key in keyof Obj as {} extends Pick<Obj, Key> ? Key : never]: Obj[Key];
};
```
