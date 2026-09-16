"use client";

import { ThemeProvider } from "next-themes";
import { ReactLenis } from "lenis/react";
import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
      <MotionConfig reducedMotion="user">
        <ReactLenis root options={{ lerp: 0.1, anchors: { offset: -88 }, respectReducedMotion: true }}>
          {children}
        </ReactLenis>
      </MotionConfig>
    </ThemeProvider>
  );
}
