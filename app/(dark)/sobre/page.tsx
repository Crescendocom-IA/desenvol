import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { HeroDark } from "@/components/sections/hero-dark";
import { MissionVisionValues } from "@/components/sections/mission-vision-values";
import { aboutCompany, aboutPullQuote } from "@/lib/data/institutional";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "A empresa",
  description:
    "Fundada em 1994 como BYTESOFT e hoje incorporada à Desenvol Informática: trajetória, missão, visão e valores de uma empresa de Londrina/PR.",
  path: "/sobre",
});

export default function SobrePage() {
  return (
    <>
      <HeroDark
        eyebrow="Sobre · Desenvol Informática"
        title="A empresa"
        subtitle="Uma trajetória de três décadas construída sobre parcerias longas, suporte próximo e software que acompanha a rotina real de quem o usa."
        primaryCta={{ label: "Falar com a Desenvol", href: "/contato" }}
      />

      <section
        aria-labelledby="trajetoria-titulo"
        className="border-b border-hairline"
      >
        <Container className="py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-[16rem_1fr] lg:gap-16">
            <Reveal>
              <h2 id="trajetoria-titulo" className="eyebrow lg:sticky lg:top-28">
                Nossa trajetória
              </h2>
            </Reveal>

            <div className="flex max-w-2xl flex-col gap-10">
              {aboutCompany.map((paragraph) => (
                <Reveal key={paragraph.slice(0, 32)}>
                  <p className="text-lg leading-[1.6] text-ink-soft text-pretty md:text-xl">
                    {paragraph}
                  </p>
                </Reveal>
              ))}

              <Reveal>
                <blockquote className="border-l-2 border-brand-accent pl-6">
                  <p className="font-display text-xl leading-[1.35] font-normal text-ink text-pretty md:text-[1.75rem]">
                    {aboutPullQuote}
                  </p>
                </blockquote>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <MissionVisionValues size="lg" />

      <section aria-label="Nosso compromisso" className="border-b border-hairline">
        <Container className="py-16 md:py-20">
          <Reveal>
            <p className="display-tight text-center font-display text-2xl font-medium text-ink text-balance md:text-4xl">
              Desde 1994. Uma empresa. Uma promessa.
            </p>
          </Reveal>
        </Container>
      </section>

      <CtaBand
        heading="Quer conhecer a Desenvol de perto?"
        subheading="Estamos em Londrina, no Paraná, e atendemos organizações em todo o país."
        ctaLabel="Fale conosco"
        ctaHref="/contato"
      />
    </>
  );
}
