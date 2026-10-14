import { focusAreas, sections } from "@/content";
import { Reveal } from "@/components/motion/reveal";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { SectionHeading } from "@/components/ui/section-heading";

export function Focus() {
  const section = sections.find((s) => s.id === "focus")!;

  return (
    <section id="focus" aria-labelledby="focus-title" className="scroll-mt-24 border-t border-line py-24 md:py-32">
      <div className="container-x">
        <SectionHeading section={section} />
        <ul className="grid gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-4">
          {focusAreas.map((f, i) => (
            <Reveal as="li" key={f.index} delay={i * 0.07} className="flex">
              <SpotlightCard className="flex w-full flex-col p-6">
                <span className="label-mono text-accent">{f.index}</span>
                <h3 className="mt-16 text-balance text-xl font-medium leading-tight tracking-tight md:mt-20">
                  {f.title}
                </h3>
                <p className="mt-3 text-pretty text-sm leading-relaxed text-fg-muted">{f.description}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
