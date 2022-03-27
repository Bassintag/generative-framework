import * as React from "react";
import { SVGShapeRenderer } from "./SVGShapeRenderer";
import { Point } from "../../shapes/Point";

export const PointSVGRenderer: SVGShapeRenderer<Point> = (point, { size }) => {
  return (
    <circle
      cx={point.x * size.w}
      cy={point.y * size.h}
      r={point.renderOptions.strokeWidth}
      fill={point.renderOptions.stroke}
    />
  );
};
