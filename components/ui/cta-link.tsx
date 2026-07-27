import type { Route } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { ctaVariants, type CtaVariantProps } from "@/lib/cta";
import { cn } from "@/lib/utils";

export type CtaSpec = {
  label: string;
  /** Rota interna, âncora na própria página (`#id`) ou URL absoluta. */
  href: string;
};

type CtaLinkProps = CtaSpec & {
  className?: string;
  /** Ícone renderizado antes do rótulo. */
  icon?: React.ReactNode;
} & CtaVariantProps;

const isInternalRoute = (href: string) =>
  href.startsWith("/") && !href.startsWith("//");

/**
 * Único ponto do projeto onde uma URL é convertida para `Route`.
 *
 * Rotas internas passam por <Link> (prefetch e navegação client-side);
 * âncoras e URLs externas usam <a>, que é o elemento correto para elas.
 */
export function CtaLink({
  label,
  href,
  className,
  icon,
  variant,
  size,
}: CtaLinkProps) {
  const classes = cn(ctaVariants({ variant, size }), className);

  if (isInternalRoute(href)) {
    return (
      <Link href={href as Route} className={classes}>
        {icon}
        {label}
      </Link>
    );
  }

  const isExternal = href.startsWith("http");

  return (
    <a
      href={href}
      className={classes}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
    >
      {icon}
      {label}
      {isExternal ? (
        <>
          <ArrowUpRight aria-hidden="true" />
          <span className="sr-only">(abre em nova aba)</span>
        </>
      ) : null}
    </a>
  );
}
