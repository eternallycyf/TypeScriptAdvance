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

## ParseParam

```ts
type ParseParam<Param extends string> =
  Param extends `${infer Key}=${infer Value}`
    ? {
        [K in Key]: Value;
      }
    : {};

type MergeValues<One, Other> = One extends Other
  ? One
  : Other extends unknown[]
  ? [One, ...Other]
  : [One, Other];

type MergeParams<
  OneParam extends Record<string, any>,
  OtherParam extends Record<string, any>,
> = {
  [Key in keyof OneParam | keyof OtherParam]: Key extends keyof OneParam
    ? Key extends keyof OtherParam
      ? MergeValues<OneParam[Key], OtherParam[Key]>
      : OneParam[Key]
    : Key extends keyof OtherParam
    ? OtherParam[Key]
    : never;
};

type ParseQueryString<Str extends string> =
  Str extends `${infer Param}&${infer Rest}`
    ? MergeParams<ParseParam<Param>, ParseQueryString<Rest>>
    : ParseParam<Str>;

type ParseQueryStringResult = ParseQueryString<'a=1&a=2&b=2&c=3'>;
```
