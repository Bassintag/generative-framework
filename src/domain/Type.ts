export type Type<T, ArgT extends unknown[]> = {
  new (...args: ArgT): T;
};
