---
title: 递归复用
order: 0
toc: content
group:
  title: high
  order: 5
---

## DeepPromiseValueType

```ts
type DeepPromiseValueType<T extends PromiseLike<any>> = T extends PromiseLike<
  infer Rest
>
  ? Rest extends PromiseLike<any>
    ? DeepPromiseValueType<Rest>
    : Rest
  : never;

type DeepPromiseResult = DeepPromiseValueType<
  Promise<Promise<Record<string, any>>>
>;
```

## 数组

```ts
type ReverseArr<Arr extends unknown[]> = Arr extends [
  infer First,
  ...infer Rest,
]
  ? [...ReverseArr<Rest>, First]
  : Arr;
type ReverseArrResult = ReverseArr<[1, 2, 3, 4, 5]>;

type Includes<Arr extends unknown[], FindItem> = Arr extends [
  infer First,
  ...infer Rest,
]
  ? IsEqual<First, FindItem> extends true
    ? true
    : Includes<Rest, FindItem>
  : false;

type IsEqual<A, B> = (A extends B ? true : false) &
  (B extends A ? true : false);
type IncludesResult = Includes<[1, 2, 3, 4, 5], 4>;
type IncludesResult2 = Includes<[1, 2, 3, 4, 5], 6>;

type RemoveItem<
  Arr extends unknown[],
  Item,
  Result extends unknown[] = [],
> = Arr extends [infer First, ...infer Rest]
  ? IsEqual<First, Item> extends true
    ? RemoveItem<Rest, Item, Result>
    : RemoveItem<Rest, Item, [...Result, First]>
  : Result;

type BuildArray<
  Length extends number,
  Ele = unknown,
  Arr extends unknown[] = [],
> = Arr['length'] extends Length ? Arr : BuildArray<Length, Ele, [...Arr, Ele]>;

type BuildArrResult = BuildArray<5>;
```

## 字符串

```ts
type ReplaceAll<
  Str extends string,
  From extends string,
  To extends string,
> = Str extends `${infer Left}${From}${infer Right}`
  ? `${Left}${To}${ReplaceAll<Right, From, To>}`
  : Str;

type StringToUnion<Str extends string> =
  Str extends `${infer First}${infer Rest}`
    ? First | StringToUnion<Rest>
    : never;

type StringToUnionResult = StringToUnion<'hello'>;

type ReverseStr<
  Str extends string,
  Result extends string = '',
> = Str extends `${infer First}${infer Rest}`
  ? ReverseStr<Rest, `${First}${Result}`>
  : Result;

type DeepReadonly<Obj extends Record<string, any>> = Obj extends any
  ? {
      readonly [Key in keyof Obj]: Obj[Key] extends object
        ? Obj[Key] extends Function
          ? Obj[Key]
          : DeepReadonly<Obj[Key]>
        : Obj[Key];
    }
  : never;

type obj = {
  a: {
    b: {
      c: {
        f: () => 'dong';
        d: {
          e: {
            guang: string;
          };
        };
      };
    };
  };
};

type DeepReadonlyResult = DeepReadonly<obj>;
```
