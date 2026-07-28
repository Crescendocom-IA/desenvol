import { Container } from "@/components/layout/container";
import { HeroTitle } from "@/components/sections/hero-title";
import { CtaLink, type CtaSpec } from "@/components/ui/cta-link";
import { STAGGER_STEP } from "@/lib/motion";

export type HeroDarkProps = {
  eyebrow: string;
  title: string;
  titleAccentPart?: string;
  subtitle: string;
  primaryCta?: CtaSpec;
  secondaryCta?: CtaSpec;
};

/** Atraso escalonado da entrada, na ordem de leitura. */
const delay = (index: number) => ({
  animationDelay: `${index * STAGGER_STEP}s`,
});

/**
 * Server Component: a entrada é feita com a animação CSS `rise-in`, não com
 * `motion`. Ver a nota em globals.css — o título do hero é o elemento de LCP
 * e não pode depender de hidratação para ficar visível.
 */
export function HeroDark({
  eyebrow,
  title,
  titleAccentPart,
  subtitle,
  primaryCta,
  secondaryCta,
}: HeroDarkProps) {
  return (
    <section
      aria-labelledby="hero-titulo"
      className="halo relative overflow-hidden border-b border-hairline"
    >
      <Container className="py-20 md:py-28 lg:py-32">
        <div className="flex max-w-3xl flex-col gap-6">
          <p className="eyebrow rise-in" style={delay(0)}>
            {eyebrow}
          </p>

          <div className="rise-in" style={delay(1)}>
            <HeroTitle
              id="hero-titulo"
              title={title}
              accentPart={titleAccentPart}
            />
          </div>

          <p
            className="rise-in max-w-2xl text-lg text-ink-soft text-pretty"
            style={delay(2)}
          >
            {subtitle}
          </p>

          {primaryCta || secondaryCta ? (
            <div className="rise-in mt-2 flex flex-wrap gap-3" style={delay(3)}>
              {primaryCta ? (
                <CtaLink {...primaryCta} variant="primary" size="lg" />
              ) : null}
              {secondaryCta ? (
                <CtaLink {...secondaryCta} variant="outline" size="lg" />
              ) : null}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
