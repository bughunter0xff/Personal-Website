"use client";

import { useEffect, useState } from "react";
import { site } from "@/content";

const formatter = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
  timeZone: site.timeZone,
});

function offsetLabel(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: site.timeZone,
    timeZoneName: "shortOffset",
  }).formatToParts(date);
  return parts.find((p) => p.type === "timeZoneName")?.value ?? "";
}

/** Live clock in the researcher's time zone. Renders a stable placeholder on the server. */
export function LocalTime({ className }: { className?: string }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <time
      className={className}
      dateTime={now?.toISOString()}
      suppressHydrationWarning
      aria-label={now ? `Local time ${formatter.format(now)} ${offsetLabel(now)}` : "Local time"}
    >
      <span className="tabular-nums">{now ? formatter.format(now) : "--:--:--"}</span>
      <span className="ml-2 text-fg-faint">{now ? offsetLabel(now) : ""}</span>
    </time>
  );
}
