"use client";

import { motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { useRef, useState } from "react";
import { process } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow, SectionTitle } from "@/components/ui/section-title";

/** Five-step timeline whose progress line fills as you scroll through it. */
export function Process({ showButton = true }: { showButton?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  const [reached, setReached] = useState(0);
  const [focus, setFocus] = useState<number | null>(null);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setReached(Math.min(process.length - 1, Math.floor(v * (process.length - 1) + 0.15)));
  });

  return (
    <section id="process" className="relative border-y border-line bg-surface py-20 md:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-4">
            <Eyebrow>Our Process</Eyebrow>
            <SectionTitle className="mt-4" lines={["A Clear Path", "From Strategy", "to"]} accent="Growth." />
            <p className="mt-5 max-w-sm leading-relaxed text-muted">
              We follow a structured and collaborative process to ensure every project delivers real business value.
            </p>
            {showButton && (
              <Button href="/services#process" variant="outline" arrow className="mt-8">
                See How We Work
              </Button>
            )}
          </div>

          <div ref={ref} className="lg:col-span-8" onPointerLeave={() => setFocus(null)}>
            <ol className="relative grid gap-8 md:grid-cols-5 md:gap-4">
              {/* Track: horizontal on desktop, vertical on mobile */}
              <span aria-hidden className="absolute top-[58px] right-[10%] left-[10%] hidden h-px bg-line-strong md:block" />
              <motion.span
                aria-hidden
                style={{ scaleX: progress }}
                className="absolute top-[58px] right-[10%] left-[10%] hidden h-px origin-left bg-accent md:block"
              />
              <span aria-hidden className="absolute top-2 bottom-2 left-[9px] w-px bg-line-strong md:hidden" />
              <motion.span
                aria-hidden
                style={{ scaleY: progress }}
                className="absolute top-2 bottom-2 left-[9px] w-px origin-top bg-accent md:hidden"
              />

              {process.map((step, i) => {
                const done = i <= reached;
                const current = focus === null ? i === reached : focus === i;
                return (
                  <li
                    key={step.title}
                    onPointerEnter={() => setFocus(i)}
                    className="relative grid grid-cols-[20px_1fr] gap-x-5 md:flex md:flex-col md:items-center md:text-center"
                  >
                    <div className="col-start-2 md:order-1 md:h-[40px]">
                      <span className="block text-sm font-medium tabular-nums text-muted">0{i + 1}</span>
                      <span className={cn("block text-sm font-semibold transition-colors", current ? "text-foreground" : "text-foreground/80")}>
                        {step.title}
                      </span>
                    </div>
                    <span
                      className={cn(
                        "relative row-start-1 row-span-2 mt-0.5 grid size-5 place-items-center rounded-full border-2 bg-surface transition-colors duration-500 md:order-2 md:my-2",
                        done ? "border-accent" : "border-line-strong"
                      )}
                    >
                      <span
                        className={cn(
                          "size-2 rounded-full bg-accent transition-transform duration-500 ease-out-expo",
                          current ? "scale-100" : "scale-0"
                        )}
                      />
                      {current && (
                        <motion.span
                          layoutId="process-ring"
                          className="absolute -inset-2 rounded-full border border-accent/40"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </span>
                    <p
                      className={cn(
                        "col-start-2 mt-1 max-w-[12rem] text-xs leading-relaxed transition-colors duration-500 md:order-3 md:mt-2",
                        current ? "text-foreground" : "text-muted"
                      )}
                    >
                      {step.text}
                    </p>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
