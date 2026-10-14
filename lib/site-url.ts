import { site } from "@/content";

/**
 * Canonical site origin for metadata, sitemap and robots.
 * Priority: NEXT_PUBLIC_SITE_URL → Vercel production URL → content.ts.
 */
export function getSiteUrl(): URL {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return new URL(explicit);
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return new URL(`https://${vercel}`);
  return new URL(site.url);
}
