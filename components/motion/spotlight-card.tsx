"use client";

import { useRef, type HTMLAttributes, type PointerEvent } from "react";
import { cn } from "@/lib/utils";

type SpotlightCardProps = HTMLAttributes<HTMLDivElement>;

/**
 * A card with a soft radial highlight that follows the pointer.
 * Pure CSS variables + one pointermove handler; no re-renders.
 */
export function SpotlightCard({ className, children, ...rest }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--y", `${e.clientY - rect.top}px`);
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      className={cn(
        "spotlight rounded-2xl border border-line bg-bg-elevated/60 transition-colors duration-300 hover:border-line-strong",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
