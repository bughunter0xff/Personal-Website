import { sections, timeline } from "@/content";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

export function Background() {
  const section = sections.find((s) => s.id === "background")!;

  return (
    <section id="background" aria-labelledby="background-title" className="scroll-mt-24 border-t border-line py-24 md:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading section={section} className="mb-6 lg:mb-0" />
          <Reveal delay={0.1} className="hidden lg:block">
            <p className="max-w-sm text-pretty leading-relaxed text-fg-muted">
              A developer first, then a seller of enterprise software, now a researcher. Each
              chapter taught me a different way that software fails in production.
            </p>
          </Reveal>
        </div>

        <ol className="relative lg:col-span-7">
          <span aria-hidden className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px bg-line" />
          {timeline.map((item, i) => (
            <Reveal
              as="li"
              key={`${item.role}-${item.period}`}
              delay={i * 0.08}
              amount={0.3}
              className="relative grid gap-3 pb-12 pl-10 last:pb-0 md:grid-cols-12 md:gap-6"
            >
                <span
                  aria-hidden
                  className={cn(
                    "absolute left-0 top-1.5 flex size-[15px] items-center justify-center rounded-full border bg-bg",
                    item.current ? "border-accent" : "border-line-strong",
                  )}
                >
                  <span
                    className={cn("size-[5px] rounded-full", item.current ? "bg-accent" : "bg-fg-faint")}
                  />
                </span>
                <div className="md:col-span-4">
                  <p className="label-mono text-fg-muted">{item.period}</p>
                  {item.current ? (
                    <p className="label-mono mt-2 text-accent">Current</p>
                  ) : null}
                </div>
                <div className="md:col-span-8">
                  <h3 className="text-xl font-medium leading-tight tracking-tight md:text-2xl">{item.role}</h3>
                  <p className="mt-1 text-fg-muted">{item.org}</p>
                  <p className="mt-4 max-w-prose text-pretty text-sm leading-relaxed text-fg-muted">
                    {item.description}
                  </p>
                </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
