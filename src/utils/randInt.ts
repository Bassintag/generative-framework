import { randRange } from "./randRange";

export const randInt = (from: number, to: number) => {
  return Math.floor(randRange(from, to));
};
