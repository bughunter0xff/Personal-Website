"use client";

import { m, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useRef, type ReactNode, type PointerEvent } from "react";

interface MagneticProps {
  children: ReactNode;
  /** How far the element travels toward the pointer (0–1). */
  strength?: number;
  className?: string;
}

/**
 * Wraps an element so it is gently pulled toward the pointer while hovered.
 * Disabled for reduced-motion users and on touch devices (no hover).
 */
export function Magnetic({ children, strength = 0.35, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spring = { stiffness: 220, damping: 18, mass: 0.6 };
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);

  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * strength);
    y.set(dy * strength);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <m.div
      ref={ref}
      className={className}
      style={{ x: sx, y: sy, display: "inline-block" }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
    </m.div>
  );
}
