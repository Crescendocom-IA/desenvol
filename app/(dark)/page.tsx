import { CtaBand } from "@/components/sections/cta-band";
import { DualTracks } from "@/components/sections/dual-tracks";
import { HeroDark } from "@/components/sections/hero-dark";
import { MissasDatashowBlock } from "@/components/sections/missas-datashow-block";
import { MissionVisionValues } from "@/components/sections/mission-vision-values";
import { ProductsGrid } from "@/components/sections/products-grid";
import { StatementQuote } from "@/components/sections/statement-quote";
import { StatsBar } from "@/components/sections/stats-bar";
import { homeStatement } from "@/lib/data/institutional";
import { featuredProducts } from "@/lib/data/products";
import { stats } from "@/lib/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Sistemas de gestão para paróquias e empresas",
  description:
    "Desde 1994, a Desenvol Informática desenvolve sistemas de gestão para paróquias, dioceses e tribunais eclesiásticos, e soluções de ERP, NF-e e vendas para empresas. Londrina/PR.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <HeroDark
        eyebrow="Desde 1994 · Londrina, PR"
        title="Sistemas de gestão que servem paróquias e empresas há três décadas."
        titleAccentPart="paróquias e empresas"
        subtitle="Da secretaria paroquial ao balcão da loja, desenvolvemos software de gestão para dois mundos exigentes, com o mesmo compromisso de proximidade e suporte."
        primaryCta={{ label: "Conhecer produtos", href: "#produtos" }}
        secondaryCta={{ label: "Falar com um especialista", href: "/contato" }}
      />

      <StatsBar stats={stats} />

      <DualTracks />

      <div id="produtos" className="scroll-mt-18">
        <ProductsGrid
          eyebrow="Nossos produtos"
          heading="Quatro sistemas, dois universos."
          description="Cada solução nasceu de uma necessidade concreta dos nossos clientes e continua evoluindo com eles."
          products={featuredProducts}
        />
      </div>

      <StatementQuote paragraphs={homeStatement} />

      <MissionVisionValues />

      <MissasDatashowBlock />

      <CtaBand
        heading="Vamos conversar sobre o que sua organização precisa"
        subheading="Conte o seu cenário e indicamos o caminho, sem compromisso."
        ctaLabel="Fale com a Desenvol"
        ctaHref="/contato"
      />
    </>
  );
}
