import { Shape } from "./Shape";

export class Circle extends Shape {
  constructor(readonly cx: number, readonly cy: number, readonly r: number) {
    super();
  }
}
