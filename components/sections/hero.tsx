"use client";

import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef, type CSSProperties } from "react";
import { site, cves } from "@/content";
import { SplitText } from "@/components/motion/split-text";
import { ButtonLink } from "@/components/ui/button";
import { LocalTime } from "@/components/ui/local-time";
import { HeroField } from "@/components/hero-field";

/** Inline delay for the CSS entrance animations (see `.rise-soft` in globals.css). */
const delay = (s: number) => ({ "--delay": `${s}s` }) as CSSProperties;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const latest = cves[0];

  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pt-28"
    >
      <HeroField />

      {/* Accent glow, very restrained */}
      <div
        aria-hidden
        className="fade-in pointer-events-none absolute -top-1/4 right-[-15%] -z-10 size-[70vmin] rounded-full bg-accent/15 blur-[120px] dark:bg-accent/10"
        style={delay(0.6)}
      />

      {/* Vertical handle on the right edge (desktop) */}
      <div
        aria-hidden
        className="fade-in label-mono absolute right-6 top-1/2 hidden -translate-y-1/2 rotate-90 items-center gap-4 text-fg-faint xl:flex"
        style={delay(1.2)}
      >
        <span className="h-px w-16 bg-line-strong" />
        @{site.handle}
        <span className="text-accent">/</span>
        est. {site.researchingSince}
      </div>

      {/* Subtle parallax on scroll; starts at rest so SSR output is identical. */}
      <m.div style={{ y, opacity }} className="container-x pb-12 md:pb-16">
        <div className="rise-soft mb-8 flex flex-wrap items-center gap-x-4 gap-y-2" style={delay(0.1)}>
          <span className="label-mono inline-flex items-center gap-2 text-fg-muted">
            <span className="relative flex size-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-accent/60 motion-reduce:animate-none" />
              <span className="relative size-2 rounded-full bg-accent" />
            </span>
            {site.role}
          </span>
          <span aria-hidden className="hidden h-3 w-px bg-line-strong sm:block" />
          <span className="label-mono text-fg-faint">@{site.handle}</span>
        </div>

        <h1 id="hero-title" className="display text-[clamp(3.5rem,13.5vw,12.5rem)]">
          <SplitText text="Dipesh" as="span" className="block" delay={0.2} />
          <SplitText
            text="Thakur"
            as="span"
            className="text-outline group/outline block hover:text-fg"
            delay={0.4}
          />
        </h1>

        <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-12 md:items-end">
          <p
            className="rise-soft text-pretty text-xl leading-snug tracking-tight text-fg md:col-span-7 md:text-2xl lg:text-[1.75rem]"
            style={delay(0.8)}
          >
            {site.positioning}
          </p>

          <div
            className="rise-soft flex flex-wrap items-center gap-3 md:col-span-5 md:justify-end"
            style={delay(0.95)}
          >
            <ButtonLink href="#writeups" data-cursor="Read">
              Read my research
            </ButtonLink>
            <ButtonLink href="#contact" variant="secondary" data-cursor="Say hi">
              Get in touch
            </ButtonLink>
          </div>
        </div>
      </m.div>

      {/* Status strip */}
      <div className="fade-in border-t border-line" style={delay(1.2)}>
        <dl className="container-x grid grid-cols-2 divide-line md:grid-cols-4 md:divide-x">
          <div className="py-4 pr-4 md:py-5">
            <dt className="label-mono text-fg-faint">Based in</dt>
            <dd className="mt-2 text-sm text-fg">{site.location}</dd>
          </div>
          <div className="py-4 md:py-5 md:pl-6">
            <dt className="label-mono text-fg-faint">Local time</dt>
            <dd className="mt-2 font-mono text-sm text-fg">
              <LocalTime />
            </dd>
          </div>
          <div className="border-t border-line py-4 pr-4 md:border-t-0 md:py-5 md:pl-6">
            <dt className="label-mono text-fg-faint">Status</dt>
            <dd className="mt-2 flex items-center gap-2 text-sm text-fg">
              <span aria-hidden className="size-1.5 rounded-full bg-accent" />
              {site.availability}
            </dd>
          </div>
          <div className="border-t border-line py-4 md:border-t-0 md:py-5 md:pl-6">
            <dt className="label-mono text-fg-faint">Latest advisory</dt>
            <dd className="mt-2 text-sm">
              {latest ? (
                <a
                  href="#cves"
                  className="group inline-flex items-center gap-1.5 font-mono text-fg"
                  data-cursor="View"
                >
                  {latest.id}
                  <ArrowUpRight
                    aria-hidden
                    className="size-3.5 text-fg-faint transition-colors group-hover:text-accent"
                  />
                </a>
              ) : (
                <span className="text-fg-muted">—</span>
              )}
            </dd>
          </div>
        </dl>
      </div>

    </section>
  );
}
