---
title: tschallenge
order: 0
toc: content
---

# tschallenge

```ts
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
}

type ReadOnly<T> = {
  readOnly [P in keyof T]: T[p]
}

type TupleToObject<T extends readonly (number|string)[]> = {
  [P in T[number]]: p
}

type First<T extends any[]> = T extends [] ? never : T[0]
type Length<T extends { length:number }> = T['length'];


type Exclude<T, U> = T extends U ? never : T

type Awaited<T extends PromiseLike<any>> = T extends PromiseLike<infer R>
   ? R extends PromiseLike<any>
   : Awaited<R>
   : never
```
