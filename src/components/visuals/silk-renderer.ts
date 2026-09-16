/**
 * Silk ribbon renderer. Framework-free so it can run inside a Web Worker
 * (on an OffscreenCanvas) or, as a fallback, on the main thread.
 */

export type Pt = [number, number];

export type Ribbon = {
  /** Cubic bezier control points in 0–1 canvas space */
  pts: [Pt, Pt, Pt, Pt];
  /** Spread of the ribbon as a fraction of the shorter canvas side */
  width: number;
  /** Half-turns of twist along the ribbon */
  twist: number;
  speed: number;
  phase: number;
  lines: number;
  /** Pointer parallax strength */
  depth: number;
};

export type SilkPreset = "hero" | "cta";

export const PRESETS: Record<SilkPreset, Ribbon[]> = {
  hero: [
    { pts: [[0.4, -0.14], [0.56, 0.58], [0.8, -0.02], [1.1, 0.52]], width: 0.26, twist: 2.4, speed: 0.22, phase: 0, lines: 40, depth: 1 },
    { pts: [[0.62, -0.12], [0.6, 0.46], [1.04, 0.28], [0.9, 1.14]], width: 0.16, twist: 1.7, speed: 0.17, phase: 1.8, lines: 32, depth: 0.6 },
    { pts: [[1.14, 0.1], [0.72, 0.3], [0.7, 0.88], [1.12, 0.98]], width: 0.11, twist: 3.1, speed: 0.28, phase: 3.2, lines: 24, depth: 1.4 },
  ],
  cta: [
    { pts: [[0.42, 1.2], [0.62, 0.1], [0.84, 1.0], [1.12, -0.15]], width: 0.5, twist: 2, speed: 0.2, phase: 0.5, lines: 34, depth: 1 },
    { pts: [[0.7, 1.2], [0.78, 0.45], [0.96, 0.5], [1.1, 0.1]], width: 0.28, twist: 1.4, speed: 0.25, phase: 2, lines: 24, depth: 0.7 },
  ],
};

/** Curve samples per ribbon. Points are joined with quadratic curves, so this stays smooth. */
const STEPS = 48;
const STILL_TIME = 14;

type Ctx = CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;

export type SilkRenderer = ReturnType<typeof createSilkRenderer>;

export function createSilkRenderer(canvas: HTMLCanvasElement | OffscreenCanvas, ribbons: Ribbon[]) {
  const ctx = canvas.getContext("2d", { alpha: true }) as Ctx | null;
  if (!ctx) return null;

  const raf: (cb: (t: number) => void) => number =
    typeof requestAnimationFrame === "function"
      ? (cb) => requestAnimationFrame(cb)
      : (cb) => setTimeout(() => cb(performance.now()), 16) as unknown as number;
  const caf: (id: number) => void =
    typeof cancelAnimationFrame === "function" ? (id) => cancelAnimationFrame(id) : (id) => clearTimeout(id);

  // Per-step buffers, reused every frame (no allocations while animating)
  const bx = new Float32Array(STEPS + 1);
  const by = new Float32Array(STEPS + 1);
  const nx = new Float32Array(STEPS + 1);
  const ny = new Float32Array(STEPS + 1);
  const env = new Float32Array(STEPS + 1);
  const tw = new Float32Array(STEPS + 1);
  const sinA = new Float32Array(STEPS + 1);
  const cosA = new Float32Array(STEPS + 1);

  // Per-line constants: sin/cos of the line's phase offset, so the ripple
  // sin(a + b) becomes a cheap product instead of a trig call per point.
  const lineK = ribbons.map((r) => Float32Array.from({ length: r.lines }, (_, i) => i / (r.lines - 1) - 0.5));
  const lineSin = lineK.map((ks) => ks.map((k) => Math.sin(k * 4)));
  const lineCos = lineK.map((ks) => ks.map((k) => Math.cos(k * 4)));
  const envPow = new Float32Array(STEPS + 1);
  for (let s = 0; s <= STEPS; s++) envPow[s] = Math.pow(Math.sin((s / STEPS) * Math.PI), 0.6);

  let w = 0;
  let h = 0;
  let dark = false;
  let reduce = false;
  let running = false;
  let visible = true;
  let frame = 0;
  let lastFrame = 0;
  let frameInterval = 1000 / 60;
  let slowStreak = 0;
  let lastTime = STILL_TIME;
  const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };

  function draw(time: number) {
    lastTime = time;
    ctx!.clearRect(0, 0, w, h);
    if (!w || !h) return;
    ctx!.globalCompositeOperation = dark ? "lighter" : "source-over";
    ctx!.lineWidth = dark ? 1 : 1.2;

    mouse.x += (mouse.tx - mouse.x) * 0.05;
    mouse.y += (mouse.ty - mouse.y) * 0.05;

    const S = Math.min(w, h);
    const alpha = (dark ? 0.3 : 0.24) * (w < 768 ? 0.55 : 1);

    for (let s = 0; s <= STEPS; s++) {
      const a = (s / STEPS) * 9 - time * 0.8;
      sinA[s] = Math.sin(a);
      cosA[s] = Math.cos(a);
    }

    for (let ri = 0; ri < ribbons.length; ri++) {
      const r = ribbons[ri];
      const mx = (mouse.x - 0.5) * 40 * r.depth;
      const my = (mouse.y - 0.5) * 40 * r.depth;
      const x0 = r.pts[0][0] * w + mx, y0 = r.pts[0][1] * h + my;
      const x1 = r.pts[1][0] * w + mx, y1 = r.pts[1][1] * h + my;
      const x2 = r.pts[2][0] * w + mx, y2 = r.pts[2][1] * h + my;
      const x3 = r.pts[3][0] * w + mx, y3 = r.pts[3][1] * h + my;
      const W = r.width * S;

      for (let s = 0; s <= STEPS; s++) {
        const u = s / STEPS;
        const m = 1 - u;
        const b0 = m * m * m, b1 = 3 * m * m * u, b2 = 3 * m * u * u, b3 = u * u * u;
        bx[s] = b0 * x0 + b1 * x1 + b2 * x2 + b3 * x3;
        by[s] = b0 * y0 + b1 * y1 + b2 * y2 + b3 * y3;
        const dx = 3 * m * m * (x1 - x0) + 6 * m * u * (x2 - x1) + 3 * u * u * (x3 - x2);
        const dy = 3 * m * m * (y1 - y0) + 6 * m * u * (y2 - y1) + 3 * u * u * (y3 - y2);
        const len = Math.hypot(dx, dy) || 1;
        nx[s] = -dy / len;
        ny[s] = dx / len;
        env[s] = envPow[s];
        tw[s] = 0.1 + 0.9 * Math.sin(u * Math.PI * r.twist + time * r.speed + r.phase);
      }

      const g = ctx!.createLinearGradient(x0, y0, x3, y3);
      g.addColorStop(0, "rgba(255,90,31,0)");
      g.addColorStop(0.28, `rgba(255,90,31,${alpha})`);
      g.addColorStop(0.55, dark ? `rgba(255,178,130,${alpha})` : `rgba(255,112,46,${alpha})`);
      g.addColorStop(0.82, `rgba(255,80,20,${alpha})`);
      g.addColorStop(1, "rgba(255,90,31,0)");
      ctx!.strokeStyle = g;

      const ks = lineK[ri], ls = lineSin[ri], lc = lineCos[ri];
      for (let i = 0; i < r.lines; i++) {
        const kW = ks[i] * W;
        const sB = ls[i], cB = lc[i];
        ctx!.beginPath();
        let px = 0, py = 0;
        for (let s = 0; s <= STEPS; s++) {
          const off = env[s] * (kW * tw[s] + 5 * (sinA[s] * cB + cosA[s] * sB));
          const x = bx[s] + nx[s] * off;
          const y = by[s] + ny[s] * off;
          if (s === 0) ctx!.moveTo(x, y);
          else ctx!.quadraticCurveTo(px, py, (px + x) / 2, (py + y) / 2);
          px = x;
          py = y;
        }
        ctx!.lineTo(px, py);
        ctx!.stroke();
      }
    }
  }

  function loop(now: number) {
    frame = raf(loop);
    if (now - lastFrame < frameInterval - 2) return;
    lastFrame = now;
    const t0 = performance.now();
    draw(now / 1000);
    // Adaptive quality: on slower devices drop to 30fps instead of stuttering.
    if (performance.now() - t0 > 10) {
      if (++slowStreak > 20) frameInterval = 1000 / 30;
    } else if (slowStreak > 0) {
      slowStreak--;
    }
  }

  function sync() {
    caf(frame);
    if (reduce) draw(STILL_TIME);
    else if (running && visible) frame = raf(loop);
  }

  return {
    resize(width: number, height: number, dpr: number) {
      w = width;
      h = height;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduce || !visible) draw(lastTime);
    },
    setMouse(x: number, y: number) {
      mouse.tx = x;
      mouse.ty = y;
    },
    setDark(value: boolean) {
      dark = value;
      if (reduce || !visible) draw(lastTime);
    },
    setVisible(value: boolean) {
      visible = value;
      sync();
    },
    start(reducedMotion: boolean) {
      reduce = reducedMotion;
      running = true;
      sync();
    },
    destroy() {
      running = false;
      caf(frame);
    },
  };
}
