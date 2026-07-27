import { Download, Presentation } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { PixCard } from "@/components/sections/pix-card";
import { CtaLink } from "@/components/ui/cta-link";
import { missasDatashowArchive } from "@/lib/data/external-links";
import { missasDatashow } from "@/lib/data/institutional";

/**
 * Apresentação do projeto gratuito das celebrações em PowerPoint.
 * Reaproveitado na home e na landing dos sistemas eclesiais.
 */
export function MissasDatashowBlock() {
  const [work, content, improve] = missasDatashow.blocks;

  return (
    <section
      aria-labelledby="missas-datashow-titulo"
      className="border-b border-hairline bg-bg-subtle"
    >
      <Container className="py-20 md:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_22rem] lg:gap-16">
          <Reveal className="flex flex-col gap-5">
            <p className="eyebrow">Projeto gratuito</p>

            <h2
              id="missas-datashow-titulo"
              className="font-display text-3xl font-medium text-ink md:text-4xl"
            >
              {missasDatashow.title}
            </h2>

            <p className="text-lg text-ink-soft">{missasDatashow.subtitle}</p>

            <p className="max-w-xl text-ink-soft text-pretty">{work.text}</p>

            <p className="max-w-xl text-ink-soft text-pretty">{improve.text}</p>

            <p className="font-display text-xl font-medium text-ink">
              {content.text}
            </p>

            <div className="mt-2 flex flex-wrap gap-3">
              <CtaLink
                label="Baixar arquivos"
                href={missasDatashowArchive.href}
                variant="primary"
                icon={<Download aria-hidden="true" />}
              />
              <CtaLink
                label="Ver o projeto"
                href="/midia/missas-datashow"
                variant="outline"
              />
            </div>
          </Reveal>

          <Reveal delay={0.08} className="flex flex-col gap-4">
            <div
              aria-hidden="true"
              className="flex aspect-4/3 items-center justify-center rounded-2xl border border-hairline bg-surface"
            >
              {/* TODO(cliente): substituir por uma captura real de um slide da
                  celebração assim que o material for enviado. */}
              <Presentation className="size-16 text-link" />
            </div>
            <PixCard className="max-w-none" />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
