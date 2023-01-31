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

### 映射类型 重映射

- 索引类型（对象、class 等）可以用 string、number 和 symbol 作为 key
- string | number | symbol

```ts
type MapType<T> = {
  [Key in keyof T as `${Key & string}${Key & string}${Key & string}`]: [
    T[Key],
    T[Key],
    T[Key],
  ];
};
type res = {
  aaa: [1, 1, 1];
  bbb: [2, 2, 2];
};
```

### 字符串匹配

```ts
type StartsWith<
  Str extends string,
  Prefix extends string,
> = Str extends `${Prefix}${string}` ? true : false;
type StartsWithResult = StartsWith<'guang and dong', 'guang'>;
```

### 字符串替换

```ts
type ReplaceStr<
  Str extends string,
  From extends string,
  To extends string,
> = Str extends `${infer Prefix}${From}${infer Suffix}`
  ? `${Prefix}${To}${Suffix}`
  : Str;
type ReplaceResult = ReplaceStr<
  "Guangguang's best friend is ?",
  '?',
  'Dongdong'
>;
type ReplaceResult2 = ReplaceStr<'abc', '?', 'Dongdong'>;
```

### trim

```ts
type TrimStrRight<Str extends string> = Str extends `${infer Rest}${
  | ' '
  | '\n'
  | '\t'}`
  ? TrimStrRight<Rest>
  : Str;

type TrimRightResult = TrimStrRight<'guang        '>;

type TrimStrLeft<Str extends string> = Str extends `${
  | ' '
  | '\n'
  | '\t'}${infer Rest}`
  ? TrimStrLeft<Rest>
  : Str;

type TrimLeftResult = TrimStrLeft<'      dong'>;
type TrimStr<Str extends string> = TrimStrRight<TrimStrLeft<Str>>;
type TrimResult = TrimStr<'      dong   '>;
```

### this

- 当 call/apply 调用的时候，就能检查出 this 指向的对象是否是对的
- strictBindCallApply

```ts
class Dong {
  name: string;

  constructor() {
    this.name = 'dong';
  }

  hello(this: Dong) {
    return "hello, I'm " + this.name;
  }
}
```

### instanceType

```ts
type GetConstructorParameters<
  ConstructorType extends new (...args: any) => any,
> = ConstructorType extends new (...args: infer ParametersType) => any
  ? ParametersType
  : never;
```
