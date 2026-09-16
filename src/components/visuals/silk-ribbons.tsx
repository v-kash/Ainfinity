"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { createSilkRenderer, PRESETS, type SilkPreset } from "./silk-renderer";

/**
 * Generative silk ribbons.
 *
 * Performance: every point of every line is computed on the GPU in a WebGL
 * vertex shader, so the main thread only sets a few numbers per frame.
 * Animation pauses when off-screen or in a background tab, and a single still
 * frame is drawn for people who prefer reduced motion. Without WebGL nothing
 * is drawn and the section's static backdrop shows on its own.
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

    // A fresh canvas per mount, since destroy() releases the canvas's WebGL context.
    const canvas = document.createElement("canvas");
    canvas.className = "block h-full w-full";
    canvas.setAttribute("aria-hidden", "true");
    host.appendChild(canvas);

    const renderer = createSilkRenderer(canvas, PRESETS[preset]);
    if (!renderer) {
      canvas.remove();
      return;
    }
    const rect = host.getBoundingClientRect();
    renderer.setDark(isDark());
    renderer.resize(rect.width, rect.height, dpr());
    renderer.start(reduce);

    // Pointer parallax, sent at most once per frame
    let px = 0;
    let py = 0;
    let pending = false;
    let onScreen = true;
    const flushPointer = () => {
      pending = false;
      const r = host.getBoundingClientRect();
      renderer.setMouse((px - r.left) / r.width, (py - r.top) / r.height);
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
      renderer.resize(width, height, dpr());
    });
    ro.observe(host);

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      renderer.setVisible(onScreen && !document.hidden);
    });
    io.observe(host);

    const onVisibility = () => renderer.setVisible(onScreen && !document.hidden);
    const mo = new MutationObserver(() => renderer.setDark(isDark()));
    mo.observe(root, { attributes: true, attributeFilter: ["class"] });
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pointermove", onPointer, { passive: true });

    return () => {
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointer);
      renderer.destroy();
      canvas.remove();
    };
  }, [preset]);

  return <div ref={hostRef} aria-hidden className={cn("pointer-events-none h-full w-full", className)} />;
}
