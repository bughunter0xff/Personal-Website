"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  /** Final value. Non-numeric input is rendered as-is. */
  value: string;
  className?: string;
  duration?: number;
}

/**
 * Counts from 0 to the target when scrolled into view, preserving any
 * leading-zero padding and trailing suffix ("01", "10+"). Shows the final
 * value immediately for reduced-motion users.
 */
export function CountUp({ value, className, duration = 1400 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const match = /^(\d+)(\D*)$/.exec(value);
  const target = match ? parseInt(match[1]!, 10) : NaN;
  const pad = match ? match[1]!.length : 0;
  const suffix = match ? match[2]! : "";
  const [display, setDisplay] = useState<string>(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || Number.isNaN(target)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const step = (now: number) => {
          const p = Math.min(1, (now - t0) / duration);
          const eased = 1 - Math.pow(1 - p, 4);
          const n = Math.round(target * eased);
          setDisplay(String(n).padStart(pad, "0") + suffix);
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, pad, suffix, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
