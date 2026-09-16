"use client";

import { useEffect, useRef, type RefObject } from "react";
import { cn } from "@/lib/utils";
import { createSilkRenderer, PRESETS, type SilkPreset } from "./silk-renderer";

/** Controls inside a drag area that keep their own click behaviour */
const NO_DRAG = "a, button, input, textarea, select, label, summary, [role='button'], [contenteditable]";

/**
 * Generative silk ribbons.
 *
 * Performance: every point of every line is computed on the GPU in a WebGL
 * vertex shader, so the main thread only sets a few numbers per frame.
 * Animation pauses when off-screen or in a background tab, and a single still
 * frame is drawn for people who prefer reduced motion. Without WebGL nothing
 * is drawn and the section's static backdrop shows on its own.
 *
 * Interaction: with a `dragArea`, a mouse can grab a ribbon, stretch it, and
 * let go to watch it wobble back; flicking makes it flutter. Touch is ignored
 * so swiping still scrolls the page.
 */
export function SilkRibbons({
  preset = "hero",
  dragArea,
  className,
}: {
  preset?: SilkPreset;
  /** Element whose background can be dragged, usually the section behind the ribbons */
  dragArea?: RefObject<HTMLElement | null>;
  className?: string;
}) {
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

    const area = reduce ? null : (dragArea?.current ?? null);
    let dragging = false;
    let hovering = false;
    const setHovering = (value: boolean) => {
      if (value === hovering || !area) return;
      hovering = value;
      area.style.cursor = value ? "grab" : "";
    };

    // Pointer parallax, hover and drag, handled at most once per frame
    let px = 0;
    let py = 0;
    let pointerType = "";
    let target: EventTarget | null = null;
    let timeStamp = 0;
    let pending = false;
    let onScreen = true;
    const flushPointer = () => {
      pending = false;
      const r = host.getBoundingClientRect();
      renderer.setMouse((px - r.left) / r.width, (py - r.top) / r.height);
      if (!area) return;
      if (dragging) renderer.drag(px - r.left, py - r.top, timeStamp);
      else
        setHovering(
          pointerType === "mouse" &&
            target instanceof Element &&
            area.contains(target) &&
            !target.closest(NO_DRAG) &&
            renderer.hitTest(px - r.left, py - r.top)
        );
    };
    const onPointer = (e: PointerEvent) => {
      if (reduce || (!onScreen && !dragging)) return;
      px = e.clientX;
      py = e.clientY;
      pointerType = e.pointerType;
      target = e.target;
      timeStamp = e.timeStamp;
      if (!pending) {
        pending = true;
        requestAnimationFrame(flushPointer);
      }
    };

    const onDown = (e: PointerEvent) => {
      if (!area || e.pointerType !== "mouse" || e.button !== 0) return;
      if (!(e.target instanceof Element) || e.target.closest(NO_DRAG)) return;
      const r = host.getBoundingClientRect();
      if (!renderer.hitTest(e.clientX - r.left, e.clientY - r.top)) return;
      dragging = true;
      renderer.grab(e.clientX - r.left, e.clientY - r.top, e.timeStamp);
      // Keep receiving moves (and the release) even if the mouse leaves the section
      area.setPointerCapture(e.pointerId);
      setHovering(false);
      root.style.cursor = "grabbing";
    };
    const onRelease = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      renderer.release(e.timeStamp);
      root.style.cursor = "";
    };
    const onLeave = () => {
      if (!dragging) setHovering(false);
    };
    // Grabbing silk that sits over text shouldn't start a text selection
    const blockWhileDragging = (e: Event) => {
      if (dragging) e.preventDefault();
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
    if (area) {
      area.addEventListener("pointerdown", onDown);
      // Fires on release, cancel, or anything else that ends the capture
      area.addEventListener("lostpointercapture", onRelease);
      area.addEventListener("pointerleave", onLeave);
      document.addEventListener("selectstart", blockWhileDragging);
      document.addEventListener("dragstart", blockWhileDragging);
    }

    return () => {
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointer);
      if (area) {
        area.removeEventListener("pointerdown", onDown);
        area.removeEventListener("lostpointercapture", onRelease);
        area.removeEventListener("pointerleave", onLeave);
        document.removeEventListener("selectstart", blockWhileDragging);
        document.removeEventListener("dragstart", blockWhileDragging);
        area.style.cursor = "";
        if (dragging) root.style.cursor = "";
      }
      renderer.destroy();
      canvas.remove();
    };
  }, [preset, dragArea]);

  return <div ref={hostRef} aria-hidden className={cn("pointer-events-none h-full w-full", className)} />;
}
