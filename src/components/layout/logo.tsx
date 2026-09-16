"use client";

import Link from "next/link";
import { useId, useRef, type CSSProperties } from "react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { letters, mark, MARK_VIEWBOX, WORDMARK_VIEWBOX } from "./logo-paths";

const LOOP_STOPS = [
  [0, "#fd8c0d"], [0.36, "#fe840b"], [0.45, "#fd7606"], [0.5, "#fd5b02"], [0.71, "#fe5001"], [0.82, "#e14201"],
] as const;
/** Where the orange band tucks under the loop: fades into black in the light theme… */
const SHADOW_LIGHT = [[0.89, "#992f01"], [0.94, "#541800"], [0.97, "#1e0700"], [1, "#0a0a0a"]] as const;
/** …and stays a deep warm red in the dark theme, where near-black would read as a hole */
const SHADOW_DARK = [[0.9, "#b03401"], [0.96, "#7f2600"], [1, "#662000"]] as const;
const ACCENT = "#fd5a02";
/** Shine band start/end offset, in the mark's coordinate units */
const SHINE_TRAVEL = 420;

const stops = (list: readonly (readonly [number, string])[]) =>
  list.map(([offset, color]) => <stop key={offset} offset={offset} stopColor={color} />);

/**
 * The Aarambh Infinity logo, drawn inline so it follows the theme and its parts can move.
 *
 * `animated` (header): the mark wipes in and the letters rise on page load. That
 * intro is plain CSS (see globals.css), so it starts on first paint without waiting
 * for JavaScript. Hovering or focusing the logo sweeps a light across the mark.
 */
export function Logo({ animated = false, className, onClick }: { animated?: boolean; className?: string; onClick?: () => void }) {
  // Unique per instance: the header and footer logos are on the page together
  const uid = useId().replace(/[^\w-]/g, "");
  const id = (name: string) => `logo${uid}-${name}`;
  const ref = (name: string) => `#${id(name)}`;
  const url = (name: string) => `url(#${id(name)})`;
  const shineRef = useRef<SVGRectElement>(null);

  const shine = () => {
    const el = shineRef.current;
    // Let a running sweep finish instead of restarting it
    if (!el || el.getAnimations().length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.animate([{ transform: `translateX(${-SHINE_TRAVEL}px)` }, { transform: `translateX(${SHINE_TRAVEL}px)` }], {
      duration: 900,
      easing: "cubic-bezier(0.65, 0, 0.35, 1)",
    });
  };

  return (
    <Link
      href="/"
      onClick={onClick}
      onPointerEnter={animated ? shine : undefined}
      onFocus={animated ? shine : undefined}
      aria-label={`${site.name} home`}
      className={cn("inline-flex shrink-0 items-center gap-2 text-foreground min-[360px]:gap-2.5", animated && "logo-intro", className)}
    >
      <svg viewBox={MARK_VIEWBOX} width={51} height={36} aria-hidden className="logo-mark shrink-0 max-[359px]:h-[29px] max-[359px]:w-[41px]">
        <defs>
          <path id={id("loop")} d={mark.loop} />
          <g id={id("a")}>
            {mark.a.map((d) => (
              <path key={d} d={d} />
            ))}
          </g>
          <path id={id("triangle")} d={mark.triangle} />
          <radialGradient id={id("loop-light")} gradientUnits="userSpaceOnUse" cx={620} cy={262} r={350}>
            {stops([...LOOP_STOPS, ...SHADOW_LIGHT])}
          </radialGradient>
          <radialGradient id={id("loop-dark")} gradientUnits="userSpaceOnUse" cx={620} cy={262} r={350}>
            {stops([...LOOP_STOPS, ...SHADOW_DARK])}
          </radialGradient>
          <linearGradient id={id("triangle-fill")} gradientUnits="userSpaceOnUse" x1={0} y1={203} x2={0} y2={263}>
            {stops([[0, "#fe800c"], [0.37, "#fd7502"], [0.78, "#fd5903"], [1, "#fc5403"]])}
          </linearGradient>
          <clipPath id={id("orange-light")}>
            <path d={mark.orangeLight} />
          </clipPath>
          <clipPath id={id("orange-dark")}>
            <path d={mark.orangeDark} />
          </clipPath>
        </defs>

        <use href={ref("loop")} fill="currentColor" />
        <use href={ref("loop")} fill={url("loop-light")} clipPath={url("orange-light")} className="dark:hidden" />
        <use href={ref("loop")} fill={url("loop-dark")} clipPath={url("orange-dark")} className="hidden dark:inline" />
        <use href={ref("a")} fill="currentColor" />
        <use href={ref("triangle")} fill={url("triangle-fill")} />

        {animated && (
          <>
            <defs>
              <mask id={id("shape")} maskUnits="userSpaceOnUse" x={246} y={57} width={549} height={388}>
                <use href={ref("loop")} fill="#fff" />
                <use href={ref("a")} fill="#fff" />
                <use href={ref("triangle")} fill="#fff" />
              </mask>
              <linearGradient id={id("shine")} gradientUnits="userSpaceOnUse" x1={440} y1={300} x2={600} y2={244}>
                <stop offset={0} stopColor="#fff" stopOpacity={0} />
                <stop offset={0.5} stopColor="#fff" stopOpacity={0.8} />
                <stop offset={1} stopColor="#fff" stopOpacity={0} />
              </linearGradient>
            </defs>
            {/* The mask keeps the light on the logo's shapes while the band slides underneath */}
            <g mask={url("shape")}>
              <rect
                ref={shineRef}
                x={246}
                y={57}
                width={549}
                height={388}
                fill={url("shine")}
                style={{ transform: `translateX(${-SHINE_TRAVEL}px)` }}
              />
            </g>
          </>
        )}
      </svg>

      <svg viewBox={WORDMARK_VIEWBOX} width={141} height={17.5} aria-hidden className="logo-wordmark shrink-0 max-[359px]:h-[14px] max-[359px]:w-[113px]">
        {letters.map((letter, i) => (
          <g
            key={i}
            className="logo-letter"
            fill={letter.accent ? ACCENT : "currentColor"}
            style={{ "--i": i } as CSSProperties}
          >
            {letter.paths.map((d) => (
              <path key={d} d={d} />
            ))}
          </g>
        ))}
      </svg>
    </Link>
  );
}
