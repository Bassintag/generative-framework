export const remap = (
  x: number,
  toMin: number,
  toMax: number,
  fromMin = 0,
  fromMax = 1
) => {
  return ((x - fromMin) / (fromMax - fromMin)) * (toMax - toMin) + toMin;
};
