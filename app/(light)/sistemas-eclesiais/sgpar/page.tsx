import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { HeroLight } from "@/components/sections/hero-light";
import { ModuleAccordion } from "@/components/sections/module-accordion";
import { ModuleCard } from "@/components/sections/module-card";
import { SgparIntegrationDiagram } from "@/components/sections/sgpar-integration-diagram";
import {
  sgparDetails,
  sgparIntro,
  sgparModules,
  sgparSeal,
} from "@/lib/data/sgpar-modules";
import { STAGGER_STEP } from "@/lib/motion";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "SGPAR, Gerenciador Paroquial",
  description:
    "Sistema de gestão paroquial com módulos de Sacramentos, Financeiro, Dízimo, Catequese, Imobilizados e MITRA. Disponível também em versão online, com base de dados centralizada.",
  path: "/sistemas-eclesiais/sgpar",
});

export default function SgparPage() {
  const [introOverview, introOnline] = sgparIntro;

  return (
    <>
      <HeroLight
        eyebrow="Sistemas eclesiais / SGPAR"
        title="SGPAR, Gerenciador Paroquial"
        titleAccentPart="Gerenciador Paroquial"
        subtitle={introOverview}
        primaryCta={{ label: "Falar com a Desenvol", href: "/contato" }}
        secondaryCta={{ label: "Ver módulos", href: "#modulos" }}
      />

      <section
        aria-labelledby="selo-titulo"
        className="border-b border-hairline bg-bg-subtle"
      >
        <Container className="py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <Reveal>
              <h2
                id="selo-titulo"
                className="font-display text-2xl font-medium text-ink text-balance md:text-[2rem] md:leading-[1.15]"
              >
                {sgparSeal.title}
              </h2>
            </Reveal>

            <Reveal delay={0.08} className="flex flex-col gap-5">
              <p className="text-ink-soft text-pretty">{sgparSeal.text}</p>
              <p className="text-ink-soft text-pretty">{introOnline}</p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section
        id="modulos"
        aria-labelledby="modulos-titulo"
        className="scroll-mt-18 border-b border-hairline"
      >
        <Container className="py-16 md:py-20">
          <Reveal className="flex max-w-2xl flex-col gap-4">
            <p className="eyebrow">Os módulos</p>
            <h2
              id="modulos-titulo"
              className="font-display text-3xl font-medium text-ink md:text-4xl"
            >
              Seis módulos, uma base de dados
            </h2>
          </Reveal>

          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sgparModules.map((module, index) => (
              <li key={module.id} className="h-full">
                <Reveal
                  delay={(index % 3) * STAGGER_STEP}
                  className="h-full"
                >
                  <ModuleCard
                    name={module.name}
                    description={module.description}
                    icon={module.icon}
                  />
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section
        aria-labelledby="detalhes-titulo"
        className="border-b border-hairline bg-bg-subtle"
      >
        <Container className="py-16 md:py-20">
          <Reveal className="flex max-w-2xl flex-col gap-4">
            <p className="eyebrow">Características detalhadas</p>
            <h2
              id="detalhes-titulo"
              className="font-display text-3xl font-medium text-ink md:text-4xl"
            >
              Tudo o que cada módulo faz
            </h2>
            <p className="text-ink-soft text-pretty">
              Abra um módulo para ver a relação completa de cadastros,
              consultas, emissões e relatórios.
            </p>
          </Reveal>

          <div className="mt-10">
            <ModuleAccordion details={sgparDetails} />
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="integracao-titulo"
        className="border-b border-hairline"
      >
        <Container className="py-16 md:py-20">
          <Reveal className="flex max-w-2xl flex-col gap-4">
            <p className="eyebrow">Resumo para integração dos módulos</p>
            <h2
              id="integracao-titulo"
              className="font-display text-3xl font-medium text-ink md:text-4xl"
            >
              Os módulos conversam entre si
            </h2>
            <p className="text-ink-soft text-pretty">
              O lançamento do dízimo encerra no financeiro, a catequese alimenta
              o dízimo catequético e os balancetes chegam prontos à
              contabilidade, porque tudo compartilha a mesma base.
            </p>
          </Reveal>

          <Reveal delay={0.08} className="mt-12">
            <SgparIntegrationDiagram />
          </Reveal>
        </Container>
      </section>

      <CtaBand
        heading="Quer ver o SGPAR na sua paróquia? Fale conosco"
        subheading="Agendamos uma apresentação e avaliamos o cenário da sua secretaria."
        ctaLabel="Falar com a Desenvol"
        ctaHref="/contato"
      />
    </>
  );
}
