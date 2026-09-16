/**
 * Silk ribbon renderer, drawn with raw WebGL (no library). Framework-free.
 *
 * Each ribbon is a bundle of thin lines. The geometry is a static grid of
 * (line, position along the curve, side) triples uploaded once; the vertex
 * shader bends it along the ribbon's bezier, twists and ripples it, and
 * extrudes it into a thin anti-aliased strip. Per frame the CPU only updates
 * a few uniforms and issues one draw call per ribbon.
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

/** Samples per line. They're evaluated on the GPU, so this can be generous. */
const STEPS = 64;
const STILL_TIME = 14;
const FRAME_MS = 1000 / 60;

const VERTEX = `
precision highp float;
// x: line index, y: position along the curve (0–1), z: side of the strip (-1 or 1)
attribute vec3 aPos;
uniform vec2 uRes;
uniform vec2 uP0;
uniform vec2 uP1;
uniform vec2 uP2;
uniform vec2 uP3;
uniform float uWidth;
uniform float uTwist;
uniform float uSpeed;
uniform float uPhase;
uniform float uLines;
uniform float uTime;
uniform float uHalf;
varying float vT;
varying float vSide;

const float PI = 3.14159265;

vec2 linePoint(float u, float k) {
  float m = 1.0 - u;
  vec2 b = m * m * m * uP0 + 3.0 * m * m * u * uP1 + 3.0 * m * u * u * uP2 + u * u * u * uP3;
  vec2 d = 3.0 * m * m * (uP1 - uP0) + 6.0 * m * u * (uP2 - uP1) + 3.0 * u * u * (uP3 - uP2);
  vec2 n = vec2(-d.y, d.x) / max(length(d), 1e-4);
  float envelope = pow(max(sin(u * PI), 1e-6), 0.6);
  float twist = 0.1 + 0.9 * sin(u * PI * uTwist + uTime * uSpeed + uPhase);
  return b + n * envelope * (k * uWidth * twist + 5.0 * sin(u * 9.0 - uTime * 0.8 + k * 4.0));
}

void main() {
  float k = aPos.x / (uLines - 1.0) - 0.5;
  vec2 p = linePoint(aPos.y, k);
  // Extrude across the line's own direction so steep, fanned-out lines keep their width
  vec2 t = linePoint(aPos.y + 0.004, k) - linePoint(aPos.y - 0.004, k);
  vec2 pos = p + vec2(-t.y, t.x) / max(length(t), 1e-4) * aPos.z * uHalf;

  vec2 axis = uP3 - uP0;
  vT = dot(pos - uP0, axis) / dot(axis, axis);
  vSide = aPos.z;
  vec2 clip = pos / uRes * 2.0 - 1.0;
  gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
}
`;

const FRAGMENT = `
precision mediump float;
uniform vec3 uEdge;
uniform vec3 uMid;
uniform vec3 uTail;
uniform float uAlpha;
uniform float uLineWidth;
uniform float uHalfPx;
varying float vT;
varying float vSide;

void main() {
  float t = clamp(vT, 0.0, 1.0);
  // Transparent at both ends of the ribbon, like a canvas gradient with 0.28 / 0.82 stops
  float fade = min(t / 0.28, 1.0) * min((1.0 - t) / 0.18, 1.0);
  // Analytic anti-aliasing: coverage of a line uLineWidth device pixels wide
  float coverage = clamp(uLineWidth * 0.5 + 0.5 - abs(vSide) * uHalfPx, 0.0, 1.0);
  vec3 color = t < 0.55 ? mix(uEdge, uMid, max(t - 0.28, 0.0) / 0.27)
    : t < 0.82 ? mix(uMid, uTail, (t - 0.55) / 0.27)
    : mix(uTail, uEdge, (t - 0.82) / 0.18);
  float a = uAlpha * fade * coverage;
  gl_FragColor = vec4(color * a, a);
}
`;

const UNIFORMS = [
  "uRes", "uP0", "uP1", "uP2", "uP3", "uWidth", "uTwist", "uSpeed", "uPhase", "uLines", "uTime", "uHalf",
  "uEdge", "uMid", "uTail", "uAlpha", "uLineWidth", "uHalfPx",
] as const;

type Uniforms = Record<(typeof UNIFORMS)[number], WebGLUniformLocation | null>;

export type SilkRenderer = NonNullable<ReturnType<typeof createSilkRenderer>>;

export function createSilkRenderer(canvas: HTMLCanvasElement, ribbons: Ribbon[]) {
  const gl = canvas.getContext("webgl", {
    alpha: true,
    premultipliedAlpha: true,
    antialias: false,
    depth: false,
    stencil: false,
    // Stay on the integrated GPU on dual-GPU laptops
    powerPreference: "low-power",
  });
  if (!gl) return null;

  const maxLines = Math.max(...ribbons.map((r) => r.lines));
  let program: WebGLProgram | null = null;
  let buffers: WebGLBuffer[] = [];
  let u = {} as Uniforms;

  function compile(type: number, source: string) {
    const shader = gl!.createShader(type)!;
    gl!.shaderSource(shader, source);
    gl!.compileShader(shader);
    return shader;
  }

  /** Creates GPU resources. Runs again after a lost context is restored. */
  function setup() {
    const vs = compile(gl!.VERTEX_SHADER, VERTEX);
    const fs = compile(gl!.FRAGMENT_SHADER, FRAGMENT);
    const p = gl!.createProgram()!;
    gl!.attachShader(p, vs);
    gl!.attachShader(p, fs);
    gl!.linkProgram(p);
    gl!.deleteShader(vs);
    gl!.deleteShader(fs);
    if (!gl!.getProgramParameter(p, gl!.LINK_STATUS)) {
      gl!.deleteProgram(p);
      return false;
    }
    program = p;
    gl!.useProgram(p);
    u = Object.fromEntries(UNIFORMS.map((name) => [name, gl!.getUniformLocation(p, name)])) as Uniforms;

    // Every line is a strip of quads; lines are laid out in order, so a ribbon
    // with n lines draws the first n lines' worth of indices.
    const verts = new Float32Array(maxLines * (STEPS + 1) * 6);
    const indices = new Uint16Array(maxLines * STEPS * 6);
    let v = 0;
    let n = 0;
    for (let i = 0; i < maxLines; i++) {
      for (let s = 0; s <= STEPS; s++) {
        verts.set([i, s / STEPS, -1, i, s / STEPS, 1], v);
        v += 6;
        if (s < STEPS) {
          const a = (i * (STEPS + 1) + s) * 2;
          indices.set([a, a + 1, a + 2, a + 1, a + 3, a + 2], n);
          n += 6;
        }
      }
    }
    const vbo = gl!.createBuffer()!;
    gl!.bindBuffer(gl!.ARRAY_BUFFER, vbo);
    gl!.bufferData(gl!.ARRAY_BUFFER, verts, gl!.STATIC_DRAW);
    const ibo = gl!.createBuffer()!;
    gl!.bindBuffer(gl!.ELEMENT_ARRAY_BUFFER, ibo);
    gl!.bufferData(gl!.ELEMENT_ARRAY_BUFFER, indices, gl!.STATIC_DRAW);
    buffers = [vbo, ibo];

    const loc = gl!.getAttribLocation(p, "aPos");
    gl!.enableVertexAttribArray(loc);
    gl!.vertexAttribPointer(loc, 3, gl!.FLOAT, false, 0, 0);
    gl!.enable(gl!.BLEND);
    gl!.clearColor(0, 0, 0, 0);
    gl!.viewport(0, 0, gl!.drawingBufferWidth, gl!.drawingBufferHeight);
    return true;
  }

  if (!setup()) return null;

  let w = 0;
  let h = 0;
  let dpr = 1;
  let dark = false;
  let reduce = false;
  let running = false;
  let visible = true;
  let frame = 0;
  let lastFrame = 0;
  let lastTime = STILL_TIME;
  const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };

  function draw(time: number) {
    lastTime = time;
    if (!program || !w || !h || gl!.isContextLost()) return;
    mouse.x += (mouse.tx - mouse.x) * 0.05;
    mouse.y += (mouse.ty - mouse.y) * 0.05;

    gl!.clear(gl!.COLOR_BUFFER_BIT);
    // Additive "lighter" glow on dark backgrounds, normal source-over on light ones
    gl!.blendFunc(gl!.ONE, dark ? gl!.ONE : gl!.ONE_MINUS_SRC_ALPHA);

    const lineWidth = (dark ? 1 : 1.2) * dpr;
    const halfPx = lineWidth / 2 + 1;
    gl!.uniform2f(u.uRes, w, h);
    gl!.uniform1f(u.uTime, time);
    gl!.uniform1f(u.uLineWidth, lineWidth);
    gl!.uniform1f(u.uHalfPx, halfPx);
    gl!.uniform1f(u.uHalf, halfPx / dpr);
    gl!.uniform1f(u.uAlpha, (dark ? 0.3 : 0.24) * (w < 768 ? 0.55 : 1));
    gl!.uniform3f(u.uEdge, 1, 90 / 255, 31 / 255);
    if (dark) gl!.uniform3f(u.uMid, 1, 178 / 255, 130 / 255);
    else gl!.uniform3f(u.uMid, 1, 112 / 255, 46 / 255);
    gl!.uniform3f(u.uTail, 1, 80 / 255, 20 / 255);

    const S = Math.min(w, h);
    for (const r of ribbons) {
      const mx = (mouse.x - 0.5) * 40 * r.depth;
      const my = (mouse.y - 0.5) * 40 * r.depth;
      gl!.uniform2f(u.uP0, r.pts[0][0] * w + mx, r.pts[0][1] * h + my);
      gl!.uniform2f(u.uP1, r.pts[1][0] * w + mx, r.pts[1][1] * h + my);
      gl!.uniform2f(u.uP2, r.pts[2][0] * w + mx, r.pts[2][1] * h + my);
      gl!.uniform2f(u.uP3, r.pts[3][0] * w + mx, r.pts[3][1] * h + my);
      gl!.uniform1f(u.uWidth, r.width * S);
      gl!.uniform1f(u.uTwist, r.twist);
      gl!.uniform1f(u.uSpeed, r.speed);
      gl!.uniform1f(u.uPhase, r.phase);
      gl!.uniform1f(u.uLines, r.lines);
      gl!.drawElements(gl!.TRIANGLES, r.lines * STEPS * 6, gl!.UNSIGNED_SHORT, 0);
    }
  }

  function loop(now: number) {
    frame = requestAnimationFrame(loop);
    // Cap at 60fps so 120Hz screens don't double the work
    if (now - lastFrame < FRAME_MS - 2) return;
    lastFrame = now;
    draw(now / 1000);
  }

  function sync() {
    cancelAnimationFrame(frame);
    if (reduce) draw(STILL_TIME);
    else if (running && visible) frame = requestAnimationFrame(loop);
  }

  function onLost(e: Event) {
    e.preventDefault();
    cancelAnimationFrame(frame);
    program = null;
  }

  function onRestored() {
    if (setup()) sync();
  }

  canvas.addEventListener("webglcontextlost", onLost);
  canvas.addEventListener("webglcontextrestored", onRestored);

  return {
    resize(width: number, height: number, ratio: number) {
      w = width;
      h = height;
      dpr = ratio;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
      // Resizing clears the canvas; redraw now rather than flashing blank for a frame
      draw(lastTime);
    },
    setMouse(x: number, y: number) {
      mouse.tx = x;
      mouse.ty = y;
    },
    setDark(value: boolean) {
      dark = value;
      draw(lastTime);
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
      cancelAnimationFrame(frame);
      canvas.removeEventListener("webglcontextlost", onLost);
      canvas.removeEventListener("webglcontextrestored", onRestored);
      if (program) gl.deleteProgram(program);
      buffers.forEach((b) => gl.deleteBuffer(b));
      // Free the context now instead of waiting for GC (browsers cap live contexts)
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    },
  };
}
