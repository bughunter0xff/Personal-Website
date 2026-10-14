/**
 * Content Security Policy shared by next.config.ts (sent as an HTTP header on
 * Vercel) and app/layout.tsx (emitted as a <meta> tag on GitHub Pages, which
 * cannot set response headers).
 *
 * Two inline allowances are unavoidable on a static Next.js site:
 * - `script-src 'unsafe-inline'`: Next.js emits inline bootstrap scripts for
 *   statically generated pages, and next-themes applies the saved theme
 *   before first paint. Nonces would need per-request rendering.
 * - `style-src 'unsafe-inline'`: Framer Motion animates via inline styles.
 *
 * `frame-ancestors` is ignored in <meta> CSP by design; on Vercel it is
 * enforced through the header plus X-Frame-Options.
 */
export function buildCsp({ meta = false, vercelPreview = false } = {}): string {
  const directives = [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline'${vercelPreview ? " https://vercel.live" : ""}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self'",
    `connect-src 'self'${vercelPreview ? " https://vercel.live wss://ws-us3.pusher.com" : ""}`,
    `frame-src ${vercelPreview ? "https://vercel.live" : "'none'"}`,
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
    "manifest-src 'self'",
    "worker-src 'self'",
    "upgrade-insecure-requests",
  ];
  if (!meta) directives.splice(7, 0, "frame-ancestors 'none'");
  return directives.join("; ");
}
