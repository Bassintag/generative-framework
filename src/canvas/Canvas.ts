import { Shape, ShapeRenderOptions } from "../shapes/Shape";
import { Type } from "../domain/Type";
import { Line } from "../shapes/Line";
import { Point } from "../shapes/Point";
import { Polygon } from "../shapes/Polygon";
import { Circle } from "../shapes/Circle";

export class Canvas {
  private shapes: Shape[];
  private _layer: string;
  private readonly renderOptions: ShapeRenderOptions;

  constructor() {
    this.renderOptions = {
      fill: "none",
      stroke: "black",
      strokeWidth: 0.5,
    };
    this.shapes = [];
    this._layer = "base";
  }

  private shapeFunction = <T extends Shape, ArgT extends unknown[]>(
    ctor: Type<T, ArgT>
  ) => {
    return (...args: ArgT) => {
      const instance = new ctor(...args);
      instance.renderOptions = this.renderOptions;
      instance.layer = this._layer;
      this.shapes.push(instance);
      return instance;
    };
  };

  readonly circle = this.shapeFunction(Circle);

  readonly line = this.shapeFunction(Line);

  readonly point = this.shapeFunction(Point);

  readonly polygon = this.shapeFunction(Polygon);

  noFill() {
    this.renderOptions.fill = "none";
  }

  fill(color: string) {
    this.renderOptions.fill = color;
  }

  stroke(color: string) {
    this.renderOptions.stroke = color;
  }

  strokeWidth(width: number) {
    this.renderOptions.strokeWidth = width;
  }

  clear() {
    this.shapes = [];
  }

  getShapes() {
    return this.shapes;
  }

  layer(name: string) {
    this._layer = name;
  }
}
