export const repeat = (f: (p: number, i: number) => void, times: number) => {
  for (let i = 0; i < times; i += 1) {
    f(i / times, i);
  }
};
