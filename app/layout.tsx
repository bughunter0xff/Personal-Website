import type { Metadata, Viewport } from "next";
import { fontSans, fontMono } from "@/lib/fonts";
import { site } from "@/content";
import { getSiteUrl } from "@/lib/site-url";
import { Providers } from "@/components/providers";
import { CommandPaletteProvider } from "@/components/command-palette";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { cn } from "@/lib/utils";
import "./globals.css";

const siteUrl = getSiteUrl();
const title = `${site.name} — ${site.role}`;

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: title,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [...site.keywords],
  authors: [{ name: site.name, url: siteUrl.toString() }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl.toString(),
    title,
    description: site.description,
    siteName: site.name,
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
    creator: `@${site.handle}`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0b" },
    { media: "(prefers-color-scheme: light)", color: "#f4f2ec" },
  ],
  colorScheme: "dark light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={cn(fontSans.variable, fontMono.variable, "dark")}
      suppressHydrationWarning
    >
      <body className="min-h-dvh antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-accent-fg"
        >
          Skip to content
        </a>
        <Providers>
          <CommandPaletteProvider>
            <div aria-hidden className="bg-grid" />
            <div aria-hidden className="grain" />
            <Nav />
            <main id="main">{children}</main>
            <Footer />
          </CommandPaletteProvider>
        </Providers>
      </body>
    </html>
  );
}
