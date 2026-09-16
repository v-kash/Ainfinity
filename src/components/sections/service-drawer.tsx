"use client";


import { useLenis } from "lenis/react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { services, serviceGroups, type Service } from "@/lib/services";
import { Button } from "@/components/ui/button";
import { ServiceIcon } from "@/components/ui/service-icon";

const ease = [0.16, 1, 0.3, 1] as const;

/** Slide-over panel with the full list of what's included in a service. */
export function ServiceDrawer({
  service,
  onClose,
  onChange,
}: {
  service: Service | null;
  onClose: () => void;
  onChange: (s: Service) => void;
}) {
  const lenis = useLenis();
  const closeRef = useRef<HTMLButtonElement>(null);
  const [direction, setDirection] = useState(1);
  const open = !!service;

  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      window.removeEventListener("keydown", onKey);
      previous?.focus?.();
    };
  }, [open, lenis, onClose]);

  const index = service ? services.findIndex((s) => s.slug === service.slug) : 0;
  const go = (step: number) => {
    setDirection(step);
    onChange(services[(index + step + services.length) % services.length]);
  };

  return (
    <AnimatePresence>
      {service && (
        <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-labelledby="drawer-title">
          <motion.button
            type="button"
            aria-label="Close"
            tabIndex={-1}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.7, ease }}
            className="absolute inset-y-0 right-0 flex w-full max-w-[540px] flex-col border-l border-line bg-background"
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-4 sm:px-8">
              <span className="text-xs font-medium tabular-nums text-muted">
                {service.number} / {services.length}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous service"
                  className="grid size-9 place-items-center rounded-full border border-line-strong transition-colors hover:border-accent hover:text-accent"
                >
                  <ArrowLeft className="size-4" strokeWidth={1.8} />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next service"
                  className="grid size-9 place-items-center rounded-full border border-line-strong transition-colors hover:border-accent hover:text-accent"
                >
                  <ArrowRight className="size-4" strokeWidth={1.8} />
                </button>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  aria-label="Close panel"
                  className="ml-2 grid size-9 place-items-center rounded-full bg-foreground text-background transition-transform duration-500 ease-out-expo hover:rotate-90"
                >
                  <X className="size-4" strokeWidth={2} />
                </button>
              </div>
            </div>

            <div className="relative flex-1 overflow-y-auto overflow-x-hidden" data-lenis-prevent>
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.div
                  key={service.slug}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -40 }}
                  transition={{ duration: 0.4, ease }}
                  className="px-6 py-8 sm:px-8"
                >
                  <p className="text-xs font-semibold text-accent-ink">{serviceGroups[service.group].title}</p>
                  <div className="mt-5 grid size-14 place-items-center rounded-2xl bg-accent text-white">
                    <ServiceIcon name={service.icon} className="size-6" />
                  </div>
                  <h2 id="drawer-title" className="mt-6 text-3xl font-medium leading-tight tracking-[-0.03em]">
                    {service.title}
                  </h2>
                  <p className="mt-3 leading-relaxed text-muted">{service.description}</p>

                  <h3 className="mt-10 text-sm font-semibold">What&apos;s included</h3>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {service.items.map((item, i) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: 0.1 + i * 0.03, ease }}
                        className="group flex items-center gap-3 rounded-xl border border-line px-3.5 py-3 text-sm transition-colors duration-300 hover:border-accent/50 hover:bg-accent/[0.04]"
                      >
                        <span className="grid size-5 shrink-0 place-items-center rounded-full bg-foreground/[0.06] text-foreground transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                          <Check className="size-3" strokeWidth={2.5} />
                        </span>
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex flex-col gap-2.5 border-t border-line px-6 py-5 sm:flex-row sm:px-8">
              <Button href={`/contact?service=${service.slug}`} arrow className="flex-1">
                Discuss this service
              </Button>
              <Button href={`/services/${service.slug}`} variant="outline" className="flex-1">
                Open full page
              </Button>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}

