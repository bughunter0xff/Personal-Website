/**
 * Base path of the deployment ("" on Vercel or a custom domain,
 * "/<repo>" on a project GitHub Pages site). Set at build time by the
 * deploy workflow via NEXT_PUBLIC_BASE_PATH. <Link> and metadata routes
 * handle this automatically; use `withBase` for plain <a href> to static
 * files in /public.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBase(path: string): string {
  return `${basePath}${path}`;
}
