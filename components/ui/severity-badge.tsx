import type { Severity } from "@/content";
import { cn } from "@/lib/utils";

/**
 * Severity is communicated by text first; the dot tone is a secondary cue
 * so we stay within the single-accent palette.
 */
const tone: Record<Severity, string> = {
  Critical: "bg-accent shadow-[0_0_12px_var(--accent)]",
  High: "bg-accent",
  Medium: "bg-fg",
  Low: "bg-fg-muted",
  Informational: "bg-fg-faint",
};

export function SeverityBadge({ severity, className }: { severity: Severity; className?: string }) {
  return (
    <span
      className={cn(
        "label-mono inline-flex items-center gap-2 rounded-full border border-line px-2.5 py-1.5 text-fg-muted",
        className,
      )}
    >
      <span aria-hidden className={cn("size-1.5 rounded-full", tone[severity])} />
      {severity}
    </span>
  );
}
