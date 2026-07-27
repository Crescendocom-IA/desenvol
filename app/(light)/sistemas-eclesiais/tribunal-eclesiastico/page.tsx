import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { HeroLight } from "@/components/sections/hero-light";
import { ModuleCard } from "@/components/sections/module-card";
import { tribunalFeatures, tribunalIntro } from "@/lib/data/tribunal-features";
import { STAGGER_STEP } from "@/lib/motion";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Tribunal Eclesiástico",
  description:
    "Sistema para a gestão de processos canônicos: cadastros, etapas do processo, mais de 40 modelos de documentos integrados ao Microsoft Word, agendamento de audiências e controle financeiro.",
  path: "/sistemas-eclesiais/tribunal-eclesiastico",
});

export default function TribunalEclesiasticoPage() {
  const [intro, claim] = tribunalIntro;

  return (
    <>
      <HeroLight
        eyebrow="Sistemas eclesiais / Tribunal Eclesiástico"
        title="Sistema para Tribunais Eclesiásticos"
        titleAccentPart="Tribunais Eclesiásticos"
        subtitle={intro}
        primaryCta={{ label: "Falar com a Desenvol", href: "/contato" }}
        secondaryCta={{ label: "Ver características", href: "#caracteristicas" }}
      />

      <section
        aria-label="Principais características do software"
        className="border-b border-hairline bg-bg-subtle"
      >
        <Container className="py-14 md:py-16">
          <Reveal>
            <p className="mx-auto max-w-3xl text-center font-display text-xl font-normal text-ink text-balance md:text-[1.75rem] md:leading-[1.3]">
              {claim}
            </p>
          </Reveal>
        </Container>
      </section>

      <section
        id="caracteristicas"
        aria-labelledby="caracteristicas-titulo"
        className="scroll-mt-18 border-b border-hairline"
      >
        <Container className="py-16 md:py-20">
          <Reveal className="flex max-w-2xl flex-col gap-4">
            <p className="eyebrow">O que o sistema faz</p>
            <h2
              id="caracteristicas-titulo"
              className="font-display text-3xl font-medium text-ink md:text-4xl"
            >
              Do cadastro do processo ao boleto da taxa
            </h2>
            <p className="text-ink-soft text-pretty">
              Cada etapa do rito acompanhada no mesmo sistema, com os documentos
              saindo prontos.
            </p>
          </Reveal>

          <ul className="mt-10 grid gap-6 md:grid-cols-2">
            {tribunalFeatures.map((feature, index) => (
              <li key={feature.id} className="h-full">
                <Reveal delay={(index % 2) * STAGGER_STEP} className="h-full">
                  <ModuleCard
                    name={feature.name}
                    description={feature.description}
                    icon={feature.icon}
                  />
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand
        heading="Quer conhecer o sistema do seu tribunal?"
        subheading="Apresentamos a solução ao secretariado e avaliamos o volume de processos."
        ctaLabel="Falar com a Desenvol"
        ctaHref="/contato"
      />
    </>
  );
}
