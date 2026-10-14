import { contact, site } from "@/content";
import { getSiteUrl } from "@/lib/site-url";
import { Hero } from "@/components/sections/hero";
import { Highlights } from "@/components/sections/highlights";
import { Cves } from "@/components/sections/cves";
import { Writeups } from "@/components/sections/writeups";
import { Focus } from "@/components/sections/focus";
import { Background } from "@/components/sections/background";
import { Contact } from "@/components/sections/contact";

export default function HomePage() {
  const url = getSiteUrl().toString();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    alternateName: site.handle,
    url,
    jobTitle: site.role,
    description: site.positioning,
    email: `mailto:${contact.email}`,
    sameAs: contact.links.filter((l) => l.kind !== "email").map((l) => l.href),
    knowsAbout: [...site.keywords],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // JSON-LD is serialised from our own typed content, not user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <Highlights />
      <Cves />
      <Writeups />
      <Focus />
      <Background />
      <Contact />
    </>
  );
}
