"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { createSilkRenderer, PRESETS, type SilkPreset } from "./silk-renderer";

type Controller = {
  resize: (w: number, h: number, dpr: number) => void;
  mouse: (x: number, y: number) => void;
  theme: (dark: boolean) => void;
  visible: (v: boolean) => void;
  destroy: () => void;
};

/**
 * Generative silk ribbons.
 *
 * Performance: drawing runs in a Web Worker on an OffscreenCanvas, so the
 * main thread stays free for scrolling, hovers and clicks. Browsers without
 * OffscreenCanvas fall back to drawing on the main thread. Animation pauses
 * when off-screen or in a background tab, and a single still frame is drawn
 * for people who prefer reduced motion.
 */
export function SilkRibbons({ preset = "hero", className }: { preset?: SilkPreset; className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Thin glowing lines don't need full retina resolution; this cuts pixels by ~45% on 2x screens.
    const dpr = () => Math.min(window.devicePixelRatio || 1, 1.5);
    const isDark = () => root.classList.contains("dark");
    const rect = host.getBoundingClientRect();

    // A fresh canvas per mount: a canvas can only be transferred to a worker once.
    const makeCanvas = () => {
      const c = document.createElement("canvas");
      c.className = "block h-full w-full";
      c.setAttribute("aria-hidden", "true");
      host.appendChild(c);
      return c;
    };

    const mainThread = (): Controller => {
      const canvas = makeCanvas();
      const r = createSilkRenderer(canvas, PRESETS[preset]);
      if (!r) return { resize() {}, mouse() {}, theme() {}, visible() {}, destroy: () => canvas.remove() };
      r.setDark(isDark());
      r.resize(rect.width, rect.height, dpr());
      r.start(reduce);
      return {
        resize: r.resize,
        mouse: r.setMouse,
        theme: r.setDark,
        visible: r.setVisible,
        destroy: () => {
          r.destroy();
          canvas.remove();
        },
      };
    };

    let ctrl: Controller;
    const probe = document.createElement("canvas");
    if (typeof Worker !== "undefined" && "transferControlToOffscreen" in probe) {
      let worker: Worker | null = null;
      try {
        worker = new Worker(new URL("./silk.worker.ts", import.meta.url), { type: "module" });
      } catch {
        worker = null;
      }
      if (worker) {
        const w = worker;
        const el = makeCanvas();
        const offscreen = el.transferControlToOffscreen();
        w.postMessage(
          { type: "init", canvas: offscreen, preset, w: rect.width, h: rect.height, dpr: dpr(), dark: isDark(), reduce },
          [offscreen]
        );
        ctrl = {
          resize: (width, height, d) => w.postMessage({ type: "resize", w: width, h: height, dpr: d }),
          mouse: (x, y) => w.postMessage({ type: "mouse", x, y }),
          theme: (dark) => w.postMessage({ type: "theme", dark }),
          visible: (visible) => w.postMessage({ type: "visible", visible }),
          destroy: () => {
            w.terminate();
            el.remove();
          },
        };
        // If the worker can't draw (no 2D OffscreenCanvas), switch to the main thread.
        w.onmessage = (e) => {
          if (e.data?.type === "unsupported") {
            ctrl.destroy();
            ctrl = mainThread();
          }
        };
      } else {
        ctrl = mainThread();
      }
    } else {
      ctrl = mainThread();
    }

    // Pointer parallax, sent at most once per frame
    let px = 0;
    let py = 0;
    let pending = false;
    let onScreen = true;
    const flushPointer = () => {
      pending = false;
      const r = host.getBoundingClientRect();
      ctrl.mouse((px - r.left) / r.width, (py - r.top) / r.height);
    };
    const onPointer = (e: PointerEvent) => {
      if (!onScreen || reduce) return;
      px = e.clientX;
      py = e.clientY;
      if (!pending) {
        pending = true;
        requestAnimationFrame(flushPointer);
      }
    };

    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      ctrl.resize(width, height, dpr());
    });
    ro.observe(host);

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      ctrl.visible(onScreen && !document.hidden);
    });
    io.observe(host);

    const onVisibility = () => ctrl.visible(onScreen && !document.hidden);
    const mo = new MutationObserver(() => ctrl.theme(isDark()));
    mo.observe(root, { attributes: true, attributeFilter: ["class"] });
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pointermove", onPointer, { passive: true });

    return () => {
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointer);
      ctrl.destroy();
    };
  }, [preset]);

  return <div ref={hostRef} aria-hidden className={cn("pointer-events-none h-full w-full", className)} />;
}
