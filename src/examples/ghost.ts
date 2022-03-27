import { sketch } from "../sketch";
import { noise } from "../utils/noise";
import { lerp } from "../utils";
import { repeat } from "../utils/repeat";
import { randInt } from "../utils/randInt";
import { randRange } from "../utils/randRange";

void sketch((c) => {
  const noiseScale = randRange(1, 3);

  c.layer("red");

  c.stroke("red");

  repeat((p) => {
    const x = lerp(0.475, 0.525, p);
    c.line(x, 0.1, 0.5, 0.9);
  }, randInt(3, 7));

  c.layer("black");

  c.stroke("black");

  const circles = randInt(20, 40);
  const r = 0.2;

  c.polygon().f((op) => {
    const p = (op * circles) % 1;
    const a = Math.PI * 2 * p;
    const s = Math.sin(a);
    const c = Math.cos(a);
    const ap = lerp(0, (Math.cos(a + Math.PI) + 1) / 2, op);
    const n = noise(noiseScale * p, 0);
    const sn = lerp(1, 1 + lerp(-0.5, 1, n), ap);
    return {
      x: 0.5 + c * r * sn,
      y: 0.35 + op * 0.3 + s * r * sn,
    };
  }, circles * 500);
});
