"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { testimonials } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { Eyebrow, SectionTitle } from "@/components/ui/section-title";

const DURATION = 8000;
const ease = [0.16, 1, 0.3, 1] as const;

export function Testimonials() {
  const [[index, direction], setState] = useState<[number, number]>([0, 1]);
  const [paused, setPaused] = useState(false);

  const go = useCallback((step: number) => {
    setState(([i]) => [(i + step + testimonials.length) % testimonials.length, step]);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => go(1), DURATION);
    return () => clearTimeout(id);
  }, [index, paused, go]);

  const t = testimonials[index];
  const initials = t.name.split(" ").map((n) => n[0]).join("");

  return (
    <section aria-labelledby="testimonials-title" className="border-t border-line py-20 md:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-4">
            <Eyebrow>Client Testimonials</Eyebrow>
            <SectionTitle
              className="mt-4 text-[clamp(1.9rem,3vw,2.6rem)]!"
              lines={["Trusted by", "Growing"]}
              accent="Businesses."
            />
          </div>

          <div
            className="lg:col-span-8"
            onPointerEnter={() => setPaused(true)}
            onPointerLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
          >
            <div className="flex gap-5 md:gap-7">
              <span aria-hidden className="select-none text-6xl leading-[0.8] font-semibold text-accent">
                &ldquo;
              </span>
              <div className="min-h-[190px] flex-1 overflow-hidden" aria-live="polite">
                <AnimatePresence mode="wait" custom={direction} initial={false}>
                  <motion.figure
                    key={index}
                    initial={{ opacity: 0, y: direction * 24, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: direction * -24, filter: "blur(6px)" }}
                    transition={{ duration: 0.55, ease }}
                  >
                    <blockquote className="text-[clamp(1.05rem,1.6vw,1.3rem)] leading-relaxed tracking-[-0.01em] text-foreground">
                      {t.quote}
                    </blockquote>
                    <figcaption className="mt-6 flex items-center gap-3">
                      <span className="grid size-10 place-items-center rounded-full bg-foreground text-xs font-semibold text-background">
                        {initials}
                      </span>
                      <span>
                        <span className="block text-sm font-semibold">{t.name}</span>
                        <span className="block text-xs text-muted">{t.role}</span>
                      </span>
                    </figcaption>
                  </motion.figure>
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-5 md:pl-[3.4rem]">
              <div className="flex flex-1 gap-2" role="tablist" aria-label="Choose testimonial">
                {testimonials.map((item, i) => (
                  <button
                    key={item.name}
                    role="tab"
                    aria-selected={i === index}
                    aria-label={`Testimonial from ${item.name}`}
                    onClick={() => setState([i, i > index ? 1 : -1])}
                    className="relative h-8 flex-1 max-w-24"
                  >
                    <span className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 overflow-hidden rounded-full bg-line-strong">
                      {i === index && (
                        <motion.span
                          key={`${index}-${paused}`}
                          className={cn("absolute inset-0 origin-left bg-accent")}
                          initial={{ scaleX: paused ? 1 : 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: paused ? 0 : DURATION / 1000, ease: "linear" }}
                        />
                      )}
                      {i < index && <span className="absolute inset-0 bg-foreground/40" />}
                    </span>
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                {[
                  { step: -1, label: "Previous testimonial", Icon: ArrowLeft },
                  { step: 1, label: "Next testimonial", Icon: ArrowRight },
                ].map(({ step, label, Icon }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => go(step)}
                    aria-label={label}
                    className="grid size-11 place-items-center rounded-full border border-line-strong transition-all duration-300 hover:border-foreground hover:bg-foreground hover:text-background active:scale-90"
                  >
                    <Icon className="size-4" strokeWidth={1.8} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
