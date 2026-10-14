"use client";

import { ThemeProvider } from "next-themes";
import { LazyMotion, MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

const loadMotionFeatures = () => import("@/lib/motion-features").then((mod) => mod.default);

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      {/* LazyMotion + `m` components ship only the animation features we use.
          `reducedMotion="user"` makes Framer Motion honour prefers-reduced-motion
          globally: transforms/layout animations are disabled, opacity still fades. */}
      <LazyMotion features={loadMotionFeatures} strict>
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </LazyMotion>
    </ThemeProvider>
  );
}
