import type { Transition, Variants } from "framer-motion";

/** A confident, decelerating ease used across the site. */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export const transition: Transition = {
  duration: 0.8,
  ease: EASE_OUT_EXPO,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition },
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6 } },
};

export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});
