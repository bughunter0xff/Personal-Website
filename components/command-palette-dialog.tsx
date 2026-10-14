"use client";

import { Command } from "cmdk";
import {
  ArrowUpRight,
  AtSign,
  BookOpen,
  Briefcase,
  Compass,
  FileText,
  Hash,
  Mail,
  Moon,
  ShieldCheck,
  Sparkles,
  Sun,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useCallback } from "react";
import { contact, sections, writeups, type SectionId } from "@/content";

interface CommandPaletteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// ── UI ───────────────────────────────────────────────────────────────────────

const sectionIcons: Record<SectionId, typeof Hash> = {
  highlights: Sparkles,
  cves: ShieldCheck,
  writeups: BookOpen,
  focus: Compass,
  background: Briefcase,
  contact: Mail,
};

export function CommandPaletteDialog({ open, onOpenChange: setOpen }: CommandPaletteDialogProps) {
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();

  const run = useCallback(
    (fn: () => void) => {
      setOpen(false);
      // Let the dialog close before navigating so focus/scroll land correctly.
      window.setTimeout(fn, 10);
    },
    [setOpen],
  );

  const goTo = (hash: string) =>
    run(() => {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", `#${hash}`);
      } else {
        router.push(`/#${hash}`);
      }
    });

  const openExternal = (href: string) =>
    run(() => {
      if (href.startsWith("mailto:")) {
        window.location.href = href;
      } else {
        window.open(href, "_blank", "noopener,noreferrer");
      }
    });

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Command palette"
      loop
      overlayClassName="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm"
      contentClassName="fixed left-1/2 top-[14vh] z-[80] w-[min(92vw,38rem)] -translate-x-1/2 overflow-hidden rounded-2xl border border-line-strong bg-bg-elevated shadow-2xl shadow-black/40 outline-none"
    >
      <div className="flex items-center border-b border-line">
        <span className="label-mono pl-4 text-fg-faint">⌘K</span>
        <Command.Input placeholder="Jump to a section, writeup or profile…" autoFocus />
      </div>
      <Command.List>
        <Command.Empty>Nothing matches that.</Command.Empty>

        <Command.Group heading="Navigate">
          <Command.Item value="top home hero" onSelect={() => run(() => window.scrollTo({ top: 0, behavior: "smooth" }))}>
            <User className="size-4 shrink-0" aria-hidden />
            <span>Top</span>
          </Command.Item>
          {sections.map((s) => {
            const Icon = sectionIcons[s.id];
            return (
              <Command.Item key={s.id} value={`${s.label} ${s.title}`} onSelect={() => goTo(s.id)}>
                <Icon className="size-4 shrink-0" aria-hidden />
                <span>{s.title}</span>
                <span className="label-mono ml-auto text-fg-faint">{s.index}</span>
              </Command.Item>
            );
          })}
        </Command.Group>

        <Command.Separator />

        <Command.Group heading="Writeups">
          {writeups.map((w) => (
            <Command.Item
              key={w.slug}
              value={`${w.title} ${w.tags.join(" ")}`}
              disabled={!w.href}
              onSelect={() => (w.href ? openExternal(w.href) : undefined)}
            >
              <FileText className="size-4 shrink-0" aria-hidden />
              <span className="truncate">{w.title}</span>
              <span className="label-mono ml-auto shrink-0 text-fg-faint">
                {w.href ? w.readTime : "Soon"}
              </span>
            </Command.Item>
          ))}
        </Command.Group>

        <Command.Separator />

        <Command.Group heading="Contact">
          {contact.links.map((l) => (
            <Command.Item key={l.kind} value={`${l.label} ${l.handle}`} onSelect={() => openExternal(l.href)}>
              {l.kind === "email" ? (
                <Mail className="size-4 shrink-0" aria-hidden />
              ) : (
                <AtSign className="size-4 shrink-0" aria-hidden />
              )}
              <span>{l.label}</span>
              <span className="ml-auto flex items-center gap-1 font-mono text-xs text-fg-faint">
                {l.handle}
                <ArrowUpRight className="size-3" aria-hidden />
              </span>
            </Command.Item>
          ))}
        </Command.Group>

        <Command.Separator />

        <Command.Group heading="Preferences">
          <Command.Item
            value="theme toggle dark light mode"
            onSelect={() => run(() => setTheme(resolvedTheme === "dark" ? "light" : "dark"))}
          >
            {resolvedTheme === "dark" ? (
              <Sun className="size-4 shrink-0" aria-hidden />
            ) : (
              <Moon className="size-4 shrink-0" aria-hidden />
            )}
            <span>Switch to {resolvedTheme === "dark" ? "light" : "dark"} mode</span>
          </Command.Item>
        </Command.Group>
      </Command.List>
      <div className="flex items-center justify-between border-t border-line px-4 py-2.5">
        <span className="label-mono text-fg-faint">↑↓ navigate · ↵ select · esc close</span>
        <span className="label-mono text-fg-faint">bughunter0xff</span>
      </div>
    </Command.Dialog>
  );
}
