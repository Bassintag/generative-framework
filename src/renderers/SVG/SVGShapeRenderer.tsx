import * as React from "react";
import { Size } from "../../domain/Size";

export interface ShapeRendererOptions {
  size: Size;
}

export type SVGShapeRenderer<T> = (
  element: T,
  options: ShapeRendererOptions
) => React.ReactElement;
