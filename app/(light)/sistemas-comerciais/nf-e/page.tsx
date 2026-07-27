import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { FeatureList } from "@/components/sections/feature-list";
import { HeroLight } from "@/components/sections/hero-light";
import { NarrativeBlocks } from "@/components/sections/narrative-blocks";
import { nfeContent, nfeFeatures } from "@/lib/data/commercial";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "NF-e — DCOM",
  description:
    "O DCOM oferece todos os recursos necessários para a emissão, envio e gerenciamento de Notas Fiscais Eletrônicas, com impressão do DANFE, envio de XML e alerta de validade do certificado digital.",
  path: "/sistemas-comerciais/nf-e",
});

export default function NfePage() {
  return (
    <>
      <HeroLight
        eyebrow="Sistemas comerciais / NF-e"
        title="NF-e com o DCOM — muito além de um validador"
        titleAccentPart="o DCOM"
        subtitle={nfeContent.solution}
        primaryCta={{ label: "Falar com a Desenvol", href: "/contato" }}
        secondaryCta={{ label: "Ver recursos", href: "#recursos" }}
      />

      <NarrativeBlocks
        className="bg-bg-subtle"
        blocks={[
          { label: "Contexto", text: nfeContent.context },
          { label: "A solução", text: nfeContent.solution },
          { label: "Além do validador", text: nfeContent.flexibility },
        ]}
      />

      <section
        id="recursos"
        aria-labelledby="recursos-titulo"
        className="scroll-mt-18 border-b border-hairline"
      >
        <Container className="py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <Reveal className="flex flex-col gap-4">
              <p className="eyebrow">Recursos</p>
              <h2
                id="recursos-titulo"
                className="font-display text-3xl font-medium text-ink md:text-4xl"
              >
                O que acompanha o DCOM
              </h2>
              <p className="text-ink-soft text-pretty">
                Recursos que resolvem a rotina de quem emite nota todo dia — e o
                alerta que evita a surpresa do certificado vencido.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <FeatureList items={nfeFeatures} />
            </Reveal>
          </div>
        </Container>
      </section>

      <CtaBand
        heading="Precisa emitir NF-e sem sobressalto?"
        subheading="Falamos com a sua contabilidade e ajustamos o DCOM ao seu segmento."
        ctaLabel="Falar com a Desenvol"
        ctaHref="/contato"
      />
    </>
  );
}
