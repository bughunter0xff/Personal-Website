import { createElement, type CSSProperties, type ElementType } from "react";

interface SplitTextProps {
  text: string;
  as?: ElementType;
  className?: string;
  /** Split into "words" or "chars". Characters are grouped per word so lines wrap naturally. */
  by?: "words" | "chars";
  /** Seconds before the first unit starts. */
  delay?: number;
  /** Seconds between each unit. */
  stagger?: number;
}

/**
 * Splits a headline into words/characters and staggers them in on load.
 *
 * Implemented with CSS keyframes (see `.rise` in globals.css) rather than JS
 * so the text paints on first render, before hydration — this keeps LCP fast.
 * `prefers-reduced-motion` disables the animation in CSS.
 *
 * Accessibility: the full string is rendered once for assistive tech and the
 * visual fragments are hidden from the accessibility tree.
 */
export function SplitText({
  text,
  as = "span",
  className,
  by = "chars",
  delay = 0,
  stagger = 0.028,
}: SplitTextProps) {
  const words = text.split(" ");
  let index = 0;

  return createElement(
    as,
    { className },
    <span className="sr-only">{text}</span>,
    words.map((word, wi) => {
      const units = by === "chars" ? Array.from(word) : [word];
      return (
        <span
          key={`${word}-${wi}`}
          aria-hidden
          className="inline-block overflow-hidden whitespace-nowrap pb-[0.08em] align-bottom"
        >
          {units.map((unit, ui) => {
            const i = index++;
            const style = { "--delay": `${(delay + i * stagger).toFixed(3)}s` } as CSSProperties;
            return (
              <span key={`${unit}-${ui}`} className="rise inline-block" style={style}>
                {unit}
              </span>
            );
          })}
          {wi < words.length - 1 ? <span className="inline-block">&nbsp;</span> : null}
        </span>
      );
    }),
  );
}
