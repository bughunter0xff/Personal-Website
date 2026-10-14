# Dipesh Thakur — personal site

Portfolio for [@bughunter0xff](https://hackerone.com/bughunter0xff), independent security researcher.
Next.js (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion. Fully static, no trackers, no cookies.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build (all routes are prerendered as static)
npm run start      # serve the production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```

Node 20.9+ is required (see `engines` in package.json).

## Update the content

Everything on the page comes from **`content.ts`** at the project root: identity and positioning,
section titles, the bento highlights, CVEs, writeups, focus areas, the timeline, contact links and the
PGP block. Components only render what is declared there, so adding a CVE is a matter of appending an
object to the `cves` array. The file is fully typed; `npm run typecheck` will tell you if a field is missing.

Search the repo for `TODO` to find every placeholder:

- `content.ts` — canonical URL, location, email, LinkedIn slug, sales role dates/company, the three
  placeholder writeups, the advisory URL/date for CVE-2026-24712, and the PGP fingerprint.
- `public/pgp.asc` — replace with your real ASCII-armoured key (`gpg --armor --export <KEY-ID>`).
- `public/.well-known/security.txt` — contact, key URL, canonical URL and the `Expires` date.
- `.env.example` — copy to `.env.local` and set `NEXT_PUBLIC_SITE_URL` (optional on Vercel).

Writeups with `href: undefined` render as "Soon" and are disabled in the command palette, so nothing
links to a dead page while a draft is in progress.

## Deploy to GitHub Pages (current setup)

Every push to `main` runs `.github/workflows/deploy.yml`, which builds a static export with the
repository's base path and publishes it to the `gh-pages` branch, which GitHub Pages serves. The
site lives at **https://bughunter0xff.github.io/Personal-Website/**. If the site does not appear
after the first run, open **Settings → Pages** and set **Source** to **Deploy from a branch**,
branch `gh-pages`, folder `/ (root)`.

Two things are specific to Pages:

- Pages cannot send HTTP headers, so the Content Security Policy and referrer policy are emitted as
  `<meta>` tags instead (`GITHUB_PAGES=true` in the build). `*.github.io` is on the browser HSTS
  preload list, so transport security is covered. Frame-ancestors and the other header-only
  policies apply only on Vercel.
- The base path (`/Personal-Website`) is derived from the repository name. Rename the repository to
  `bughunter0xff.github.io` and the site moves to the root automatically. For a custom domain, add
  a `CNAME` file to `public/` and set the domain under **Settings → Pages**; the workflow then
  builds for the root path too (update `site.url` in `content.ts` as well).

## Deploy to Vercel (alternative)

1. Push the repository to GitHub.
2. In Vercel, **Add New → Project**, import the repo. The Next.js preset is detected automatically;
   no build settings need changing.
3. Optionally set `NEXT_PUBLIC_SITE_URL` to your production domain in **Settings → Environment
   Variables**. Without it the site falls back to Vercel's production URL, then to `site.url` in
   `content.ts`, for canonical links, Open Graph, the sitemap and robots.txt.
4. Add your domain under **Settings → Domains**.

Every route is prerendered at build time (`○ (Static)` in the build output). On Vercel the full set
of security headers in `next.config.ts` is applied at the edge, which is stricter than what Pages
can offer, so Vercel is the better home once you have a custom domain.

## Design decisions

**Accent: signal orange, not lime.** The brief ruled out green-on-black clichés, and electric lime
sits one hue away from terminal green: at a glance, lime text on near-black reads as "hacker site".
Orange has no such baggage, carries the right semantics for disclosure work (signal, alert, caution),
and keeps AA contrast as *text* in both themes with a single token: `#ff5a1f` on `#0a0a0b` in dark,
`#b83c0b` on `#f4f2ec` in light. Lime would have needed a second, darker shade for light mode to pass
contrast at small sizes.

**Type.** Geist Sans is the display and body face, Geist Mono is used only for labels, IDs and
metadata. Both are self-hosted and subset to Latin (`scripts/subset-fonts.sh`), which roughly halves
the bytes on the critical path. Geist is licensed under the SIL OFL 1.1 with no Reserved Font Name;
the license ships alongside the font files in `app/fonts/`. To use Space Grotesk instead, see the
comment in `lib/fonts.ts`.

**Surface.** Near-black `#0a0a0b`, off-white `#f2f0ea`, a fixed 96 px 1 px grid that fades out past
the first viewport, and a static-feeling film grain (an SVG `feTurbulence` tile at ~7% opacity,
`overlay` blend). Dark is the default; the toggle in the nav and in the palette switches to light,
persisted by `next-themes`.

**Hero.** The surname is drawn as an outline that fills on hover, and the whole hero sits on an
interactive dot field (`components/hero-field.tsx`): a 2D-canvas grid of fine dots that are pushed
aside and tinted by the pointer, with a slow ripple while idle. It draws once and stays static on
touch devices and for reduced-motion users, starts only when the browser is idle, and pauses when
off-screen. Under the headline a status strip shows location, a live local-time clock
(`site.timeZone` in `content.ts`), availability and the latest advisory.

**Motion.** Hero text splits into characters and rises in on load; sections reveal on scroll; the
primary buttons are magnetic; cards carry a pointer-following spotlight; the hero has a light scroll
parallax; the bento stats count up; the background timeline draws itself as you scroll; nav links
roll on hover. All of it respects `prefers-reduced-motion`: Framer Motion runs under
`<MotionConfig reducedMotion="user">`, the CSS entrance animations are disabled by a media query, and
the magnetic/spotlight effects ignore touch pointers.

**Cursor and rail.** On fine-pointer devices a small accent dot replaces the native cursor, grows
into a ring over interactive elements and shows a short label (`data-cursor="Read"`) on key links.
It is never enabled on touch devices or for reduced-motion users. Wide screens also get a fixed
left rail with section numbers, the active section and a scroll-progress line.

**Theme switch.** A segmented sun/moon control (the active mode is always highlighted, so the state
is never ambiguous). Switching uses the View Transitions API to reveal the new theme in a circle
growing out of the control; browsers without it, and reduced-motion users, get an instant switch.

**Command palette.** `⌘K` / `Ctrl+K` (or the button in the nav, which doubles as the mobile menu)
opens a palette with sections, writeups, contact links and the theme toggle. It is built on `cmdk` and
loaded lazily after the page is idle, so it never sits on the critical path.

## Performance and security

Lighthouse on the production build, measured locally with `next start` (Vercel's CDN with Brotli and
HTTP/2 generally scores slightly higher):

| Preset  | Performance | Accessibility | Best practices | SEO |
| ------- | ----------- | ------------- | -------------- | --- |
| Desktop | 100         | 100           | 100            | 100 |
| Mobile  | 95          | 100           | 100            | 100 |

Notes on how the scores were reached, in case you change things:

- Hero text uses **transform-only** CSS entrance animations. Text that starts at `opacity: 0` is never
  registered as a Largest Contentful Paint candidate by Chrome, which quietly ruins the LCP metric.
- Framer Motion is loaded through `LazyMotion` with the `m` component and a lazily imported feature
  bundle; the command palette (cmdk + Radix Dialog) is a separate chunk loaded on idle.
- The hero canvas is static on touch devices and starts after `requestIdleCallback`, so it never
  adds to Total Blocking Time on phones.
- Severity and status are always communicated by text; colour is a secondary cue.

Security headers are set in `next.config.ts`: a Content Security Policy, HSTS with preload,
`X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`,
and cross-origin opener/resource policies. Two allowances are deliberate and explained in the file:
`script-src 'unsafe-inline'` (Next.js emits inline bootstrap scripts for static pages and `next-themes`
applies the saved theme before first paint; nonces would require per-request rendering) and
`style-src 'unsafe-inline'` (Framer Motion animates via inline styles). Vercel's preview toolbar is
allowed only when `VERCEL_ENV === "preview"`.

Also shipped: `/.well-known/security.txt` (RFC 9116), `/pgp.asc`, `robots.txt`, `sitemap.xml`,
a web manifest, an Open Graph image generated at build time, and JSON-LD `Person` structured data.

## Project layout

```
content.ts                 ← all copy and data (edit this)
app/
  layout.tsx               ← fonts, metadata, providers, nav/footer shell
  page.tsx                 ← section order + JSON-LD
  globals.css              ← design tokens, grain, grid, entrance keyframes, cmdk styles
  opengraph-image.tsx      ← OG image (next/og)
  sitemap.ts · robots.ts · manifest.ts · icon.svg · not-found.tsx
  fonts/                   ← subset Geist files + license
components/
  sections/                ← hero, highlights, cves, writeups, focus, background, contact
  motion/                  ← reveal, split-text, magnetic, spotlight-card
  ui/                      ← button, section-heading, severity-badge, copy-button, theme-toggle,
                             count-up, local-time, glyphs
  command-palette.tsx      ← provider + ⌘K shortcut (lazy-loads command-palette-dialog.tsx)
  hero-field.tsx           ← interactive canvas dot field
  cursor.tsx · section-rail.tsx · nav.tsx · footer.tsx · providers.tsx
lib/                       ← fonts, motion variants, site URL, utils
public/                    ← .well-known/security.txt, pgp.asc
scripts/subset-fonts.sh    ← regenerate app/fonts after upgrading `geist`
```
