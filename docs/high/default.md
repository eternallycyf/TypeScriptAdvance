---
title: 内置的高级类型
order: 0
toc: content
group:
  title: high
  order: 0
---

# 内置的高级类型

## Parameters

```ts
type Parameters<T extends (...args: any) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;
```

## ReturnType

```ts
type ReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer R
  ? R
  : any;
```

## ConstructorParameters

```ts
type ConstructorParameters<T extends abstract new (...args: any) => any> =
  T extends abstract new (...args: infer P) => any ? P : never;
```

## InstanceType

```ts
type InstanceType<T extends abstract new (...args: any) => any> =
  T extends abstract new (...args: any) => infer R ? R : any;
```

## ThisParameterType

```ts
type ThisParameterType<T> = T extends (this: infer U, ...args: any[]) => any
  ? U
  : unknown;
```

## OmitThisParameter

```ts
type OmitThisParameter<T> = unknown extends ThisParameterType<T>
  ? T
  : T extends (...args: infer A) => infer R
  ? (...args: A) => R
  : T;
```

## Partial

```ts
type Partial<T> = {
  [P in keyof T]?: T[P];
};
```

## Required

```ts
type Required<T> = {
  [P in keyof T]-?: T[P];
};
```

## Readonly

```ts
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
```

## Pick

```ts
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
```

## Record

```ts
type Record<K extends keyof any, T> = {
  [P in K]: T;
};
```

## Exclude

```ts
type Exclude<T, U> = T extends U ? never : T;
```

## Extract

```ts
type Extract<T, U> = T extends U ? T : never;
```

## Omit

```ts
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```

## Awaited

```ts
type Awaited<T> = T extends null | undefined
  ? T
  : T extends object & { then(onfulfilled: infer F): any }
  ? F extends (value: infer V, ...args: any) => any
    ? Awaited<V>
    : never
  : T;
```

## NonNullable

```ts
type NonNullable<T> = T extends null | undefined ? never : T;
```

## Uppercase、Lowercase、Capitalize、Uncapitalize

```ts
type Uppercase<S extends string> = intrinsic;

type Lowercase<S extends string> = intrinsic;

type Capitalize<S extends string> = intrinsic;

type Uncapitalize<S extends string> = intrinsic;
```
