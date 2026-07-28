import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export type NarrativeBlock = {
  label: string;
  text: string;
};

/**
 * Texto corrido do cliente apresentado em três tempos, contexto, solução e
 * flexibilidade. Cada parágrafo é preservado inteiro; o que muda é o peso
 * tipográfico de cada um.
 */
export function NarrativeBlocks({
  blocks,
  className,
}: {
  blocks: readonly NarrativeBlock[];
  className?: string;
}) {
  return (
    <section
      aria-label="Sobre a solução"
      className={cn("border-b border-hairline", className)}
    >
      <Container className="py-16 md:py-20">
        <div className="flex flex-col gap-12 md:gap-16">
          {blocks.map((block, index) => (
            <Reveal key={block.label}>
              <div className="grid gap-4 md:grid-cols-[12rem_1fr] md:gap-10">
                <h2 className="eyebrow md:pt-2">{block.label}</h2>
                <p
                  className={cn(
                    "max-w-3xl text-pretty",
                    // O segundo bloco é a definição do produto: ganha destaque.
                    index === 1
                      ? "font-display text-xl leading-[1.45] font-normal text-ink md:text-[1.5rem]"
                      : "text-ink-soft md:text-lg",
                  )}
                >
                  {block.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
