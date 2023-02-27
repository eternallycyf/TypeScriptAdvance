type IsEqual<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B
  ? 1
  : 2
  ? true
  : false;

type Obj = {
  a: number;
  b: string;
  [key: string]: any;
};

const obj = {
  a: 1,
  b: 'bbb',
  cc: 3,
  dd: 4,
  x: '2',
} satisfies Obj;
