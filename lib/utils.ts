export type ClassValue = string | number | null | false | undefined;

/** Tiny class-name joiner (no runtime dependency needed). */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  year: "numeric",
  month: "short",
  day: "2-digit",
  timeZone: "UTC",
});

/** Formats an ISO date (YYYY-MM-DD) as "18 Jun 2026". Stable across SSR/CSR. */
export function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  return Number.isNaN(d.getTime()) ? iso : dateFormatter.format(d);
}
