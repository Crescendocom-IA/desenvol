import { Download, Presentation } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { HeroLight } from "@/components/sections/hero-light";
import { PixCard } from "@/components/sections/pix-card";
import { CtaLink } from "@/components/ui/cta-link";
import { missasDatashowArchive } from "@/lib/data/external-links";
import { missasDatashow } from "@/lib/data/institutional";
import { pix } from "@/lib/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Missas DataShow",
  description:
    "A Desenvol disponibiliza semanalmente e gratuitamente as Celebrações Litúrgicas em formato PowerPoint para paróquias e comunidades. Baixe os arquivos ou colabore com o projeto.",
  path: "/midia/missas-datashow",
});

export default function MissasDatashowPage() {
  const [work, content, improve, contribute] = missasDatashow.blocks;

  return (
    <>
      <HeroLight
        eyebrow="Mídia / Missas DataShow"
        title="Missas DataShow"
        titleAccentPart="DataShow"
        subtitle={missasDatashow.subtitle}
        primaryCta={{
          label: "Baixar arquivos",
          href: missasDatashowArchive.href,
        }}
      />

      <section
        aria-labelledby="projeto-titulo"
        className="border-b border-hairline"
      >
        <Container className="py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_22rem] lg:gap-16">
            <div className="flex flex-col gap-10">
              <h2 id="projeto-titulo" className="sr-only">
                Sobre o projeto
              </h2>

              <Reveal className="flex flex-col gap-3">
                <h3 className="eyebrow">{work.heading}</h3>
                <p className="text-lg text-ink-soft text-pretty">{work.text}</p>
              </Reveal>

              <Reveal className="flex flex-col gap-3">
                <h3 className="eyebrow">{content.heading}</h3>
                <p className="font-display text-2xl font-medium text-ink md:text-3xl">
                  {content.text}
                </p>
              </Reveal>

              <Reveal className="flex flex-col gap-3">
                <h3 className="eyebrow">{improve.heading}</h3>
                <p className="text-ink-soft text-pretty">{improve.text}</p>
              </Reveal>
            </div>

            <Reveal delay={0.08}>
              <aside
                aria-labelledby="baixar-titulo"
                className="flex flex-col gap-5 rounded-2xl border border-hairline bg-bg-subtle p-6 md:p-8 lg:sticky lg:top-28"
              >
                <span className="flex size-12 items-center justify-center rounded-xl bg-brand-primary text-white">
                  <Presentation aria-hidden="true" className="size-6" />
                </span>

                <h3
                  id="baixar-titulo"
                  className="font-display text-xl font-medium text-ink"
                >
                  Celebrações da semana
                </h3>

                <p className="text-sm text-ink-soft text-pretty">
                  Os arquivos em PowerPoint são publicados semanalmente no nosso
                  repositório.
                </p>

                <CtaLink
                  label="Baixar arquivos"
                  href={missasDatashowArchive.href}
                  variant="primary"
                  icon={<Download aria-hidden="true" />}
                  className="w-full"
                />
              </aside>
            </Reveal>
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="contribua-titulo"
        className="border-b border-hairline bg-bg-subtle"
      >
        <Container className="py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal className="flex flex-col gap-4">
              <p className="eyebrow">{contribute.heading}</p>
              <h2
                id="contribua-titulo"
                className="font-display text-3xl font-medium text-ink md:text-4xl"
              >
                Colabore com o projeto
              </h2>
              <p className="text-ink-soft text-pretty">{contribute.text}</p>
            </Reveal>

            <Reveal delay={0.08} className="flex flex-col gap-4">
              <PixCard className="max-w-none" />

              <dl className="grid gap-4 rounded-2xl border border-hairline bg-surface p-6 sm:grid-cols-2">
                <div className="flex flex-col gap-1">
                  <dt className="eyebrow">Favorecido</dt>
                  <dd className="text-sm text-ink">{pix.holder}</dd>
                </div>
                <div className="flex flex-col gap-1">
                  <dt className="eyebrow">Instituição</dt>
                  <dd className="text-sm text-ink">{pix.bank}</dd>
                </div>
                <div className="flex flex-col gap-1 sm:col-span-2">
                  <dt className="eyebrow">Chave {pix.keyType}</dt>
                  <dd className="font-mono text-sm text-ink select-all">
                    {pix.key}
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </Container>
      </section>

      <CtaBand
        heading="Tem uma sugestão para o projeto?"
        subheading="Nos colocamos à disposição para receber sugestões."
        ctaLabel="Falar com a Desenvol"
        ctaHref="/contato"
      />
    </>
  );
}
