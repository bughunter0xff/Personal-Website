import type { SVGProps } from "react";

/** Hand-drawn line glyphs for the focus areas. Keyed by the area's index. */
const common: SVGProps<SVGSVGElement> = {
  viewBox: "0 0 40 40",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export function Glyph({ id, className }: { id: string; className?: string }) {
  switch (id) {
    case "01": // source code auditing: brackets with a scan line and a lens
      return (
        <svg {...common} className={className}>
          <path d="M12 8 6 20l6 12" />
          <path d="M28 8l6 12-6 12" />
          <circle cx="20" cy="18" r="5" />
          <path d="M23.5 21.5 28 26" />
          <path d="M6 32h28" strokeDasharray="2 3" />
        </svg>
      );
    case "02": // injection: a pipe with a foreign wedge entering it
      return (
        <svg {...common} className={className}>
          <path d="M6 14h28M6 26h28" />
          <path d="M20 4v6M20 30v6" />
          <path d="m14 20 6-5 6 5-6 5z" />
          <path d="M30 6l4-4" />
        </svg>
      );
    case "03": // web application security: shield over a grid
      return (
        <svg {...common} className={className}>
          <path d="M20 4 32 9v9c0 8-5 14-12 18-7-4-12-10-12-18V9z" />
          <path d="M8 18h24M20 4v32M12 11c3 4 13 4 16 0" strokeDasharray="2 3" />
        </svg>
      );
    default: // developer infrastructure: stacked layers with a pipeline
      return (
        <svg {...common} className={className}>
          <rect x="6" y="6" width="28" height="7" rx="2" />
          <rect x="6" y="16.5" width="28" height="7" rx="2" />
          <rect x="6" y="27" width="28" height="7" rx="2" />
          <path d="M11 9.5h3M11 20h3M11 30.5h3" />
          <path d="M30 9.5v21" strokeDasharray="2 3" />
        </svg>
      );
  }
}
