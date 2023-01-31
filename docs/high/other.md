---
title: 其他
order: 0
toc: content
group:
  title: high
  order: 1
---

## 交叉：&

- 交叉类型（Intersection）类似 js 中的与运算符 &，但是作用于类型，代表对类型做合并
- 注意，同一类型可以合并，不同的类型没法合并，会被舍弃
- 交叉类型会把同一类型做合并，不同类型舍弃

```ts
type ObjType = { a: number } & { c: boolean };
// never
type res = `aaaa` & 2222;
```
