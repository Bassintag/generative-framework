export interface ShapeRenderOptions {
  fill: string;
  stroke: string;
  strokeWidth: number;
}

export class Shape {
  private _renderOptions: ShapeRenderOptions;

  get renderOptions() {
    return this._renderOptions;
  }

  set renderOptions(value) {
    this._renderOptions = {
      ...value,
    };
  }

  layer: string;
}
