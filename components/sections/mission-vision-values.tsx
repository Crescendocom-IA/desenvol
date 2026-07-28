import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { missionVisionValues } from "@/lib/data/institutional";
import { STAGGER_STEP } from "@/lib/motion";
import { cn } from "@/lib/utils";

type MissionVisionValuesProps = {
  /** `lg` amplia a tipografia, usado na página /sobre. */
  size?: "md" | "lg";
  className?: string;
};

export function MissionVisionValues({
  size = "md",
  className,
}: MissionVisionValuesProps) {
  return (
    <section
      aria-labelledby="mvv-titulo"
      className={cn("border-b border-hairline", className)}
    >
      <Container className="py-20 md:py-24">
        <h2 id="mvv-titulo" className="sr-only">
          Missão, visão e valores
        </h2>

        <ul className="grid gap-6 md:grid-cols-3">
          {missionVisionValues.map((entry, index) => (
            <li key={entry.id} className="h-full">
              <Reveal delay={index * STAGGER_STEP} className="h-full">
                <article className="flex h-full flex-col gap-4 rounded-2xl border border-hairline bg-surface p-6 md:p-8">
                  <h3 className="eyebrow">{entry.label}</h3>
                  <p
                    className={cn(
                      "font-display font-normal text-ink text-pretty",
                      size === "lg"
                        ? "text-lg leading-[1.5] md:text-[1.375rem]"
                        : "text-base leading-[1.5] md:text-[1.1875rem]",
                    )}
                  >
                    {entry.text}
                  </p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
