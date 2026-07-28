import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export type Stat = {
  value: string;
  label: string;
};

/**
 * Números institucionais em faixa horizontal.
 *
 * Layout: 2 colunas até `lg`, 4 colunas a partir daí. As divisórias seguem a
 * grade, verticais entre colunas, horizontal apenas na quebra de linha do
 * layout de 2 colunas.
 */
export function StatsBar({ stats }: { stats: readonly Stat[] }) {
  return (
    <section
      aria-label="A Desenvol em números"
      className="border-b border-hairline"
    >
      <Container>
        <Reveal>
          <dl className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={cn(
                  "flex flex-col gap-1.5 py-8 md:py-10",
                  index % 2 === 1 && "border-l border-hairline pl-6",
                  index >= 2 && "border-t border-hairline lg:border-t-0",
                  index % 2 === 0 &&
                    index > 0 &&
                    "lg:border-l lg:border-hairline lg:pl-6",
                )}
              >
                {/* A ordem visual põe o número acima do rótulo; o DOM mantém
                    dt antes de dd, como a semântica de <dl> exige. */}
                <dt className="eyebrow order-2">{stat.label}</dt>
                <dd className="order-1 font-display text-4xl font-medium tracking-[-0.03em] text-ink md:text-[2.75rem]">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
