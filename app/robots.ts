import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

// Allow `output: "export"` builds; the route is static either way.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl().toString().replace(/\/$/, "");
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${base}/sitemap.xml`,
  };
}
