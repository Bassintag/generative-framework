import { SVGRenderer } from "./renderers/SVG/SVGRenderer";
import { Canvas } from "./canvas/Canvas";
import { Renderer, RendererOptions } from "./renderers/Renderer";

export interface SketchOptions extends Partial<RendererOptions> {
  renderer?: Renderer;
  target?: string;
}

export const sketch = async (
  draw: (c: Canvas) => void | Promise<void>,
  {
    size = {
      w: 210,
      h: 297,
    },
    renderer = new SVGRenderer(),
    target = "root",
  }: SketchOptions = {}
) => {
  const canvas = new Canvas();

  await draw(canvas);

  const options: RendererOptions = {
    size,
  };

  if (typeof document !== "undefined") {
    // Browser
    const element = document.getElementById(target);
    await renderer.render(canvas, element, options);
  } else {
    // Node
    const render = await renderer.renderString(canvas, options);
    console.log(render);
  }
};
