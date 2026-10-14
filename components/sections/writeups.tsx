import { ArrowUpRight } from "lucide-react";
import { sections, writeups } from "@/content";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { formatDate } from "@/lib/utils";

export function Writeups() {
  const section = sections.find((s) => s.id === "writeups")!;

  return (
    <section id="writeups" aria-labelledby="writeups-title" className="scroll-mt-24 border-t border-line py-24 md:py-32">
      <div className="container-x">
        <SectionHeading section={section} />
        <ol className="border-t border-line">
          {writeups.map((w, i) => {
            const inner = (
              <>
                <div className="relative flex items-baseline gap-6 md:col-span-3 md:flex-col md:gap-2">
                  <span
                    aria-hidden
                    className="display pointer-events-none absolute -top-3 right-0 hidden select-none text-7xl text-fg-faint/25 transition-colors duration-500 group-hover:text-accent/40 md:block"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <time dateTime={w.date} className="label-mono text-fg-muted">
                    {formatDate(w.date)}
                  </time>
                  <span className="label-mono text-fg-faint">{w.readTime} read</span>
                </div>

                <div className="md:col-span-8">
                  <h3 className="text-balance text-2xl font-medium leading-tight tracking-tight transition-colors group-hover:text-accent md:text-3xl">
                    {w.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-fg-muted">{w.summary}</p>
                  <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tags">
                    {w.tags.map((t) => (
                      <li key={t} className="label-mono rounded-full border border-line px-2.5 py-1.5 text-fg-muted">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="hidden md:col-span-1 md:flex md:justify-end">
                  {w.href ? (
                    <span className="flex size-10 items-center justify-center rounded-full border border-line transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-fg">
                      <ArrowUpRight aria-hidden className="size-4" />
                    </span>
                  ) : (
                    <span className="label-mono mt-1 text-fg-faint">Soon</span>
                  )}
                </div>
              </>
            );

            const className =
              "group grid gap-4 border-b border-line py-8 md:grid-cols-12 md:gap-8 md:py-10";

            return (
              <Reveal as="li" key={w.slug} delay={i * 0.05} amount={0.2}>
                  {w.href ? (
                    <a
                      href={w.href}
                      data-cursor="Read"
                      className={className}
                      {...(w.href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {inner}
                    </a>
                  ) : (
                    <article className={className} aria-label={`${w.title} (coming soon)`}>
                      {inner}
                    </article>
                  )}
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
