import type { Section } from "@/content";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  section: Section;
  className?: string;
}

export function SectionHeading({ section, className }: SectionHeadingProps) {
  return (
    <Reveal className={cn("mb-10 flex flex-col gap-5 md:mb-14", className)}>
      <div className="flex items-center gap-3">
        <span className="label-mono text-accent">{section.index}</span>
        <span aria-hidden className="h-px w-8 bg-line-strong" />
        <span className="label-mono text-fg-muted">{section.label}</span>
      </div>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <h2 id={`${section.id}-title`} className="display text-4xl sm:text-5xl md:text-6xl">{section.title}</h2>
        {section.description ? (
          <p className="max-w-md text-pretty text-base leading-relaxed text-fg-muted md:text-right">
            {section.description}
          </p>
        ) : null}
      </div>
    </Reveal>
  );
}
