import { Canvas } from "../canvas/Canvas";
import { Size } from "../domain/Size";

export interface RendererOptions {
  size: Size;
}

export interface Renderer {
  renderString(canvas: Canvas, options: RendererOptions): Promise<string>;

  render(
    canvas: Canvas,
    target: HTMLElement,
    options: RendererOptions
  ): Promise<void>;
}
