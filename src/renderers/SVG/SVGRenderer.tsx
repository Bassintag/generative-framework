import { Renderer, RendererOptions } from "../Renderer";
import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { LineSVGRenderer } from "./LineSVGRenderer";
import { Line } from "../../shapes/Line";
import { Canvas } from "../../canvas/Canvas";
import { PointSVGRenderer } from "./PointSVGRenderer";
import { Point } from "../../shapes/Point";
import { Polygon } from "../../shapes/Polygon";
import { PolygonSVGRenderer } from "./PolygonSVGRenderer";
import { Circle } from "../../shapes/Circle";
import { CircleSVGRenderer } from "./CircleSVGRenderer";
import { Size } from "../../domain/Size";
import { Vect } from "../../domain/Vect";
import { Shape } from "../../shapes/Shape";

const renderers = {
  [Circle.name]: CircleSVGRenderer,
  [Line.name]: LineSVGRenderer,
  [Point.name]: PointSVGRenderer,
  [Polygon.name]: PolygonSVGRenderer,
};

export class SVGRenderer implements Renderer {
  constructor() {}

  async renderString(
    canvas: Canvas,
    options: RendererOptions
  ): Promise<string> {
    const { size } = options;

    let shapeSize: Size;
    const offset: Vect = {
      x: Math.max(0, (size.w - size.h) / 2),
      y: Math.max(0, (size.h - size.w) / 2),
    };
    if (size.h > size.w) {
      shapeSize = {
        w: size.w,
        h: size.w,
      };
    } else {
      shapeSize = {
        w: size.h,
        h: size.h,
      };
    }

    const shapes = canvas
      .getShapes()
      .reduce<Record<string, Shape[]>>((p, shape) => {
        if (p[shape.layer] == null) {
          p[shape.layer] = [];
        }
        p[shape.layer].push(shape);
        return p;
      }, {});

    const body = (
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width={`${size.w}mm`}
        height={`${size.h}mm`}
        viewBox={`0 0 ${size.w} ${size.h}`}
      >
        {Object.entries(shapes).map(([layer, shapes]) => {
          const layerProps = {
            "inkscape:label": layer,
            "inkscape:groupmode": "layer",
            id: `layer-${layer}`,
          };

          return (
            <g
              {...layerProps}
              transform={`translate(${offset.x}, ${offset.y})`}
            >
              {shapes.map((shape, i) => {
                const renderer = renderers[shape.constructor.name];
                if (renderer == null) {
                  throw new Error("Invalid renderer");
                }
                return (
                  <React.Fragment key={i}>
                    {renderer(shape as any, { size: shapeSize })}
                  </React.Fragment>
                );
              })}
            </g>
          );
        })}
      </svg>
    );

    return renderToStaticMarkup(body);
  }

  async render(
    canvas: Canvas,
    target: HTMLElement,
    options: RendererOptions
  ): Promise<void> {
    target.innerHTML = await this.renderString(canvas, options);
  }
}
