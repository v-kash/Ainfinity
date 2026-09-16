"use client";

import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { pillars } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section-title";
import { SmartImage } from "@/components/ui/smart-image";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Four slanted image panels; the active one widens.
 *
 * Performance notes:
 * - The slant is a CSS skew transform (GPU composited), not clip-path, which repaints every frame.
 * - Widening is a single grid-template-columns transition on the parent. Images sit in a
 *   fixed-width layer, so they never resize or re-rasterize while panels animate.
 * - "Inactive" dimming is an overlay's opacity rather than a grayscale filter.
 * - Hovering uses a short intent delay so sweeping the mouse across doesn't restart the animation 4 times.
 */
export function Pillars() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const intent = useRef<ReturnType<typeof setTimeout>>(undefined);
  const inView = useInView(ref, { margin: "-20% 0px" });

  useEffect(() => {
    if (!inView || paused) return;
    const id = setInterval(() => setActive((a) => (a + 1) % pillars.length), 4000);
    return () => clearInterval(id);
  }, [inView, paused]);

  useEffect(() => () => clearTimeout(intent.current), []);

  const hoverTo = (i: number) => {
    clearTimeout(intent.current);
    intent.current = setTimeout(() => setActive(i), 80);
  };

  const columns = pillars.map((_, i) => (i === active ? "1.8fr" : "1fr")).join(" ");

  return (
    <section id="about" className="relative border-y border-line bg-surface py-20 md:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow className="max-w-[16rem] leading-relaxed">Digital solutions for real businesses</Eyebrow>
            <h2 className="mt-5 text-[clamp(2.3rem,4.4vw,3.6rem)] font-medium leading-[1.02] tracking-[-0.04em]">
              <span className="block">Build. Grow.</span>
              <span className="block">Automate.</span>
              <span className="block text-accent">Transform.</span>
            </h2>
            <p className="mt-6 max-w-sm leading-relaxed text-muted">
              From websites and marketing to AI automation and custom platforms — we help businesses move forward
              with confidence.
            </p>
            <Button href="/services" variant="outline" arrow className="mt-8">
              Our Story
            </Button>
          </div>

          <div
            ref={ref}
            className="flex gap-6 lg:col-span-8"
            onPointerEnter={() => setPaused(true)}
            onPointerLeave={() => {
              clearTimeout(intent.current);
              setPaused(false);
            }}
          >
            {/* Panels */}
            <div
              style={{ "--cols": columns } as CSSProperties}
              className={cn(
                "grid flex-1 grid-cols-2 gap-3",
                "md:h-[440px] md:px-10 md:[grid-template-columns:var(--cols)]",
                "md:transition-[grid-template-columns] md:duration-[850ms] md:ease-out-expo"
              )}
            >
              {pillars.map((p, i) => {
                const isActive = active === i;
                return (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => setActive(i)}
                    onPointerEnter={(e) => e.pointerType === "mouse" && hoverTo(i)}
                    onFocus={() => setActive(i)}
                    aria-pressed={isActive}
                    className="group relative h-56 min-w-0 text-left sm:h-72 md:h-full"
                  >
                    {/* Slanted frame */}
                    <span className="absolute inset-0 overflow-hidden rounded-xl bg-black will-change-transform md:-skew-x-[10deg] md:rounded-md">
                      {/* Fixed-width, counter-skewed image layer */}
                      <span
                        className={cn(
                          "absolute inset-y-0 left-1/2 w-[max(100%,460px)] -translate-x-1/2 will-change-transform md:skew-x-[10deg]",
                          "transition-[scale] duration-[1200ms] ease-out-expo",
                          isActive ? "scale-[1.06]" : "scale-100"
                        )}
                      >
                        <SmartImage src={p.image} alt="" sizes="460px" />
                      </span>
                      <span aria-hidden className="absolute inset-0 bg-linear-to-t from-black/90 via-black/25 to-black/5" />
                      <span
                        aria-hidden
                        className={cn(
                          "absolute inset-0 bg-black/45 transition-opacity duration-700",
                          isActive ? "opacity-0" : "opacity-100"
                        )}
                      />
                      <span
                        aria-hidden
                        className={cn(
                          "absolute inset-x-0 bottom-0 h-1 origin-left bg-accent transition-transform duration-700 ease-out-expo md:hidden",
                          isActive ? "scale-x-100" : "scale-x-0"
                        )}
                      />

                      {/* Text, counter-skewed so it reads upright */}
                      <span className="absolute inset-x-4 bottom-0 pb-4 text-white md:right-3 md:left-4 md:skew-x-[10deg] md:pb-7">
                        <span className="block truncate text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">
                          {p.label}
                        </span>
                        <span className="mt-2 block max-w-[11rem] text-sm font-medium leading-snug md:text-[13px]">{p.title}</span>
                        <span
                          className={cn(
                            "hidden transition-[grid-template-rows,opacity] duration-500 ease-out-expo md:grid",
                            isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                          )}
                        >
                          <span className="overflow-hidden">
                            <span className="block max-w-[15rem] pt-2 text-xs leading-relaxed text-white/70">{p.detail}</span>
                          </span>
                        </span>
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Index */}
            <ol className="hidden flex-col justify-center gap-4 md:flex" aria-label="Pillars">
              {pillars.map((p, i) => (
                <li key={p.label}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={p.label}
                    className={cn(
                      "flex items-center gap-3 text-xs font-medium tabular-nums transition-colors duration-500",
                      active === i ? "text-foreground" : "text-muted/60 hover:text-muted"
                    )}
                  >
                    0{i + 1}
                    <span className="relative h-px w-8 overflow-hidden bg-line">
                      <motion.span
                        className="absolute inset-0 origin-left bg-accent"
                        animate={{ scaleX: active === i ? 1 : 0 }}
                        transition={{ duration: 0.6, ease }}
                      />
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
