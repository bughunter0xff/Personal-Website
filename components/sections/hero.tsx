"use client";

import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useRef, type CSSProperties } from "react";
import { site, yearsResearching, cves, programs } from "@/content";
import { SplitText } from "@/components/motion/split-text";
import { ButtonLink } from "@/components/ui/button";

/** Inline delay for the CSS entrance animations (see `.rise-soft` in globals.css). */
const delay = (s: number) => ({ "--delay": `${s}s` }) as CSSProperties;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const meta = [
    `${String(cves.length).padStart(2, "0")} CVEs`,
    `Researching since ${site.researchingSince}`,
    ...programs,
    site.availability,
    "Coordinated disclosure",
  ];

  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-10 pt-32 md:pb-16"
    >
      {/* Accent glow, very restrained */}
      <div
        aria-hidden
        className="fade-in pointer-events-none absolute -top-1/4 right-[-20%] -z-10 size-[70vmin] rounded-full bg-accent/15 blur-[120px] dark:bg-accent/10"
        style={delay(0.6)}
      />

      {/* Subtle parallax on scroll; starts at rest so SSR output is identical. */}
      <m.div style={{ y, opacity }} className="container-x">
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

        <h1 id="hero-title" className="display text-[clamp(3.25rem,13vw,11.5rem)]">
          <SplitText text="Dipesh" as="span" className="block" delay={0.25} />
          <SplitText text="Thakur" as="span" className="block text-fg-muted" delay={0.45} />
        </h1>

        <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-12 md:items-end">
          <p
            className="rise-soft text-pretty text-xl leading-snug tracking-tight text-fg md:col-span-7 md:text-2xl lg:text-[1.75rem]"
            style={delay(0.85)}
          >
            {site.positioning}
          </p>

          <div
            className="rise-soft flex flex-wrap items-center gap-3 md:col-span-5 md:justify-end"
            style={delay(1)}
          >
            <ButtonLink href="#writeups">Read my research</ButtonLink>
            <ButtonLink href="#contact" variant="secondary">
              Get in touch
            </ButtonLink>
          </div>
        </div>
      </m.div>

      {/* Metadata marquee */}
      <div className="fade-in mt-14 border-y border-line md:mt-20" style={delay(1.25)} aria-hidden>
        <div className="relative overflow-hidden py-3 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
            {[...meta, ...meta].map((item, i) => (
              <span key={i} className="label-mono flex items-center gap-10 text-fg-muted">
                {item}
                <span className="size-1 rounded-full bg-accent" />
              </span>
            ))}
          </div>
        </div>
      </div>

      <a
        href="#highlights"
        className="fade-in label-mono absolute bottom-6 right-5 hidden items-center gap-2 text-fg-faint transition-colors hover:text-fg md:right-12 lg:flex"
        style={delay(1.5)}
      >
        Scroll
        <ArrowDown aria-hidden className="size-3.5 animate-bounce motion-reduce:animate-none" />
        <span className="sr-only">to highlights</span>
      </a>
      <span className="sr-only">{yearsResearching} years of research</span>
    </section>
  );
}
