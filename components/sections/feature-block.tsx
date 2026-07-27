import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { CtaLink } from "@/components/ui/cta-link";
import { cn } from "@/lib/utils";

export type FeatureBlockProps = {
  eyebrow: string;
  title: string;
  description: string;
  /** Pontos curtos listados abaixo da descrição. */
  highlights?: readonly string[];
  icon: LucideIcon;
  ctaLabel: string;
  ctaHref: string;
  /** Alterna o lado da ilustração a cada bloco da sequência. */
  reversed?: boolean;
};

/** Destaque full-width de um produto, usado nas landings de categoria. */
export function FeatureBlock({
  eyebrow,
  title,
  description,
  highlights,
  icon: Icon,
  ctaLabel,
  ctaHref,
  reversed = false,
}: FeatureBlockProps) {
  const headingId = `destaque-${ctaHref.split("/").pop()}`;

  return (
    <section
      aria-labelledby={headingId}
      className="border-b border-hairline last:border-b-0"
    >
      <Container className="py-16 md:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal
            className={cn("flex flex-col gap-5", reversed && "lg:order-2")}
          >
            <p className="eyebrow">{eyebrow}</p>

            <h3
              id={headingId}
              className="font-display text-2xl font-medium text-ink md:text-[2rem] md:leading-[1.12]"
            >
              {title}
            </h3>

            <p className="text-ink-soft text-pretty">{description}</p>

            {highlights?.length ? (
              <ul className="flex flex-col gap-2">
                {highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-2.5 text-sm text-ink-soft"
                  >
                    <ArrowRight
                      aria-hidden="true"
                      className="mt-1 size-3.5 shrink-0 text-link"
                    />
                    {highlight}
                  </li>
                ))}
              </ul>
            ) : null}

            <div className="mt-2">
              <CtaLink label={ctaLabel} href={ctaHref} variant="outline" />
            </div>
          </Reveal>

          <Reveal
            delay={0.08}
            className={cn(reversed && "lg:order-1")}
          >
            {/* Ilustração institucional: o símbolo do produto sobre a
                superfície da marca. Sem imagem de stock. */}
            <div
              aria-hidden="true"
              className="flex aspect-16/10 items-center justify-center rounded-2xl border border-hairline bg-bg-subtle"
            >
              <Icon className="size-20 text-link md:size-24" strokeWidth={1} />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
