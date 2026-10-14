"use client";

import Link from "next/link";
import { Command } from "lucide-react";
import { m, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { sections, site } from "@/content";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useCommandPalette } from "@/components/command-palette";
import { cn } from "@/lib/utils";

export function Nav() {
  const { toggle } = useCommandPalette();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  return (
    <m.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={cn(
          "container-x flex h-16 items-center justify-between transition-colors duration-500",
        )}
      >
        <Link
          href="/"
          className="group flex items-center gap-3"
          aria-label={`${site.name} — home`}
        >
          <span className="relative flex size-8 items-center justify-center rounded-full border border-line-strong bg-bg/70 backdrop-blur">
            <span className="font-mono text-[11px] font-medium tracking-tight">DT</span>
            <span
              aria-hidden
              className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-accent"
            />
          </span>
          <span className="hidden font-mono text-xs text-fg-muted transition-colors group-hover:text-fg sm:inline">
            @{site.handle}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          <div
            className={cn(
              "flex items-center gap-1 rounded-full border px-1.5 py-1 transition-all duration-500",
              scrolled
                ? "border-line bg-bg/70 backdrop-blur-md"
                : "border-transparent",
            )}
          >
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="rounded-full px-3 py-1.5 text-sm text-fg-muted transition-colors hover:bg-accent-soft hover:text-fg"
              >
                {s.label}
              </a>
            ))}
          </div>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            className="label-mono inline-flex h-9 items-center gap-2 rounded-full border border-line bg-bg/70 px-3 text-fg-muted backdrop-blur transition-colors hover:border-fg hover:text-fg"
            aria-label="Open command palette"
            aria-keyshortcuts="Meta+K Control+K"
          >
            <Command aria-hidden className="size-3.5" />
            <span className="hidden sm:inline">K</span>
            <span className="sm:hidden">Menu</span>
          </button>
          <ThemeToggle className="bg-bg/70 backdrop-blur" />
        </div>
      </div>
    </m.header>
  );
}
