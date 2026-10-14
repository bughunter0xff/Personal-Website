import { ArrowUpRight, KeyRound } from "lucide-react";
import { contact, sections, site } from "@/content";
import { Reveal } from "@/components/motion/reveal";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { ButtonLink } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { SectionHeading } from "@/components/ui/section-heading";
import { withBase } from "@/lib/base-path";

export function Contact() {
  const section = sections.find((s) => s.id === "contact")!;
  const profiles = contact.links.filter((l) => l.kind !== "email");

  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-24 border-t border-line py-24 md:py-32">
      <div className="container-x">
        <SectionHeading section={section} />

        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="max-w-2xl text-balance text-3xl leading-tight tracking-tight md:text-5xl">
              For private programs, collaboration on research, or to report a security
              issue, email is best.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonLink href={`mailto:${contact.email}`} external={false} data-cursor="Email">
                {contact.email}
              </ButtonLink>
              <CopyButton value={contact.email} label="Copy email address" className="h-[46px] px-4" />
            </div>
            <p className="mt-4 text-sm text-fg-muted">{site.availability}.</p>
          </Reveal>

          <div className="grid gap-3 lg:col-span-5">
            <Reveal delay={0.1}>
              <ul className="grid grid-cols-2 gap-3">
                {profiles.map((l) => (
                  <li key={l.kind} className="flex">
                    <SpotlightCard className="w-full">
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer me"
                        data-cursor="Open"
                        className="group flex h-full flex-col justify-between gap-6 p-5"
                      >
                        <span className="flex items-start justify-between">
                          <span className="label-mono text-fg-muted">{l.label}</span>
                          <ArrowUpRight
                            aria-hidden
                            className="size-4 text-fg-faint transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                          />
                        </span>
                        <span className="font-mono text-sm tracking-tight">{l.handle}</span>
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    </SpotlightCard>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.2}>
              <SpotlightCard className="p-5">
                <div className="flex items-center justify-between gap-4">
                  <span className="label-mono inline-flex items-center gap-2 text-fg-muted">
                    <KeyRound aria-hidden className="size-3.5" />
                    PGP · {contact.pgp.algorithm} · {contact.pgp.keyId}
                  </span>
                  <CopyButton
                    value={contact.pgp.fingerprint.replace(/\s+/g, "")}
                    label="Copy PGP fingerprint"
                  />
                </div>
                <pre className="mt-5 overflow-x-auto whitespace-pre-wrap break-all font-mono text-[13px] leading-relaxed tracking-wide text-fg sm:text-sm">
                  {contact.pgp.fingerprint}
                </pre>
                <a
                  href={withBase(contact.pgp.keyUrl)}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm text-fg-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-fg hover:decoration-accent"
                >
                  Download public key
                  <ArrowUpRight aria-hidden className="size-3.5" />
                </a>
              </SpotlightCard>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
