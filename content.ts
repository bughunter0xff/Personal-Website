/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  content.ts — the single source of truth for everything on the site.
 *
 *  Edit this file to update copy, CVEs, writeups, focus areas, the timeline
 *  and contact details. Components only render what is declared here.
 *  Anything marked TODO is placeholder content to replace.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type Severity = "Critical" | "High" | "Medium" | "Low" | "Informational";

export type SectionId =
  | "highlights"
  | "cves"
  | "writeups"
  | "focus"
  | "background"
  | "contact";

export interface Section {
  id: SectionId;
  index: string;
  label: string;
  title: string;
  description?: string;
}

export interface Cve {
  id: string;
  product: string;
  vendor?: string;
  title: string;
  severity: Severity;
  /** ISO date (YYYY-MM-DD) of public disclosure / advisory. */
  date: string;
  creditedVia?: string;
  advisoryUrl: string;
}

export interface Writeup {
  slug: string;
  title: string;
  summary: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  readTime: string;
  tags: string[];
  /** External or internal link. Leave undefined while a draft is in progress. */
  href?: string;
}

export interface FocusArea {
  index: string;
  title: string;
  description: string;
}

export interface TimelineItem {
  period: string;
  role: string;
  org: string;
  description: string;
  current?: boolean;
}

export interface ContactLink {
  label: string;
  handle: string;
  href: string;
  kind: "email" | "hackerone" | "bugcrowd" | "github" | "linkedin" | "other";
}

export interface Highlight {
  id: string;
  /** Grid span classes are chosen by the Bento component based on `size`. */
  size: "lg" | "md" | "sm";
  label: string;
  kind: "stat" | "list" | "text";
  value?: string;
  caption?: string;
  items?: string[];
}

// ── Identity ─────────────────────────────────────────────────────────────────

export const site = {
  name: "Dipesh Thakur",
  handle: "bughunter0xff",
  role: "Independent Security Researcher",
  positioning:
    "Independent security researcher focused on command and argument injection in developer infrastructure.",
  description:
    "Dipesh Thakur (bughunter0xff) is an independent security researcher focused on command and argument injection in developer infrastructure. CVEs, acknowledgements, research writeups and responsible disclosure.",
  // TODO: replace with your canonical production domain.
  url: "https://dipeshthakur.com",
  location: "TODO: City, Country",
  availability: "Open to collaboration and private programs",
  researchingSince: 2016,
  keywords: [
    "security researcher",
    "bug bounty",
    "command injection",
    "argument injection",
    "developer infrastructure",
    "source code auditing",
    "CVE",
    "HackerOne",
    "Bugcrowd",
  ],
} as const;

// ── Sections (order on the page + command palette) ───────────────────────────

export const sections: Section[] = [
  {
    id: "highlights",
    index: "01",
    label: "Highlights",
    title: "At a glance",
  },
  {
    id: "cves",
    index: "02",
    label: "Acknowledgements",
    title: "CVEs & acknowledgements",
    description:
      "Publicly disclosed vulnerabilities, coordinated with vendors and platforms.",
  },
  {
    id: "writeups",
    index: "03",
    label: "Research",
    title: "Research & writeups",
    description:
      "Long-form notes on vulnerability classes, tooling and the occasional root-cause deep dive.",
  },
  {
    id: "focus",
    index: "04",
    label: "Focus",
    title: "Focus areas",
  },
  {
    id: "background",
    index: "05",
    label: "Background",
    title: "Background",
  },
  {
    id: "contact",
    index: "06",
    label: "Contact",
    title: "Get in touch",
  },
];

// ── Highlights (bento grid) ──────────────────────────────────────────────────

export const programs = ["HackerOne", "Bugcrowd", "Apple Security Bounty"];
export const certificationsInProgress = ["OSCP", "OSWE", "CEH"];

// ── CVEs & acknowledgements ──────────────────────────────────────────────────

export const cves: Cve[] = [
  {
    id: "CVE-2026-24712",
    vendor: "Northern.tech",
    product: "CFEngine",
    title: "Privilege escalation",
    severity: "Medium",
    // TODO: confirm the public advisory date.
    date: "2026-02-10",
    creditedVia: "HackerOne",
    // TODO: replace with the vendor advisory or HackerOne report URL once public.
    advisoryUrl: "https://www.cve.org/CVERecord?id=CVE-2026-24712",
  },
];

// ── Research & writeups ──────────────────────────────────────────────────────
// TODO: replace these three placeholder entries with real posts.

export const writeups: Writeup[] = [
  {
    slug: "argument-injection-in-ci-runners",
    title: "Argument injection in CI runners: when flags become payloads",
    summary:
      "How user-controlled strings reach argv in build pipelines, why the “--” separator is not a complete fix, and a methodology for finding these sinks in large codebases.",
    date: "2026-06-18",
    readTime: "11 min",
    tags: ["Argument injection", "CI/CD", "Methodology"],
    // TODO: link to the published article.
    href: undefined,
  },
  {
    slug: "auditing-config-management-agents",
    title: "Auditing configuration management agents for local privilege escalation",
    summary:
      "A source-level walkthrough of the trust boundaries inside agents like CFEngine, Puppet and Salt, and where privileged file operations tend to go wrong.",
    date: "2026-03-02",
    readTime: "9 min",
    tags: ["Source code auditing", "Privilege escalation", "Linux"],
    href: undefined,
  },
  {
    slug: "shell-metacharacters-developer-tooling",
    title: "Shell metacharacters in developer tooling: a field guide",
    summary:
      "A catalogue of the subtle ways CLIs, git hooks and package managers shell out, with real-world patterns that turned into command injection.",
    date: "2025-11-20",
    readTime: "7 min",
    tags: ["Command injection", "Developer infrastructure"],
    href: undefined,
  },
];

// ── Focus areas ──────────────────────────────────────────────────────────────

export const focusAreas: FocusArea[] = [
  {
    index: "01",
    title: "Source code auditing",
    description:
      "Manual, hypothesis-driven review of large codebases. Finding the sinks first, then working backwards to the inputs that reach them.",
  },
  {
    index: "02",
    title: "Injection vulnerabilities",
    description:
      "Command and argument injection, template injection and the places where strings quietly become instructions.",
  },
  {
    index: "03",
    title: "Web application security",
    description:
      "Authentication and authorisation flaws, server-side logic bugs and the business-logic edge cases scanners never reach.",
  },
  {
    index: "04",
    title: "Developer infrastructure",
    description:
      "CI/CD systems, build tooling, package managers and configuration management: the software that developers trust by default.",
  },
];

// ── Background (timeline) ────────────────────────────────────────────────────

export const timeline: TimelineItem[] = [
  {
    period: "2016 — Present",
    role: "Independent Security Researcher",
    org: "HackerOne · Bugcrowd · Apple Security Bounty",
    description:
      "Vulnerability research and coordinated disclosure, with a focus on injection flaws in developer infrastructure.",
    current: true,
  },
  {
    // TODO: add dates and a line about the company / sector.
    period: "TODO: 2019 — 20XX",
    role: "Enterprise Technology Sales",
    org: "TODO: Company",
    description:
      "Worked with enterprise engineering and security teams on technology adoption. Learned how organisations actually buy, deploy and operate software.",
  },
  {
    period: "2017 — 2019",
    role: "Full-Stack Developer",
    org: "Siemens",
    description:
      "Built and shipped production web applications. Formed an attacker's instinct for how developer workflows and infrastructure fail.",
  },
];

// ── Contact ──────────────────────────────────────────────────────────────────

export const contact = {
  // TODO: replace with your real address.
  email: "hello@dipeshthakur.com",
  links: [
    {
      label: "Email",
      handle: "hello@dipeshthakur.com",
      href: "mailto:hello@dipeshthakur.com",
      kind: "email",
    },
    {
      label: "HackerOne",
      handle: "@bughunter0xff",
      href: "https://hackerone.com/bughunter0xff",
      kind: "hackerone",
    },
    {
      label: "Bugcrowd",
      handle: "@bughunter0xff",
      href: "https://bugcrowd.com/bughunter0xff",
      kind: "bugcrowd",
    },
    {
      label: "GitHub",
      handle: "@bughunter0xff",
      href: "https://github.com/bughunter0xff",
      kind: "github",
    },
    {
      // TODO: confirm the LinkedIn slug.
      label: "LinkedIn",
      handle: "/in/dipeshthakur",
      href: "https://www.linkedin.com/in/dipeshthakur",
      kind: "linkedin",
    },
  ] satisfies ContactLink[],
  pgp: {
    // TODO: replace with your real key. The placeholder below is deliberately
    // invalid so it cannot be mistaken for a real fingerprint.
    fingerprint: "0000 0000 0000 0000 0000  0000 0000 0000 0000 0000",
    keyId: "0x00000000",
    algorithm: "ed25519",
    // Place your ASCII-armoured public key at /public/pgp.asc.
    keyUrl: "/pgp.asc",
  },
};

// ── Footer ───────────────────────────────────────────────────────────────────

export const footer = {
  disclosure:
    "Found something on this site? I practise and expect coordinated disclosure. Report issues to the address above, encrypted with the key above where possible. I aim to acknowledge within 72 hours.",
  securityTxtPath: "/.well-known/security.txt",
};

// ── Derived helpers ──────────────────────────────────────────────────────────

export const yearsResearching = Math.max(
  1,
  new Date().getFullYear() - site.researchingSince,
);

export const highlights: Highlight[] = [
  {
    id: "cves",
    size: "lg",
    kind: "stat",
    label: "CVEs assigned",
    value: String(cves.length).padStart(2, "0"),
    caption: "Publicly disclosed, vendor coordinated",
  },
  {
    id: "programs",
    size: "md",
    kind: "list",
    label: "Programs",
    items: programs,
    caption: "Platforms and vendors I've reported through",
  },
  {
    id: "years",
    size: "sm",
    kind: "stat",
    label: "Years researching",
    value: `${yearsResearching}+`,
    caption: `Since ${site.researchingSince}`,
  },
  {
    id: "certs",
    size: "sm",
    kind: "list",
    label: "Certifications in progress",
    items: certificationsInProgress,
    caption: "Currently preparing",
  },
  {
    id: "focus",
    size: "md",
    kind: "text",
    label: "Current focus",
    value: "Command & argument injection in developer infrastructure",
    caption: "CI/CD · build tooling · config management",
  },
];
