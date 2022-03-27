import { noise as perlin } from "@chriscourses/perlin-noise";

export const noise = (x: number, y?: number): number => {
  return perlin(x, y);
};
