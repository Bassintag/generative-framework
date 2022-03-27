import { SVGShapeRenderer } from "./SVGShapeRenderer";
import { Circle } from "../../shapes/Circle";
import * as React from "react";

export const CircleSVGRenderer: SVGShapeRenderer<Circle> = (
  circle,
  { size }
) => {
  const cx = circle.cx * size.w;
  const cy = circle.cy * size.h;
  const r = circle.r * size.w;
  const r2 = 2 * r;

  const d = `M${cx},${cy} m${-r},0 a${r},${r} 0 1,0 ${r2},0 a${r},${r} 0 1,0 ${-r2},0`;

  return <path d={d} {...circle.renderOptions} />;
};
