import { Container } from "@/components/layout/container";
import { HeroTitle } from "@/components/sections/hero-title";
import { CtaLink, type CtaSpec } from "@/components/ui/cta-link";
import { STAGGER_STEP } from "@/lib/motion";

export type HeroLightProps = {
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
 * Hero das páginas de conteúdo: mesma estrutura do HeroDark, tipografia mais
 * compacta e grade sutil no lugar dos halos.
 *
 * Server Component pelo mesmo motivo do HeroDark, ver a nota em globals.css.
 */
export function HeroLight({
  eyebrow,
  title,
  titleAccentPart,
  subtitle,
  primaryCta,
  secondaryCta,
}: HeroLightProps) {
  return (
    <section
      aria-labelledby="hero-titulo"
      className="grid-faint relative border-b border-hairline"
    >
      <Container className="py-16 md:py-20 lg:py-24">
        <div className="flex max-w-3xl flex-col gap-5">
          <p className="eyebrow rise-in" style={delay(0)}>
            {eyebrow}
          </p>

          <div className="rise-in" style={delay(1)}>
            <HeroTitle
              id="hero-titulo"
              title={title}
              accentPart={titleAccentPart}
              className="text-3xl sm:text-4xl lg:text-[3.25rem] lg:leading-[1.06]"
            />
          </div>

          <p
            className="rise-in max-w-2xl text-ink-soft text-pretty md:text-lg"
            style={delay(2)}
          >
            {subtitle}
          </p>

          {primaryCta || secondaryCta ? (
            <div className="rise-in mt-2 flex flex-wrap gap-3" style={delay(3)}>
              {primaryCta ? (
                <CtaLink {...primaryCta} variant="primary" size="md" />
              ) : null}
              {secondaryCta ? (
                <CtaLink {...secondaryCta} variant="outline" size="md" />
              ) : null}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
