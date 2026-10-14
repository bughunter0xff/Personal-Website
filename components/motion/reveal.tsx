"use client";

import { m, type HTMLMotionProps } from "framer-motion";
import { fadeUp } from "@/lib/motion";

type RevealProps = HTMLMotionProps<"div"> & {
  /** Render as a list item when the parent is a <ul>/<ol>. */
  as?: "div" | "li";
  /** Delay in seconds. */
  delay?: number;
  /** Amount of the element that must be in view before animating (0–1). */
  amount?: number;
};

/**
 * Scroll-linked reveal. Animates once when the element enters the viewport.
 * Respects prefers-reduced-motion via <MotionConfig reducedMotion="user" />.
 */
export function Reveal({ as = "div", delay = 0, amount = 0.15, children, ...rest }: RevealProps) {
  const Component = as === "li" ? m.li : m.div;
  return (
    <Component
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount, margin: "0px 0px -8% 0px" }}
      variants={fadeUp}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      {...(rest as HTMLMotionProps<"div"> & HTMLMotionProps<"li">)}
    >
      {children}
    </Component>
  );
}
