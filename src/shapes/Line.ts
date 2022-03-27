import { Shape } from "./Shape";

export class Line extends Shape {
  constructor(
    readonly x1: number,
    readonly y1: number,
    readonly x2: number,
    readonly y2: number
  ) {
    super();
  }
}
