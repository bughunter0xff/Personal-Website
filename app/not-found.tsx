import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[100svh] flex-col justify-center py-32">
      <p className="label-mono text-accent">404</p>
      <h1 className="display mt-6 text-6xl md:text-8xl">Nothing here.</h1>
      <p className="mt-6 max-w-md text-fg-muted">
        The page you asked for doesn&apos;t exist. If you followed a link from somewhere, it may have moved.
      </p>
      <div className="mt-10">
        <ButtonLink href="/" variant="secondary">
          Back to the start
        </ButtonLink>
      </div>
    </section>
  );
}
