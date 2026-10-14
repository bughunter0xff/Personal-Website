"use client";

import { useEffect, useRef } from "react";

/**
 * Interactive dot field for the hero.
 *
 * A grid of fine dots on a canvas. Dots near the pointer are pushed outward
 * and tinted with the accent; a slow ripple drifts across the field while
 * idle so it never looks static. Everything is drawn with the 2D context, so
 * no WebGL, no library, roughly 2k dots at 60fps on an integrated GPU.
 *
 * On touch devices and for reduced-motion users it draws once and stays
 * static (nothing to react to, and it keeps the main thread free). On
 * fine-pointer devices it animates only while the hero is on screen and the
 * tab is visible. Setup is deferred until the browser is idle so it never
 * competes with hydration. Theme colours are re-read when <html> changes.
 */
export function HeroField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    // Static when the user prefers reduced motion or has no hover-capable pointer.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches || !finePointer;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let cols = 0;
    let rows = 0;
    const GAP = 28;
    const RADIUS = 220;

    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
    let fg = "#f2f0ea";
    let accent = "#ff5a1f";
    let raf = 0;
    let running = false;
    let visible = true;
    const start = performance.now();

    function readTheme() {
      const css = getComputedStyle(document.documentElement);
      fg = css.getPropertyValue("--fg").trim() || fg;
      accent = css.getPropertyValue("--accent").trim() || accent;
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(width / GAP) + 1;
      rows = Math.ceil(height / GAP) + 1;
      draw(performance.now());
    }

    function hexToRgb(hex: string): [number, number, number] {
      const h = hex.replace("#", "");
      const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
      return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    }

    function draw(now: number) {
      ctx!.clearRect(0, 0, width, height);
      const t = (now - start) / 1000;

      // ease the pointer toward its target for a slight, pleasant lag
      pointer.x += (pointer.tx - pointer.x) * 0.12;
      pointer.y += (pointer.ty - pointer.y) * 0.12;

      const [fr, fg_, fb] = hexToRgb(fg);
      const [ar, ag, ab] = hexToRgb(accent);

      // idle ripple: a soft wave travelling from the upper-right
      const wx = width * 0.85;
      const wy = height * 0.1;

      const offsetX = (width - (cols - 1) * GAP) / 2;
      const offsetY = (height - (rows - 1) * GAP) / 2;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const gx = offsetX + i * GAP;
          const gy = offsetY + j * GAP;

          let x = gx;
          let y = gy;
          let mix = 0; // 0 = base, 1 = accent
          let alpha = 0.28;
          let size = 1;

          if (!reduce) {
            const dw = Math.hypot(gx - wx, gy - wy);
            const wave = Math.sin(dw / 90 - t * 1.1);
            alpha += Math.max(0, wave) * 0.12;

            const dx = gx - pointer.x;
            const dy = gy - pointer.y;
            const d = Math.hypot(dx, dy);
            if (d < RADIUS) {
              const f = 1 - d / RADIUS; // 1 at the pointer, 0 at the edge
              const e = f * f * (3 - 2 * f); // smoothstep
              const push = e * 18;
              x += (dx / (d || 1)) * push;
              y += (dy / (d || 1)) * push;
              mix = e;
              alpha = 0.28 + e * 0.7;
              size = 1 + e * 1.4;
            }
          }

          const r = Math.round(fr + (ar - fr) * mix);
          const g = Math.round(fg_ + (ag - fg_) * mix);
          const b = Math.round(fb + (ab - fb) * mix);
          ctx!.fillStyle = `rgba(${r},${g},${b},${alpha.toFixed(3)})`;
          ctx!.beginPath();
          ctx!.arc(x, y, size, 0, Math.PI * 2);
          ctx!.fill();
        }
      }
    }

    function loop(now: number) {
      if (!running) return;
      draw(now);
      raf = requestAnimationFrame(loop);
    }

    function play() {
      if (reduce || running || !visible || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(loop);
    }

    function pause() {
      running = false;
      cancelAnimationFrame(raf);
    }

    function onMove(e: PointerEvent) {
      if (!finePointer) return;
      const rect = canvas!.getBoundingClientRect();
      pointer.tx = e.clientX - rect.left;
      pointer.ty = e.clientY - rect.top;
    }

    function onLeave() {
      pointer.tx = -9999;
      pointer.ty = -9999;
    }

    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    let idle = 0;
    let disposed = false;
    const ro = new ResizeObserver(resize);
    const io = new IntersectionObserver(([entry]) => {
      visible = !!entry?.isIntersecting;
      if (visible) play();
      else pause();
    });
    const mo = new MutationObserver(() => {
      readTheme();
      if (!running) draw(performance.now());
    });

    const onVisibility = () => (document.hidden ? pause() : play());

    function setup() {
      if (disposed) return;
      readTheme();
      resize();
      ro.observe(canvas!);
      io.observe(canvas!);
      mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
      document.addEventListener("visibilitychange", onVisibility);
      if (!reduce) {
        window.addEventListener("pointermove", onMove, { passive: true });
        document.documentElement.addEventListener("pointerleave", onLeave);
      }
      play();
    }

    if (w.requestIdleCallback) idle = w.requestIdleCallback(setup, { timeout: 1500 });
    else idle = window.setTimeout(setup, 300);

    return () => {
      disposed = true;
      if (w.cancelIdleCallback) w.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      pause();
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full [mask-image:radial-gradient(ellipse_120%_100%_at_60%_45%,black_35%,transparent_100%)]"
    />
  );
}
