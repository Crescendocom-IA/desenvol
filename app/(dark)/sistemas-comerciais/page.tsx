import {
  BadgeCheck,
  Clock,
  FileText,
  Handshake,
  Headset,
  ReceiptText,
  ShoppingCart,
} from "lucide-react";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { FeatureBlock } from "@/components/sections/feature-block";
import { HeroDark } from "@/components/sections/hero-dark";
import { STAGGER_STEP } from "@/lib/motion";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Sistemas para empresas",
  description:
    "ERP Desenvol, emissão de NF-e com o DCOM e app de vendas: gestão integrada de vendas, estoque, financeiro e documentos fiscais para varejo e distribuição.",
  path: "/sistemas-comerciais",
});

const differentials = [
  {
    icon: Clock,
    title: "30 anos de estrada",
    text: "Software de gestão desenvolvido e mantido pela mesma equipe desde 1994.",
  },
  {
    icon: Handshake,
    title: "Atendimento próximo",
    text: "Relacionamento direto, sem camadas de intermediários entre você e quem desenvolve.",
  },
  {
    icon: Headset,
    title: "Suporte técnico",
    text: "Atendimento remoto disponível para resolver a pendência no momento em que ela aparece.",
  },
  {
    icon: ReceiptText,
    title: "Integração fiscal",
    text: "Emissão de notas e cupons fiscais adequada aos trâmites exigidos por lei.",
  },
] as const;

export default function SistemasComerciaisPage() {
  return (
    <>
      <HeroDark
        eyebrow="Sistemas comerciais"
        title="Gestão integrada para quem vende todos os dias"
        titleAccentPart="quem vende"
        subtitle="Do pedido à nota fiscal: um ERP que conecta vendas, estoque e financeiro, uma solução dedicada à NF-e e um aplicativo para a equipe em campo."
        primaryCta={{ label: "Falar com um especialista", href: "/contato" }}
      />

      <div>
        <h2 className="sr-only">Nossos sistemas comerciais</h2>

        <FeatureBlock
          eyebrow="Gestão integrada"
          title="ERP Desenvol — completo, flexível e imediato"
          description="Solução que se adapta a diferentes tipos de empresa e atende de forma integrada setores como vendas, estoque e financeiro, além de realizar a emissão de notas e cupons fiscais e oferecer uma ampla gama de relatórios detalhados."
          highlights={[
            "Vendas, estoque e financeiro em um fluxo único",
            "Emissão de notas e cupons fiscais",
            "Relatórios detalhados para o gerenciamento da informação",
          ]}
          icon={BadgeCheck}
          ctaLabel="Conhecer o ERP"
          ctaHref="/sistemas-comerciais/erp"
        />

        <FeatureBlock
          eyebrow="Documentos fiscais"
          title="NF-e — o DCOM vai além de um validador"
          description="Sistema dedicado à emissão, envio e gerenciamento de Notas Fiscais Eletrônicas, adequado às exigências fiscais e a empresas de diversos segmentos."
          highlights={[
            "Emissão a partir do cadastro de produtos e clientes",
            "Impressão do DANFE e envio do XML por e-mail",
            "Controle de notas não enviadas e alerta de validade do certificado",
          ]}
          icon={FileText}
          ctaLabel="Conhecer o DCOM"
          ctaHref="/sistemas-comerciais/nf-e"
          reversed
        />

        <FeatureBlock
          eyebrow="Equipe em campo"
          title="App Vendas — acesso restrito a clientes"
          description="Aplicativo de vendas disponibilizado aos clientes da Desenvol. O acesso é liberado mediante contato com a nossa equipe."
          icon={ShoppingCart}
          ctaLabel="Solicitar acesso"
          ctaHref="/sistemas-comerciais/app-vendas"
        />
      </div>

      <section
        aria-labelledby="diferenciais-titulo"
        className="border-b border-hairline bg-bg-subtle"
      >
        <Container className="py-20 md:py-24">
          <Reveal className="flex max-w-2xl flex-col gap-4">
            <p className="eyebrow">Por que a Desenvol</p>
            <h2
              id="diferenciais-titulo"
              className="font-display text-3xl font-medium text-ink md:text-4xl"
            >
              Diferenciais Desenvol
            </h2>
          </Reveal>

          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {differentials.map((item, index) => (
              <li key={item.title} className="h-full">
                <Reveal delay={index * STAGGER_STEP} className="h-full">
                  <article className="flex h-full flex-col gap-3 rounded-2xl border border-hairline bg-surface p-6">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-secondary text-link">
                      <item.icon aria-hidden="true" className="size-5" />
                    </span>
                    <h3 className="font-display text-lg font-medium text-ink">
                      {item.title}
                    </h3>
                    <p className="text-sm text-ink-soft text-pretty">
                      {item.text}
                    </p>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand
        heading="Vamos entender o processo da sua empresa"
        subheading="Conte como você trabalha hoje e mostramos onde o sistema encaixa."
        ctaLabel="Falar com a Desenvol"
        ctaHref="/contato"
      />
    </>
  );
}
