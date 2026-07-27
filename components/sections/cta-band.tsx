import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { CtaLink } from "@/components/ui/cta-link";

type CtaBandProps = {
  heading: string;
  subheading?: string;
  ctaLabel: string;
  ctaHref: string;
};

/** Faixa de fechamento, imediatamente antes do footer. */
export function CtaBand({
  heading,
  subheading,
  ctaLabel,
  ctaHref,
}: CtaBandProps) {
  return (
    <section
      aria-labelledby="cta-band-titulo"
      className="halo halo-soft relative overflow-hidden"
    >
      <Container className="py-20 md:py-24">
        <Reveal className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex max-w-2xl flex-col gap-3">
            <h2
              id="cta-band-titulo"
              className="font-display text-3xl font-medium text-ink text-balance md:text-[2.5rem] md:leading-[1.1]"
            >
              {heading}
            </h2>
            {subheading ? (
              <p className="text-ink-soft text-pretty">{subheading}</p>
            ) : null}
          </div>

          <CtaLink
            label={ctaLabel}
            href={ctaHref}
            variant="primary"
            size="lg"
            className="shrink-0"
          />
        </Reveal>
      </Container>
    </section>
  );
}
