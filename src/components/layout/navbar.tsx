"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState, type MouseEvent } from "react";
import { nav, site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  const pathname = usePathname();
  const lenis = useLenis();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    const nextScrolled = y > 24;
    if (nextScrolled !== scrolled) setScrolled(nextScrolled);
    if (!hidden && !open && y > 480 && y > prev + 2) setHidden(true);
    else if (hidden && y < prev - 2) setHidden(false);
  });

  // Lock scrolling while the mobile menu is open
  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
  }, [open, lenis]);

  // Close the menu on route change
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : !href.includes("#") && pathname.startsWith(href);

  /** Smooth-scroll to sections when we're already on the home page. */
  const onNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname === "/" && href.startsWith("/#")) {
      e.preventDefault();
      setOpen(false);
      lenis?.scrollTo(href.slice(1), { offset: -88 });
      history.replaceState(null, "", href);
    } else if (pathname === "/" && href === "/") {
      e.preventDefault();
      setOpen(false);
      lenis?.scrollTo(0);
    }
  };

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={cn(
            "transition-[background-color,border-color,backdrop-filter] duration-500",
            scrolled || open
              ? "border-b border-line bg-background/85 backdrop-blur-md"
              : "border-b border-transparent bg-transparent"
          )}
        >
          <div className="mx-auto flex h-[76px] w-full max-w-[1320px] items-center justify-between gap-6 px-5 sm:px-8">
            <Logo animated onClick={() => setOpen(false)} />

            <nav aria-label="Main" className="hidden lg:block" onMouseLeave={() => setHovered(null)}>
              <ul className="flex items-center">
                {nav.map((item) => (
                  <li key={item.href} className="relative">
                    <Link
                      href={item.href}
                      onClick={(e) => onNavClick(e, item.href)}
                      onMouseEnter={() => setHovered(item.href)}
                      className={cn(
                        "relative z-10 block px-4 py-2 text-[13px] font-medium transition-colors duration-300",
                        isActive(item.href) ? "text-foreground" : "text-muted hover:text-foreground"
                      )}
                    >
                      {item.label}
                      {isActive(item.href) && (
                        <motion.span layoutId="nav-active" className="absolute inset-x-4 -bottom-0.5 h-px bg-accent" />
                      )}
                    </Link>
                    {hovered === item.href && (
                      <motion.span
                        layoutId="nav-hover"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        className="absolute inset-0 rounded-full bg-foreground/[0.06]"
                      />
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-2.5">
              <ThemeToggle />
              <div className="hidden sm:block">
                <Button href="/contact" variant="outline" size="sm">
                  Get Started
                </Button>
              </div>
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                className="relative grid size-10 place-items-center rounded-full border border-line-strong lg:hidden"
              >
                <span className="sr-only">Menu</span>
                <span
                  className={cn(
                    "absolute h-[1.5px] w-4 bg-foreground transition-transform duration-500 ease-out-expo",
                    open ? "rotate-45" : "-translate-y-[4px]"
                  )}
                />
                <span
                  className={cn(
                    "absolute h-[1.5px] w-4 bg-foreground transition-transform duration-500 ease-out-expo",
                    open ? "-rotate-45" : "translate-y-[4px]"
                  )}
                />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col bg-background px-5 pt-[100px] pb-8 sm:px-8 lg:hidden"
            data-lenis-prevent
          >
            <nav aria-label="Mobile" className="flex-1">
              <ul className="space-y-1">
                {nav.map((item, i) => (
                  <li key={item.href} className="overflow-hidden">
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "100%" }}
                      transition={{ duration: 0.6, delay: 0.15 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link
                        href={item.href}
                        onClick={(e) => onNavClick(e, item.href)}
                        className={cn(
                          "flex items-baseline justify-between border-b border-line py-4 text-[clamp(1.9rem,8vw,2.6rem)] font-medium tracking-[-0.03em]",
                          isActive(item.href) ? "text-accent" : "text-foreground"
                        )}
                      >
                        {item.label}
                        <span className="text-xs font-medium tracking-normal text-muted">0{i + 1}</span>
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.5 } }}
              exit={{ opacity: 0 }}
              className="space-y-5"
            >
              <Button href="/contact" size="lg" arrow className="w-full">
                Start a Project
              </Button>
              <div className="flex flex-wrap justify-between gap-2 text-sm text-muted">
                <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
                <a href={site.contact.phoneHref}>{site.contact.phone}</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
