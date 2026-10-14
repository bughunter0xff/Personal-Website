import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

// Allow `output: "export"` builds; the route is static either way.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl().toString().replace(/\/$/, "");
  return [
    {
      url: `${base}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
