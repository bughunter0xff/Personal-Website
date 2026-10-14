import { ShieldCheck } from "lucide-react";
import { footer, site } from "@/content";
import { LocalTime } from "@/components/ui/local-time";
import { withBase } from "@/lib/base-path";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-x grid gap-10 py-12 md:grid-cols-12 md:py-16">
        <div className="md:col-span-5">
          <p className="display text-3xl">{site.name}</p>
          <p className="mt-2 font-mono text-xs text-fg-muted">@{site.handle}</p>
          <p className="mt-6 font-mono text-xs text-fg-muted">
            <span className="label-mono mr-3 text-fg-faint">Local time</span>
            <LocalTime />
          </p>
        </div>

        <div className="md:col-span-7">
          <div className="flex items-start gap-3 rounded-2xl border border-line p-5">
            <ShieldCheck aria-hidden className="mt-0.5 size-4 shrink-0 text-accent" />
            <div>
              <p className="label-mono text-fg-muted">Responsible disclosure</p>
              <p className="mt-2 text-pretty text-sm leading-relaxed text-fg-muted">{footer.disclosure}</p>
              <a
                href={withBase(footer.securityTxtPath)}
                className="mt-3 inline-block font-mono text-xs text-fg underline decoration-line-strong underline-offset-4 hover:decoration-accent"
              >
                {footer.securityTxtPath}
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-line pt-6 text-xs text-fg-faint md:col-span-12 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="font-mono">
            Static · No trackers · No cookies ·{" "}
            <kbd className="rounded border border-line px-1 py-0.5">⌘K</kbd> to navigate
          </p>
        </div>
      </div>
    </footer>
  );
}
