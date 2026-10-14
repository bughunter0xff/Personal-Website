"use client";

import { m } from "framer-motion";
import { highlights, sections, type Highlight } from "@/content";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { fadeUp, stagger } from "@/lib/motion";
import { CountUp } from "@/components/ui/count-up";
import { cn } from "@/lib/utils";

const span: Record<Highlight["size"], string> = {
  lg: "md:col-span-6 md:row-span-2",
  md: "md:col-span-6",
  sm: "md:col-span-3",
};

export function Highlights() {
  const section = sections.find((s) => s.id === "highlights")!;

  return (
    <section id="highlights" aria-labelledby="highlights-title" className="scroll-mt-24 py-24 md:py-32">
      <div className="container-x">
        <SectionHeading section={{ ...section }} />
        <m.ul
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid auto-rows-[minmax(11rem,auto)] grid-cols-1 gap-3 md:grid-cols-12 md:gap-4"
        >
          {highlights.map((h) => (
            <m.li key={h.id} variants={fadeUp} className={cn("flex", span[h.size])}>
              <SpotlightCard className="flex w-full flex-col justify-between p-6 md:p-7">
                <HighlightBody h={h} />
              </SpotlightCard>
            </m.li>
          ))}
        </m.ul>
      </div>
    </section>
  );
}

function HighlightBody({ h }: { h: Highlight }) {
  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <span className="label-mono text-fg-muted">{h.label}</span>
        <span aria-hidden className="size-1.5 rounded-full bg-accent" />
      </div>

      {h.kind === "stat" ? (
        <div className="mt-10">
          <p
            className={cn(
              "display font-medium tabular-nums",
              h.size === "lg" ? "text-[clamp(5rem,14vw,10rem)]" : "text-6xl md:text-7xl",
            )}
          >
            <CountUp value={h.value ?? ""} />
          </p>
        </div>
      ) : null}

      {h.kind === "list" && h.items ? (
        <ul className="mt-8 flex flex-wrap gap-2">
          {h.items.map((item) => (
            <li
              key={item}
              className={cn(
                "rounded-full border border-line px-3 py-1.5 text-sm tracking-tight",
                h.size === "md" ? "text-base md:text-lg md:px-4 md:py-2" : "",
              )}
            >
              {item}
            </li>
          ))}
        </ul>
      ) : null}

      {h.kind === "text" ? (
        <p className="mt-8 text-balance text-2xl leading-tight tracking-tight md:text-3xl">{h.value}</p>
      ) : null}

      {h.caption ? <p className="mt-6 text-sm text-fg-muted">{h.caption}</p> : null}
    </>
  );
}
