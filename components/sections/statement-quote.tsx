import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/lib/data/site";

/**
 * Bloco institucional em citação grande. Quebra o ritmo dos cards e devolve
 * um respiro humano no meio da página.
 */
export function StatementQuote({
  paragraphs,
}: {
  paragraphs: readonly string[];
}) {
  return (
    <section
      aria-label="Nosso compromisso com os clientes"
      className="border-b border-hairline"
    >
      <Container className="py-24 md:py-32">
        <Reveal>
          <figure className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
            <blockquote className="flex flex-col gap-6">
              {paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className="font-display text-xl leading-[1.45] font-normal text-ink text-pretty italic md:text-[1.625rem]"
                >
                  {paragraph}
                </p>
              ))}
            </blockquote>
            <figcaption className="eyebrow">{siteConfig.name}</figcaption>
          </figure>
        </Reveal>
      </Container>
    </section>
  );
}
