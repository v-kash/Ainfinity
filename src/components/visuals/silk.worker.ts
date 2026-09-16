import { createSilkRenderer, PRESETS, type SilkPreset, type SilkRenderer } from "./silk-renderer";

type Message =
  | { type: "init"; canvas: OffscreenCanvas; preset: SilkPreset; w: number; h: number; dpr: number; dark: boolean; reduce: boolean }
  | { type: "resize"; w: number; h: number; dpr: number }
  | { type: "mouse"; x: number; y: number }
  | { type: "theme"; dark: boolean }
  | { type: "visible"; visible: boolean };

let renderer: SilkRenderer = null;

self.onmessage = (event: MessageEvent<Message>) => {
  const msg = event.data;
  if (msg.type === "init") {
    renderer = createSilkRenderer(msg.canvas, PRESETS[msg.preset]);
    if (!renderer) {
      self.postMessage({ type: "unsupported" });
      return;
    }
    renderer.setDark(msg.dark);
    renderer.resize(msg.w, msg.h, msg.dpr);
    renderer.start(msg.reduce);
    return;
  }
  if (!renderer) return;
  if (msg.type === "resize") renderer.resize(msg.w, msg.h, msg.dpr);
  else if (msg.type === "mouse") renderer.setMouse(msg.x, msg.y);
  else if (msg.type === "theme") renderer.setDark(msg.dark);
  else if (msg.type === "visible") renderer.setVisible(msg.visible);
};
