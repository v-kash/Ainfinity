"use client";

import Link from "next/link";
import { motion, useSpring } from "motion/react";
import { useRef, type ComponentPropsWithoutRef, type PointerEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ArrowSwap } from "./arrow-icon";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

type Props = {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  size?: Size;
  arrow?: boolean | "diagonal";
  magnetic?: boolean;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px] gap-2",
  md: "h-11 px-5 text-sm gap-2.5",
  lg: "h-13 px-7 text-[15px] gap-3",
};

const variants: Record<Variant, { base: string; fill: string; hoverText: string }> = {
  primary: { base: "bg-accent text-on-accent", fill: "bg-foreground", hoverText: "group-hover:text-background" },
  outline: { base: "border border-line-strong text-foreground", fill: "bg-foreground", hoverText: "group-hover:text-background" },
  ghost: { base: "text-foreground", fill: "bg-foreground/[0.06]", hoverText: "" },
};

/**
 * Pill button: a fill rises from the bottom on hover, and on mouse pointers
 * the button leans gently toward the cursor.
 */
export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  arrow = false,
  magnetic = true,
  className,
  ...rest
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const spring = { stiffness: 260, damping: 18, mass: 0.4 };
  const x = useSpring(0, spring);
  const y = useSpring(0, spring);

  const onMove = (e: PointerEvent) => {
    if (!magnetic || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.22);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.3);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const v = variants[variant];
  const inner = (
    <>
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 translate-y-[101%] rounded-[inherit] transition-transform duration-500 ease-out-expo group-hover:translate-y-0",
          v.fill
        )}
      />
      <span className={cn("relative z-10 inline-flex items-center gap-[inherit] transition-colors duration-300", v.hoverText)}>
        {children}
        {arrow && <ArrowSwap diagonal={arrow === "diagonal"} className="size-3.5" />}
      </span>
    </>
  );

  const classes = cn(
    "group relative isolate inline-flex w-full select-none items-center justify-center overflow-hidden rounded-full font-semibold whitespace-nowrap",
    "transition-opacity duration-300 disabled:pointer-events-none disabled:opacity-60",
    sizes[size],
    v.base
  );

  const external = href && /^(https?:|tel:|mailto:)/.test(href);

  return (
    <motion.span ref={ref} style={{ x, y }} onPointerMove={onMove} onPointerLeave={onLeave} className={cn("inline-flex", className)}>
      {href ? (
        external ? (
          <a href={href} className={classes}>{inner}</a>
        ) : (
          <Link href={href} className={classes}>{inner}</Link>
        )
      ) : (
        <button className={classes} {...rest}>{inner}</button>
      )}
    </motion.span>
  );
}
