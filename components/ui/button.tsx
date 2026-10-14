import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/motion/magnetic";

type Variant = "primary" | "secondary" | "ghost";

type ButtonLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  variant?: Variant;
  external?: boolean;
  magnetic?: boolean;
  icon?: boolean;
};

const base =
  "group inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium tracking-tight transition-[background-color,color,border-color,transform] duration-300 ease-[var(--ease-out-expo)] active:scale-[0.98]";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-fg hover:bg-fg hover:text-bg border border-transparent",
  secondary:
    "border border-line-strong text-fg hover:border-fg hover:bg-fg hover:text-bg",
  ghost: "text-fg-muted hover:text-fg px-3",
};

export function ButtonLink({
  variant = "primary",
  external,
  magnetic = true,
  icon = variant !== "ghost",
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  const link = (
    <Link
      className={cn(base, variants[variant], className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer me" } : {})}
      {...rest}
    >
      <span>{children}</span>
      {icon ? (
        <ArrowUpRight
          aria-hidden
          className="size-4 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      ) : null}
    </Link>
  );

  return magnetic ? <Magnetic strength={0.25}>{link}</Magnetic> : link;
}
