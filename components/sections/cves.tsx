import { ArrowUpRight } from "lucide-react";
import { cves, sections } from "@/content";
import { Reveal } from "@/components/motion/reveal";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { SeverityBadge } from "@/components/ui/severity-badge";
import { formatDate } from "@/lib/utils";

export function Cves() {
  const section = sections.find((s) => s.id === "cves")!;

  return (
    <section id="cves" aria-labelledby="cves-title" className="scroll-mt-24 border-t border-line py-24 md:py-32">
      <div className="container-x">
        <SectionHeading section={section} />
        <ul className="grid gap-3 md:grid-cols-2 md:gap-4">
          {cves.map((cve, i) => (
            <Reveal as="li" key={cve.id} delay={i * 0.06} className="flex">
              <SpotlightCard className="group flex w-full flex-col p-6 md:p-7">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="font-mono text-sm tracking-tight text-fg">{cve.id}</span>
                  <SeverityBadge severity={cve.severity} />
                </div>

                <h3 className="mt-8 text-balance text-2xl font-medium leading-tight tracking-tight md:text-3xl">
                  {cve.product}
                  <span className="text-fg-muted"> — {cve.title}</span>
                </h3>

                <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-line pt-5 text-sm sm:grid-cols-3">
                  {cve.vendor ? (
                    <div>
                      <dt className="label-mono text-fg-faint">Vendor</dt>
                      <dd className="mt-1.5 text-fg-muted">{cve.vendor}</dd>
                    </div>
                  ) : null}
                  <div>
                    <dt className="label-mono text-fg-faint">Disclosed</dt>
                    <dd className="mt-1.5 text-fg-muted">
                      <time dateTime={cve.date}>{formatDate(cve.date)}</time>
                    </dd>
                  </div>
                  {cve.creditedVia ? (
                    <div>
                      <dt className="label-mono text-fg-faint">Credited via</dt>
                      <dd className="mt-1.5 text-fg-muted">{cve.creditedVia}</dd>
                    </div>
                  ) : null}
                </dl>

                <a
                  href={cve.advisoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="Advisory"
                  className="mt-6 inline-flex items-center gap-1.5 self-start text-sm font-medium text-fg underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent"
                >
                  Public advisory
                  <ArrowUpRight
                    aria-hidden
                    className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                  <span className="sr-only"> for {cve.id} (opens in a new tab)</span>
                </a>
              </SpotlightCard>
            </Reveal>
          ))}

          {/* Placeholder slot: hints that the list grows, without faking data */}
          <Reveal as="li" delay={cves.length * 0.06} className="flex">
            <div className="flex w-full flex-col justify-between rounded-2xl border border-dashed border-line p-6 md:p-7">
              <span className="label-mono text-fg-faint">Next</span>
              <p className="mt-8 text-balance text-xl leading-snug tracking-tight text-fg-muted">
                More advisories are in coordinated disclosure and will be listed here once public.
              </p>
            </div>
          </Reveal>
        </ul>
      </div>
    </section>
  );
}
