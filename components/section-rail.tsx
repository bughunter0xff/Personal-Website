"use client";

import { m, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { sections } from "@/content";
import { cn } from "@/lib/utils";

/**
 * Fixed left rail (wide screens only): section numbers with the active one
 * highlighted, and a thin scroll-progress line. Pure IntersectionObserver;
 * no scroll listeners.
 */
export function SectionRail() {
  const [active, setActive] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    els.forEach((el) => io.observe(el));
    const onTop = () => {
      if (window.scrollY < window.innerHeight * 0.5) setActive(null);
    };
    window.addEventListener("scroll", onTop, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onTop);
    };
  }, []);

  return (
    <nav
      aria-label="Sections"
      className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 xl:flex xl:flex-col xl:items-start xl:gap-5"
    >
      <span aria-hidden className="relative ml-[3px] h-24 w-px overflow-hidden bg-line">
        <m.span
          className="absolute inset-x-0 top-0 h-full origin-top bg-accent"
          style={{ scaleY: progress }}
        />
      </span>
      <ol className="flex flex-col gap-1">
        {sections.map((s) => {
          const isActive = active === s.id;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={isActive ? "true" : undefined}
                className="group flex min-h-6 items-center gap-3 py-1"
              >
                <span
                  aria-hidden
                  className={cn(
                    "size-[7px] rounded-full border transition-colors duration-300",
                    isActive ? "border-accent bg-accent" : "border-line-strong bg-transparent group-hover:border-fg",
                  )}
                />
                <span
                  className={cn(
                    "label-mono transition-colors duration-300",
                    isActive ? "text-fg" : "text-fg-faint group-hover:text-fg-muted",
                  )}
                >
                  {s.index}
                </span>
                <span
                  className={cn(
                    "label-mono -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100",
                    isActive ? "translate-x-0 text-fg-muted opacity-100" : "text-fg-faint",
                  )}
                >
                  {s.label}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
