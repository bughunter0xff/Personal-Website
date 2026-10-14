import localFont from "next/font/local";

/**
 * Fonts are self-hosted and subset to Latin (see scripts/subset-fonts.sh),
 * which roughly halves the bytes on the critical path. No network is needed
 * at build time.
 *
 * To swap the display face for Space Grotesk instead:
 *   import { Space_Grotesk } from "next/font/google";
 *   export const fontSans = Space_Grotesk({ subsets: ["latin"], variable: "--font-geist-sans" });
 */

/** Display + body face: Geist Sans (variable, 100–900). */
export const fontSans = localFont({
  src: "../app/fonts/Geist-Variable-latin.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

/**
 * Monospace: Geist Mono, used sparingly for labels, IDs and metadata.
 * Only the Regular weight ships because the UI never needs another mono weight.
 */
export const fontMono = localFont({
  src: "../app/fonts/GeistMono-Regular-latin.woff2",
  variable: "--font-geist-mono",
  weight: "400",
  display: "swap",
  adjustFontFallback: false,
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
});
