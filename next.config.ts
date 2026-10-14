import type { NextConfig } from "next";

/**
 * Security headers.
 *
 * This is a fully static site, so the CSP can be tight. Two notes on the
 * inline allowances:
 *
 * - `script-src 'unsafe-inline'` is required because Next.js emits inline
 *   bootstrap scripts (`self.__next_f.push(...)`) for statically generated
 *   pages, and `next-themes` injects an inline script to apply the saved
 *   theme before first paint (no flash). Nonces would need per-request
 *   rendering, which defeats "fully static". If you ever add a middleware
 *   layer, switch to nonces and drop 'unsafe-inline'.
 * - `style-src 'unsafe-inline'` is required for Framer Motion, which drives
 *   animations through inline `style` attributes.
 *
 * Vercel preview deployments inject the Vercel Toolbar from vercel.live;
 * it is allowed only when VERCEL_ENV === "preview" so production stays strict.
 */
const isVercelPreview = process.env.VERCEL_ENV === "preview";

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isVercelPreview ? " https://vercel.live" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self'${isVercelPreview ? " https://vercel.live wss://ws-us3.pusher.com" : ""}`,
  `frame-src ${isVercelPreview ? "https://vercel.live" : "'none'"}`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "manifest-src 'self'",
  "worker-src 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // The site ships no raster images; keep the optimizer off so the build
    // stays fully static and portable to any host.
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        // security.txt must be served as plain text (RFC 9116 §4).
        source: "/.well-known/security.txt",
        headers: [{ key: "Content-Type", value: "text/plain; charset=utf-8" }],
      },
    ];
  },
};

export default nextConfig;
