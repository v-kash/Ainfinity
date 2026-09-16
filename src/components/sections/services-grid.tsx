"use client";

import Link from "next/link";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useState, type PointerEvent } from "react";
import { services, serviceGroups, type Service, type ServiceGroup } from "@/lib/services";
import { cn } from "@/lib/utils";
import { ArrowSwap } from "@/components/ui/arrow-icon";
import { Container } from "@/components/ui/container";
import { Eyebrow, SectionTitle } from "@/components/ui/section-title";
import { ServiceIcon } from "@/components/ui/service-icon";
import { ServiceDrawer } from "./service-drawer";

type Filter = "all" | ServiceGroup;

const filters: { id: Filter; label: string; count: number }[] = [
  { id: "all", label: "All", count: services.length },
  { id: "core", label: serviceGroups.core.label, count: services.filter((s) => s.group === "core").length },
  { id: "growth", label: serviceGroups.growth.label, count: services.filter((s) => s.group === "growth").length },
];

/** Tracks the pointer so a soft glow follows it across the card. */
function spotlight(e: PointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

export function ServiceCard({ service, onOpen }: { service: Service; onOpen: (s: Service) => void }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(service)}
      onPointerMove={spotlight}
      className={cn(
        "group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-line bg-card p-5 text-left",
        "transition-[border-color,transform] duration-500 ease-out-expo hover:-translate-y-1 hover:border-line-strong"
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), color-mix(in srgb, var(--accent) 13%, transparent), transparent 70%)",
        }}
      />
      <span className="relative flex items-start gap-3.5">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line text-foreground transition-all duration-500 ease-out-expo group-hover:-rotate-6 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
          <ServiceIcon name={service.icon} className="size-[19px]" />
        </span>
        <span className="flex-1 pt-0.5 text-[15px] font-semibold leading-snug tracking-[-0.01em] text-foreground">
          {service.title}
        </span>
        <ArrowSwap diagonal className="mt-1 size-3.5 text-muted transition-colors group-hover:text-accent" />
      </span>
      <span className="relative mt-4 block text-[13px] leading-relaxed text-muted">{service.short}</span>
      <span className="relative mt-auto flex items-center justify-between pt-5 text-[11px] font-medium text-muted">
        <span>{service.items.length} services inside</span>
        <span className="translate-y-1 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:text-accent-ink group-hover:opacity-100">
          View details
        </span>
      </span>
    </button>
  );
}

export function ServicesGrid() {
  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState<Service | null>(null);
  const visible = services.filter((s) => filter === "all" || s.group === filter);

  return (
    <section id="services" className="py-20 md:py-28">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow>Our Services</Eyebrow>
            <SectionTitle className="mt-4" lines={["Complete Digital Services", "for"]} accent="Modern Businesses." />
          </div>
          <div className="lg:col-span-5 lg:pl-10">
            <p className="max-w-sm leading-relaxed text-muted">
              From strategy to execution, we provide end-to-end digital solutions to help your business grow faster,
              smarter and stronger.
            </p>
            <Link
              href="/services"
              className="group mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent-ink"
            >
              View All Services
              <ArrowSwap className="size-3.5" />
            </Link>
          </div>
        </div>

        {/* Filter */}
        <LayoutGroup id="service-filter">
          <div role="tablist" aria-label="Filter services" className="no-scrollbar mt-12 flex gap-1 overflow-x-auto">
            <div className="flex gap-1 rounded-full border border-line p-1">
              {filters.map((f) => (
                <button
                  key={f.id}
                  role="tab"
                  aria-selected={filter === f.id}
                  onClick={() => setFilter(f.id)}
                  className={cn(
                    "relative whitespace-nowrap rounded-full px-4 py-2 text-[13px] font-medium transition-colors duration-300",
                    filter === f.id ? "text-background" : "text-muted hover:text-foreground"
                  )}
                >
                  {filter === f.id && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 rounded-full bg-foreground"
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  )}
                  <span className="relative">
                    {f.label} <span className="opacity-60">{f.count}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </LayoutGroup>

        <motion.ul layout className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((s) => (
              <motion.li
                key={s.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <ServiceCard service={s} onOpen={setOpen} />
              </motion.li>
            ))}
            <motion.li key="cta" layout transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}>
              <Link
                href="/contact"
                className="group relative flex h-full min-h-[172px] items-center justify-between overflow-hidden rounded-2xl bg-foreground p-6 text-background"
              >
                <span
                  aria-hidden
                  className="absolute -right-16 -bottom-24 size-64 rounded-full bg-accent opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-60"
                />
                <span className="relative text-xl font-medium leading-tight tracking-[-0.02em]">
                  Let&apos;s Build
                  <br />
                  What&apos;s Next.
                </span>
                <span className="relative grid size-12 place-items-center rounded-full border border-background/30 transition-all duration-500 ease-out-expo group-hover:scale-110 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                  <ArrowSwap className="size-4" />
                </span>
              </Link>
            </motion.li>
          </AnimatePresence>
        </motion.ul>
      </Container>

      <ServiceDrawer service={open} onClose={() => setOpen(null)} onChange={setOpen} />
    </section>
  );
}
