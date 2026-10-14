"use client";

import dynamic from "next/dynamic";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/**
 * The palette UI (cmdk + Radix Dialog) is loaded lazily so it stays off the
 * critical path: it is fetched when the browser is idle, or immediately on
 * the first ⌘K / click, whichever comes first.
 */
const CommandPaletteDialog = dynamic(
  () => import("./command-palette-dialog").then((mod) => mod.CommandPaletteDialog),
  { ssr: false },
);

interface PaletteContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
}

const PaletteContext = createContext<PaletteContextValue | null>(null);

export function useCommandPalette(): PaletteContextValue {
  const ctx = useContext(PaletteContext);
  if (!ctx) throw new Error("useCommandPalette must be used inside <CommandPaletteProvider />");
  return ctx;
}

export function CommandPaletteProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const toggle = useCallback(() => setOpen((v) => !v), []);

  // Keyboard shortcut: ⌘K on macOS, Ctrl+K elsewhere.
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        toggle();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [toggle]);

  // Warm the palette chunk once the main thread is idle.
  useEffect(() => {
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    const mark = () => setReady(true);
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(mark, { timeout: 3000 });
      return () => w.cancelIdleCallback?.(id);
    }
    const id = window.setTimeout(mark, 2000);
    return () => window.clearTimeout(id);
  }, []);

  const value = useMemo(() => ({ open, setOpen, toggle }), [open, toggle]);

  return (
    <PaletteContext.Provider value={value}>
      {children}
      {ready || open ? <CommandPaletteDialog open={open} onOpenChange={setOpen} /> : null}
    </PaletteContext.Provider>
  );
}
