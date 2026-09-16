"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useState, type PointerEvent } from "react";
import { work } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow, SectionTitle } from "@/components/ui/section-title";
import { SmartImage } from "@/components/ui/smart-image";

function WorkCard({ item }: { item: (typeof work)[number] }) {
  const [hover, setHover] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 350, damping: 30, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 350, damping: 30, mass: 0.5 });

  const onMove = (e: PointerEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  };

  return (
    <Link
      href={item.href}
      onPointerMove={onMove}
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") setHover(true);
      }}
      onPointerLeave={() => setHover(false)}
      className="group block"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-surface">
        <SmartImage
          src={item.image}
          alt={item.title}
          sizes="(min-width: 1024px) 20vw, (min-width: 640px) 45vw, 90vw"
          className="duration-[1100ms] ease-out-expo group-hover:scale-[1.07]"
        />
        <span className="absolute bottom-2.5 left-2.5 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur-md">
          {item.tag}
        </span>
        {/* Cursor-following label */}
        <motion.span
          aria-hidden
          style={{ left: sx, top: sy }}
          animate={{ scale: hover ? 1 : 0, opacity: hover ? 1 : 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none absolute -mt-9 -ml-9 grid size-18 place-items-center rounded-full bg-accent text-[11px] font-semibold text-white"
        >
          Explore
        </motion.span>
      </div>
      <h3 className="mt-4 text-[15px] font-semibold tracking-[-0.01em]">{item.title}</h3>
      <p className="mt-1 text-[13px] leading-relaxed text-muted">{item.text}</p>
    </Link>
  );
}

export function FeaturedWork() {
  return (
    <section id="work" className="border-t border-line py-20 md:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Eyebrow>Featured Work</Eyebrow>
            <SectionTitle className="mt-4 text-[clamp(1.9rem,3vw,2.6rem)]!" lines={["Ideas Into", ""]} accent="Impact." />
            <Button href="/services" variant="outline" size="sm" arrow className="mt-7">
              View All Work
            </Button>
          </div>
          <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:col-span-9 lg:grid-cols-4">
            {work.map((item) => (
              <div key={item.title} className="w-[78%] shrink-0 snap-start sm:w-auto">
                <WorkCard item={item} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
