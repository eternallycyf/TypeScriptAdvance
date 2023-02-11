---
title: 模式匹配
order: 0
toc: content
group:
  title: high
  order: 7
---

## MyAwaited

```ts
type MyAwaited<T extends PromiseLike<any>> = T extends PromiseLike<infer R>
  ? R extends PromiseLike<any>
    ? MyAwaited<R>
    : R
  : never;

type ExampleType<T = string> = Promise<T>;

type Result = MyAwaited<ExampleType<ExampleType>>; // string
```

## GetMiddle

```ts
type GetMiddle<T extends unknown[]> = T extends [
  infer First,
  ...infer middle,
  infer Last,
]
  ? middle
  : never;

type Test = GetMiddle<[1, 2, 3, 4]>; // 2 3
```

## 数组方法

```ts
type Pop<T extends unknown[]> = T extends []
  ? []
  : T extends [...infer Rest, unknown]
  ? Rest
  : never;

type TestPop = Pop<[1, 2]>; // 1,2

type Shift<T extends unknown[]> = T extends []
  ? []
  : T extends [infer First, ...infer Rest]
  ? Rest
  : never;

type TestShift = Shift<[1, 2, 3]>; // 2,3
```

## 字符串方法

```ts
type StartsWith<
  Str extends string,
  Prefix extends string,
> = Str extends `${Prefix}${string}` ? Prefix : false;

type TestStartsWith = StartsWith<'guang and dong', 'guang'>;

type ReplaceStr<
  Str extends string,
  Form extends string,
  to extends string,
> = Str extends `${infer Prefix}${Form}${infer suffix}`
  ? `${Prefix}${to}${suffix}`
  : Str;
type ReplaceResult = ReplaceStr<
  "Guangguang's best friend is ?",
  '?',
  'Dongdong'
>;
type ReplaceResult2 = ReplaceStr<'abc', '?', 'Dongdong'>;
```

## TrimStrRight

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

## 函数

## GetParameters

```ts
// GetParameters
type GetParameters<Func extends Function> = Func extends (
  ...args: infer Args
) => unknown
  ? Args
  : never;

type ParametersResult = GetParameters<(name: string, age: number) => string>;
type ParametersResult2 = GetParameters<() => string>;
```

## GetReturnType

```ts
// GetReturnType
type GetReturnType<Func extends Function> = Func extends (
  ...args: any[]
) => infer ReturnType
  ? ReturnType
  : never;

type ReturnTypeResullt = GetReturnType<(name: string) => 'dong'>;
```

## GetThisParameterType

- "strictBindCallApply": true,

```ts
class Dong {
  name: string;

  constructor() {
    this.name = 'dong';
  }

  song() {
    return 'song';
  }
  hello(this: Dong) {
    return "hello, I'm " + this.name;
  }
}

const dong = new Dong();
dong.hello();

dong.hello.call({ xxx: 1 });

type GetThisParameterType<T> = T extends (
  this: infer ThisType,
  ...args: any[]
) => any
  ? ThisType
  : unknown;

type GetThisParameterTypeRes = GetThisParameterType<typeof dong.song>;
```

## GetInstanceType

```ts
type Person = new (name: string) => { name: string };

type GetInstanceType<ConstructorType extends new (...arg: any) => any> =
  ConstructorType extends new (...args: infer Args) => infer InstanceType
    ? InstanceType
    : any;

type test = GetInstanceType<Person>;
```

## GetConstructorParameters

```ts
// GetConstructorParameters
type GetConstructorParameters<
  ConstructorType extends new (...args: any) => any,
> = ConstructorType extends new (...args: infer ParametersType) => any
  ? ParametersType
  : never;

type GetConstructorParametersRes = GetConstructorParameters<PersonConstructor>;
```

## GetRefProps

```ts
// 索引类型：
// GetRefProps:
type GetRefProps<Props> = 'ref' extends keyof Props
  ? Props extends { ref?: infer Value | undefined }
    ? Value
    : never
  : never;

type GetRefPropsRes = GetRefProps<{ ref?: 1; name: 'dong' }>;

type GetRefPropsRes2 = GetRefProps<{ ref?: undefined; name: 'dong' }>;
```
