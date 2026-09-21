"use client";

import { useLenis } from "lenis/react";
import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { stats } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Counter } from "@/components/ui/counter";
import { SilkRibbons } from "@/components/visuals/silk-ribbons";

const ease = [0.16, 1, 0.3, 1] as const;
const lines = ["Where", "Technology", "Meets"];
const words = ["Ideas", "Systems", "People", "Growth"];

/** Rotating focus words. Isolated so its timer re-renders only this list, not the whole hero. */
function FocusWords() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % words.length), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.9 }}
      className="hidden justify-end lg:col-span-4 lg:flex"
    >
      <ul className="relative space-y-3 border-l border-line pl-6" aria-label="What we focus on">
        <motion.span
          aria-hidden
          className="absolute -left-px top-0 h-6 w-px bg-accent"
          animate={{ y: active * 36 }}
          transition={{ duration: 0.6, ease }}
        />
        {words.map((w, i) => (
          <li key={w} className="h-6">
            <button
              type="button"
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className={`text-xs font-semibold uppercase tracking-[0.22em] transition-colors duration-500 ${
                i === active ? "text-foreground" : "text-muted/60 hover:text-muted"
              }`}
            >
              {w}
            </button>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const lenis = useLenis();

  return (
    <section ref={sectionRef} id="home" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-[76px]">
      {/* Signature visual */}
      {/* Soft glow: a plain gradient, not a blur filter, so it costs nothing to composite */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_70%_at_85%_20%,color-mix(in_srgb,var(--accent)_12%,transparent),transparent_70%)]"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, ease }}
        className="absolute inset-0 -z-10"
      >
        <SilkRibbons preset="hero" dragArea={sectionRef} />
      </motion.div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-r from-background via-background/70 to-transparent md:via-background/40" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-linear-to-t from-background to-transparent" />

      <Container className="relative flex flex-1 flex-col justify-center py-14">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease }}
              className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-ink"
            >
              Your Growth Partner
            </motion.p>

            <h1 className="mt-6 text-[clamp(2.75rem,6.2vw,5.4rem)] font-medium leading-[0.98] tracking-[-0.045em]">
              {lines.map((line, i) => (
                <span key={line} className="block overflow-hidden pb-[0.2em]">
                  <motion.span
                    className="block"
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.1, delay: 0.15 + i * 0.09, ease }}
                  >
                    {line}
                    {i === lines.length - 1 && <span className="text-accent"> Possibility.</span>}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.55, ease }}
              className="mt-7 max-w-[30rem] text-[clamp(1rem,1.3vw,1.125rem)] leading-relaxed text-muted"
            >
              We build digital systems, AI automation and business solutions for a brighter tomorrow.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.68, ease }}
              className="mt-9 flex flex-wrap gap-3"
            >
              <Button href="/contact" size="lg" arrow>
                Start a Project
              </Button>
              <Button href="/services" size="lg" variant="outline">
                Explore Our Services
              </Button>
            </motion.div>
          </div>

          <FocusWords />
        </div>
      </Container>

      <Container className="relative pb-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.85, ease }}
          className="flex items-end justify-between gap-6 border-t border-line pt-7"
        >
          <dl className="grid flex-1 grid-cols-2 gap-x-6 gap-y-5 sm:flex sm:gap-14">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-[1.6rem] font-medium tracking-[-0.03em]">
                  <Counter value={s.value} suffix={s.suffix} />
                </dd>
                <dd className="mt-0.5 text-xs text-muted">{s.label}</dd>
              </div>
            ))}
          </dl>
          <button
            type="button"
            onClick={() => lenis?.scrollTo("#about", { offset: -40 })}
            className="group hidden shrink-0 items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted transition-colors hover:text-foreground md:flex"
          >
            Scroll to explore
            <span className="grid size-11 place-items-center overflow-hidden rounded-full border border-line-strong transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
              <motion.span
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowDown className="size-4" strokeWidth={1.8} />
              </motion.span>
            </span>
          </button>
        </motion.div>
      </Container>
    </section>
  );
}
