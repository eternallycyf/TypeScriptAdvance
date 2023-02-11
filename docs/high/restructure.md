---
title: 重新构造
order: 0
toc: content
group:
  title: high
  order: 6
---

## 数组

```ts
type tuple = [1, 2, 3];
type Push<Arr extends unknown[], Ele> = [...Arr, Ele];
type Unshift<Arr extends unknown[], Ele> = [Ele, ...Arr];

type Zip<One extends unknown[], Other extends unknown[]> = One extends [
  infer OneFirst,
  ...infer OneRest,
]
  ? Other extends [infer OtherFirst, ...infer OtherRest]
    ? [[OneFirst, OtherFirst], ...Zip<OneRest, OtherRest>]
    : []
  : [];

type Zip2Result = Zip<
  [1, 2, 3, 4, 5],
  ['guang', 'dong', 'is', 'best', 'friend']
>;
```

## 字符串

```ts
type CapitalizeStr<Str extends string> =
  Str extends `${infer Prefix}${infer Rest}`
    ? `${Uppercase<Prefix>}${Rest}`
    : Str;

type CapitalizeResult = CapitalizeStr<'guang'>;

type CamelCase<Str extends string> =
  Str extends `${infer Left}_${infer Right}${infer Rest}`
    ? `${Left}${Uppercase<Right>}${CamelCase<Rest>}`
    : Str;

type CamelCaseResult = CamelCase<'dong_dong_dong'>;

type DropSubStr<
  Str extends string,
  SubStr extends string,
> = Str extends `${infer Prefix}${SubStr}${infer Suffix}`
  ? DropSubStr<`${Prefix}${Suffix}`, SubStr>
  : Str;
type DropResult = DropSubStr<'dong~~~', '~'>;
```

## 函数

```ts
type AppendArgument<Func extends Function, Arg> = Func extends (
  ...args: infer Args
) => infer ReturnType
  ? (...args: [...Args, Arg]) => ReturnType
  : never;

type AppendArgumentResult = AppendArgument<(name: string) => boolean, number>;
```

## 索引类型重构

```ts
type Mapping<Obj extends object> = {
  [Key in keyof Obj]: Obj[Key];
};
type Test = Mapping<{ a: 2; b: 2 }>;
// 重映射 索引: string|number|symbol
// xxx & string 只保留相同的部分
type UppercaseKey<Obj extends Record<string, any>> = {
  [Key in keyof Obj as Uppercase<Key & string>]: Obj[Key];
};
type Test = UppercaseKey<{ a: 2; b: 2 }>;
```

```ts
type ToReadonly<T> = {
  readonly [Key in keyof T]: T[Key];
};

type ToPartial<T> = {
  [Key in keyof T]?: T[Key];
};

type ToMutable<T> = {
  -readonly [Key in keyof T]: T[Key];
};

type ToRequired<T> = {
  [Key in keyof T]-?: T[Key];
};
```

## 过滤某些 key

```ts
type FilterByValueType<Obj extends Record<string, any>, ValueType> = {
  [Key in keyof Obj as Obj[Key] extends ValueType ? Key : never]: Obj[Key];
};

interface Person {
  name: string;
  age: number;
  hobby: string[];
}

type FilterResult = FilterByValueType<Person, string | number>;
```
