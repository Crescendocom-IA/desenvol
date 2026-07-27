import { Church, Gavel } from "lucide-react";

import { CtaBand } from "@/components/sections/cta-band";
import { FeatureBlock } from "@/components/sections/feature-block";
import { HeroDark } from "@/components/sections/hero-dark";
import { MissasDatashowBlock } from "@/components/sections/missas-datashow-block";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Sistemas para a Igreja",
  description:
    "SGPAR, o gerenciador paroquial completo, e o sistema para Tribunais Eclesiásticos: gestão de sacramentos, dízimo, catequese, balancetes e processos canônicos.",
  path: "/sistemas-eclesiais",
});

export default function SistemasEclesiaisPage() {
  return (
    <>
      <HeroDark
        eyebrow="Sistemas eclesiais"
        title="Sistemas para a Igreja"
        titleAccentPart="a Igreja"
        subtitle="Dois sistemas construídos com paróquias, mitras e tribunais: o SGPAR, que administra a vida inteira de uma paróquia, e a solução para Tribunais Eclesiásticos, que organiza o processo canônico do início ao fim."
        primaryCta={{ label: "Falar com um especialista", href: "/contato" }}
      />

      <div>
        <h2 className="sr-only">Nossos sistemas eclesiais</h2>

        <FeatureBlock
          eyebrow="Gerenciador paroquial"
          title="SGPAR — tudo o que sua paróquia precisa, em um único lugar"
          description="Sistema intuitivo e de fácil controle, composto por módulos de Sacramentos, Financeiro, Dízimos, Catequese, Imobilizados e Mitra. Disponível também em versão online, com bancos de dados centralizados que simplificam backups e dão mais segurança às informações."
          highlights={[
            "Livros de Batismo, Crisma e Matrimônio com emissão de certidões e 2ª vias",
            "Caixa, bancos e demonstrativos por Dimensão Social, Missionária e Religiosa",
            "Dizimistas, contribuições, recibos, boletos e etiquetas",
          ]}
          icon={Church}
          ctaLabel="Conhecer o SGPAR"
          ctaHref="/sistemas-eclesiais/sgpar"
        />

        <FeatureBlock
          eyebrow="Processos canônicos"
          title="Tribunal Eclesiástico — agilidade para o secretariado"
          description="Solução para a gestão de processos canônicos: cadastros, etapas do processo, geração de documentos integrada ao Microsoft Word, agendamento de audiências e depoimentos e controle de toda a parte financeira."
          highlights={[
            "Processos documentais, ordinários e breves em um só cadastro",
            "Mais de 40 modelos de documentos gerados automaticamente",
            "Boletos bancários, digitalização de documentos e envio de SMS",
          ]}
          icon={Gavel}
          ctaLabel="Conhecer o sistema"
          ctaHref="/sistemas-eclesiais/tribunal-eclesiastico"
          reversed
        />
      </div>

      <MissasDatashowBlock />

      <CtaBand
        heading="Quer ver esses sistemas na sua paróquia ou diocese?"
        subheading="Apresentamos o sistema, tiramos dúvidas e avaliamos o cenário da sua organização."
        ctaLabel="Falar com a Desenvol"
        ctaHref="/contato"
      />
    </>
  );
}
