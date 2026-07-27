import {
  BarChart3,
  Boxes,
  Receipt,
  ScrollText,
  ShoppingCart,
  Wallet,
} from "lucide-react";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { HeroLight } from "@/components/sections/hero-light";
import { NarrativeBlocks } from "@/components/sections/narrative-blocks";
import { erpContent } from "@/lib/data/commercial";
import { STAGGER_STEP } from "@/lib/motion";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "ERP Desenvol",
  description:
    "Sistema ERP que atende de forma integrada vendas, estoque e financeiro, com emissão de notas e cupons fiscais e uma ampla gama de relatórios detalhados.",
  path: "/sistemas-comerciais/erp",
});

/** Setores citados no texto do cliente — nada foi acrescentado à lista. */
const coveredAreas = [
  {
    name: "Vendas",
    icon: ShoppingCart,
    text: "Do pedido ao fechamento, integrado ao estoque e ao financeiro.",
  },
  {
    name: "Estoque",
    icon: Boxes,
    text: "Movimentação e saldo atualizados a cada operação registrada.",
  },
  {
    name: "Financeiro",
    icon: Wallet,
    text: "Contas a pagar e a receber conectadas ao movimento comercial.",
  },
  {
    name: "Notas fiscais",
    icon: ScrollText,
    text: "Emissão adequada aos trâmites fiscais exigidos por lei.",
  },
  {
    name: "Cupons fiscais",
    icon: Receipt,
    text: "Emissão no ponto de venda dentro do mesmo sistema.",
  },
  {
    name: "Relatórios",
    icon: BarChart3,
    text: "Ampla gama de relatórios detalhados para gerenciar a informação.",
  },
] as const;

export default function ErpPage() {
  return (
    <>
      <HeroLight
        eyebrow="Sistemas comerciais / ERP"
        title="ERP Desenvol — gestão integrada de ponta a ponta"
        titleAccentPart="gestão integrada"
        subtitle={erpContent.solution}
        primaryCta={{ label: "Falar com a Desenvol", href: "/contato" }}
        secondaryCta={{ label: "Ver áreas atendidas", href: "#areas" }}
      />

      <NarrativeBlocks
        className="bg-bg-subtle"
        blocks={[
          { label: "Contexto", text: erpContent.context },
          { label: "A solução", text: erpContent.solution },
          { label: "A flexibilidade", text: erpContent.flexibility },
        ]}
      />

      <section
        id="areas"
        aria-labelledby="areas-titulo"
        className="scroll-mt-18 border-b border-hairline"
      >
        <Container className="py-16 md:py-20">
          <Reveal className="flex max-w-2xl flex-col gap-4">
            <p className="eyebrow">Áreas atendidas</p>
            <h2
              id="areas-titulo"
              className="font-display text-3xl font-medium text-ink md:text-4xl"
            >
              Um sistema, seis frentes
            </h2>
          </Reveal>

          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {coveredAreas.map((area, index) => (
              <li key={area.name} className="h-full">
                <Reveal delay={(index % 3) * STAGGER_STEP} className="h-full">
                  <article className="flex h-full flex-col gap-3 rounded-2xl border border-hairline bg-surface p-6">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-secondary text-link">
                      <area.icon aria-hidden="true" className="size-5" />
                    </span>
                    <h3 className="font-display text-lg font-medium text-ink">
                      {area.name}
                    </h3>
                    <p className="text-sm text-ink-soft text-pretty">
                      {area.text}
                    </p>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand
        heading="Vamos ver como o ERP encaixa na sua operação"
        subheading="Conte como você trabalha hoje e mostramos o caminho."
        ctaLabel="Falar com a Desenvol"
        ctaHref="/contato"
      />
    </>
  );
}
