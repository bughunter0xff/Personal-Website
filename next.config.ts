import type { NextConfig } from "next";
import { buildCsp } from "./lib/csp";

/**
 * Two deployment targets share this config:
 *
 * - Vercel (default): statically prerendered pages served by Next.js, with
 *   the security headers below applied at the edge.
 * - GitHub Pages (GITHUB_PAGES=true, set by .github/workflows/deploy.yml):
 *   a pure static export under the repository's base path. Pages cannot send
 *   custom headers, so app/layout.tsx emits the CSP and referrer policy as
 *   <meta> tags instead, and *.github.io is on the HSTS preload list.
 */
const isGitHubPages = process.env.GITHUB_PAGES === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const isVercelPreview = process.env.VERCEL_ENV === "preview";

const securityHeaders = [
  { key: "Content-Security-Policy", value: buildCsp({ vercelPreview: isVercelPreview }) },
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
  ...(isGitHubPages ? { output: "export" } : {}),
  ...(basePath ? { basePath } : {}),
  images: {
    // The site ships no raster images; keep the optimizer off so the build
    // stays fully static and portable to any host.
    unoptimized: true,
  },
  ...(isGitHubPages
    ? {}
    : {
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
      }),
};

export default nextConfig;
