export const rotate = (
  x: number,
  y: number,
  angle: number,
  cx = 0.5,
  cy = 0.5
) => {
  const s = Math.sin(angle);
  const c = Math.cos(angle);

  x -= cx;
  y -= cy;

  const xn = x * c - y * s;
  const yn = x * s + y * c;

  return [xn + cx, yn + cy] as const;
};
