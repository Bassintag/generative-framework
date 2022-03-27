import * as React from "react";
import { SVGShapeRenderer } from "./SVGShapeRenderer";
import { Polygon } from "../../shapes/Polygon";

export const PolygonSVGRenderer: SVGShapeRenderer<Polygon> = (
  polygon,
  { size }
) => {
  const vertices = polygon.getVertices();

  let d = vertices
    .map(({ x, y }, i) => {
      const instruction = i === 0 ? "M" : "L";
      return `${instruction}${x * size.w},${y * size.h}`;
    })
    .join(" ");

  if (polygon.close) {
    d += " Z";
  }

  return <path d={d} {...polygon.renderOptions} />;
};
