"use client";

import { useEffect, useRef, useState } from "react";

type CursorState = "idle" | "hover" | "label" | "down";

/**
 * A small accent dot that replaces the native cursor on fine-pointer devices.
 * It grows into a ring over interactive elements and shows a short label when
 * the element carries `data-cursor="…"`. Disabled for touch, coarse pointers
 * and reduced-motion users (the CSS also keeps the native cursor there).
 */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState<CursorState>("idle");
  const [label, setLabel] = useState("");
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;
    document.documentElement.classList.add("has-cursor");

    let x = -100;
    let y = -100;
    let tx = -100;
    let ty = -100;
    let raf = 0;

    const loop = () => {
      x += (tx - x) * 0.35;
      y += (ty - y) * 0.35;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      tx = e.clientX;
      ty = e.clientY;
      setHidden(false);
      const target = (e.target as Element | null)?.closest<HTMLElement>(
        "a, button, [role=button], [data-cursor], input, textarea, [cmdk-root]",
      );
      if (!target) {
        setState("idle");
        return;
      }
      if (target.matches("input, textarea, [cmdk-root]") || target.closest("[cmdk-root]")) {
        setHidden(true);
        return;
      }
      const text = target.closest<HTMLElement>("[data-cursor]")?.dataset.cursor;
      if (text) {
        setLabel(text);
        setState("label");
      } else {
        setState("hover");
      }
    };
    const onDown = () => setState((s) => (s === "idle" ? "down" : s));
    const onUp = () => setState((s) => (s === "down" ? "idle" : s));
    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.documentElement.addEventListener("pointerleave", onLeave);
    document.documentElement.addEventListener("pointerenter", onEnter);

    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.documentElement.removeEventListener("pointerenter", onEnter);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div ref={ref} aria-hidden className="cursor" data-state={state} data-hidden={hidden}>
      {state === "label" ? label : null}
    </div>
  );
}
