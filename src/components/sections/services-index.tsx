"use client";

import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useState } from "react";
import { services, serviceGroups, type ServiceGroup } from "@/lib/services";
import { ArrowSwap } from "@/components/ui/arrow-icon";
import { Container } from "@/components/ui/container";
import { ServiceIcon } from "@/components/ui/service-icon";
import { SmartImage } from "@/components/ui/smart-image";

/** Service list with an image preview that trails the cursor on desktop. */
export function ServicesIndex() {
  const [hovered, setHovered] = useState<string | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 180, damping: 22, mass: 0.6 });
  const current = services.find((s) => s.slug === hovered);

  return (
    <div
      onPointerMove={(e) => {
        x.set(e.clientX);
        y.set(e.clientY);
      }}
    >
      {(Object.keys(serviceGroups) as ServiceGroup[]).map((group, gi) => (
        <section key={group} id={group} className="border-t border-line py-16 md:py-20">
          <Container>
            <div className="grid gap-4 md:grid-cols-12">
              <p className="text-sm font-medium tabular-nums text-muted md:col-span-2">0{gi + 1}</p>
              <div className="md:col-span-10">
                <h2 className="text-[clamp(1.8rem,3.2vw,2.6rem)] font-medium tracking-[-0.035em]">
                  {serviceGroups[group].title}
                </h2>
                <p className="mt-2 max-w-xl text-muted">{serviceGroups[group].description}</p>
              </div>
            </div>

            <ul className="mt-10 md:ml-[calc(100%/12*2)]" onPointerLeave={() => setHovered(null)}>
              {services
                .filter((s) => s.group === group)
                .map((s) => (
                  <li key={s.slug} className="border-t border-line last:border-b">
                    <Link
                      href={`/services/${s.slug}`}
                      onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(s.slug)}
                      className="group grid gap-4 py-7 transition-[padding] duration-500 ease-out-expo md:grid-cols-12 md:items-start md:hover:pl-4"
                    >
                      <span className="flex items-center gap-4 md:col-span-5">
                        <span className="text-xs font-medium tabular-nums text-muted">{s.number}</span>
                        <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line transition-colors duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                          <ServiceIcon name={s.icon} className="size-[18px]" />
                        </span>
                        <span className="text-lg font-semibold leading-snug tracking-[-0.015em] transition-colors duration-300 group-hover:text-accent-ink">
                          {s.title}
                        </span>
                      </span>
                      <span className="md:col-span-6">
                        <span className="block text-sm leading-relaxed text-muted">{s.description}</span>
                        <span className="mt-3 flex flex-wrap gap-1.5">
                          {s.items.slice(0, 5).map((item) => (
                            <span key={item} className="rounded-full border border-line px-2.5 py-1 text-[11px] text-foreground/80">
                              {item}
                            </span>
                          ))}
                          <span className="rounded-full bg-foreground/[0.06] px-2.5 py-1 text-[11px] text-muted">
                            +{s.items.length - 5} more
                          </span>
                        </span>
                      </span>
                      <span className="hidden justify-end md:col-span-1 md:flex">
                        <span className="grid size-10 place-items-center rounded-full border border-line-strong transition-all duration-500 group-hover:rotate-0 group-hover:border-foreground group-hover:bg-foreground group-hover:text-background">
                          <ArrowSwap diagonal className="size-4" />
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
            </ul>
          </Container>
        </section>
      ))}

      {/* Floating preview */}
      <motion.div
        aria-hidden
        style={{ left: sx, top: sy }}
        className="pointer-events-none fixed z-40 hidden -translate-x-1/2 -translate-y-1/2 lg:block"
      >
        <AnimatePresence>
          {current && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6, rotate: -6 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.6, rotate: 6 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative ml-56 h-44 w-64 overflow-hidden rounded-[2px] shadow-2xl"
            >
              <AnimatePresence initial={false}>
                <motion.div
                  key={current.slug}
                  initial={{ clipPath: "inset(100% 0 0 0)" }}
                  animate={{ clipPath: "inset(0% 0 0 0)" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                  className="absolute inset-0"
                >
                  <SmartImage src={current.image} alt="" sizes="260px" />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
