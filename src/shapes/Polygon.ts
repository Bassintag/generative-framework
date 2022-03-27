import { Shape } from "./Shape";
import { Vect } from "../domain/Vect";
import { repeat } from "../utils/repeat";

export class Polygon extends Shape {
  private readonly vertices: Vect[];

  constructor(readonly close = false) {
    super();
    this.vertices = [];
  }

  vertex(point: readonly [number, number] | Vect): this;
  vertex(x: number, y: number): this;
  vertex(
    pointOrX: number | readonly [number, number] | Vect,
    y?: number
  ): this {
    if (typeof pointOrX === "number") {
      this.vertices.push({
        x: pointOrX,
        y,
      });
    } else if (Array.isArray(pointOrX)) {
      this.vertices.push({
        x: pointOrX[0],
        y: pointOrX[1],
      });
    } else {
      this.vertices.push(pointOrX as Vect);
    }
    return this;
  }

  circle(
    cx: number,
    cy: number,
    r: number,
    iterations: number,
    f?: (v: Vect, p: number, a: number, i: number) => Vect
  ) {
    repeat((p, i) => {
      const a = p * Math.PI * 2;
      const s = Math.sin(a);
      const c = Math.cos(a);
      let v: Vect = {
        x: s * r,
        y: c * r,
      };
      if (f) {
        v = f(v, p, a, i);
      }
      this.vertex({
        x: cx + v.x,
        y: cy + v.y,
      });
    }, iterations);
    return this;
  }

  f(f: (p: number, i: number) => Vect | [number, number], iterations: number) {
    repeat((...args) => {
      const v = f(...args);
      this.vertex(v);
    }, iterations);
    return this;
  }

  getVertices() {
    return this.vertices;
  }
}
