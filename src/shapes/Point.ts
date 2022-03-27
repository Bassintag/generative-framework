import { Shape } from "./Shape";

export class Point extends Shape {
  constructor(readonly x: number, readonly y: number) {
    super();
  }
}
