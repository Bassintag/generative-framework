import * as React from "react";
import { SVGShapeRenderer } from "./SVGShapeRenderer";
import { Line } from "../../shapes/Line";

export const LineSVGRenderer: SVGShapeRenderer<Line> = (line, { size }) => {
  const p0 = `${line.x1 * size.w},${line.y1 * size.h}`;
  const p1 = `${line.x2 * size.w},${line.y2 * size.h}`;

  return <path d={`M${p0} L${p1}`} {...line.renderOptions} />;
};
