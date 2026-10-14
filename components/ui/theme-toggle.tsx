"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { flushSync } from "react-dom";
import { useSyncExternalStore, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

const noopSubscribe = () => () => {};

/** True after hydration, false during SSR — without a setState-in-effect. */
function useMounted() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

type ViewTransitionDocument = Document & {
  startViewTransition?: (cb: () => void) => { finished: Promise<void> };
};

/**
 * Segmented light/dark switch. The active segment is always visible, so the
 * current mode is never ambiguous. Switching uses the View Transitions API to
 * reveal the new theme in a circle growing from the button (where supported,
 * and only when the user has not asked for reduced motion).
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const isDark = mounted ? resolvedTheme !== "light" : true;

  function switchTo(next: "light" | "dark", e: MouseEvent<HTMLButtonElement>) {
    if (next === (isDark ? "dark" : "light")) return;
    const doc = document as ViewTransitionDocument;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!doc.startViewTransition || reduce) {
      setTheme(next);
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const root = document.documentElement;
    root.style.setProperty("--vt-x", `${x}px`);
    root.style.setProperty("--vt-y", `${y}px`);
    root.style.setProperty("--vt-r", `${r}px`);

    doc.startViewTransition(() => {
      // Flush synchronously so the DOM has the new theme when the snapshot is taken.
      flushSync(() => setTheme(next));
    });
  }

  return (
    <div
      role="group"
      aria-label="Colour scheme"
      className={cn(
        "relative inline-flex h-9 items-center rounded-full border border-line p-0.5",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "absolute top-0.5 size-[30px] rounded-full bg-fg transition-transform duration-500 ease-[var(--ease-out-expo)]",
          isDark ? "translate-x-[30px]" : "translate-x-0",
        )}
      />
      <button
        type="button"
        onClick={(e) => switchTo("light", e)}
        aria-pressed={!isDark}
        aria-label="Light mode"
        className={cn(
          "relative z-10 inline-flex size-[30px] items-center justify-center rounded-full transition-colors duration-300",
          !isDark ? "text-bg" : "text-fg-muted hover:text-fg",
        )}
      >
        <Sun aria-hidden className="size-3.5" />
      </button>
      <button
        type="button"
        onClick={(e) => switchTo("dark", e)}
        aria-pressed={isDark}
        aria-label="Dark mode"
        className={cn(
          "relative z-10 inline-flex size-[30px] items-center justify-center rounded-full transition-colors duration-300",
          isDark ? "text-bg" : "text-fg-muted hover:text-fg",
        )}
      >
        <Moon aria-hidden className="size-3.5" />
      </button>
    </div>
  );
}
