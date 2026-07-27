import Link from "next/link";
import { ArrowRight, Building2, Church } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { STAGGER_STEP } from "@/lib/motion";

const tracks = [
  {
    href: "/sistemas-eclesiais",
    icon: Church,
    title: "Para paróquias e dioceses",
    text: "Sacramentos, dízimo, catequese, balancetes e processos canônicos — cada rotina da secretaria em um sistema só, também em versão online.",
  },
  {
    href: "/sistemas-comerciais",
    icon: Building2,
    title: "Para empresas",
    text: "Vendas, estoque, financeiro e emissão fiscal integrados, com relatórios que sustentam a decisão do dia a dia.",
  },
] as const;

/** Divide os dois universos atendidos logo no topo da home. */
export function DualTracks() {
  return (
    <section aria-labelledby="dois-universos" className="border-b border-hairline">
      <Container className="py-20 md:py-24">
        <h2 id="dois-universos" className="sr-only">
          Dois universos atendidos
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {tracks.map((track, index) => (
            <Reveal key={track.href} delay={index * STAGGER_STEP}>
              <Link
                href={track.href}
                className="group flex h-full flex-col gap-5 rounded-2xl border border-hairline bg-linear-to-b from-secondary to-transparent p-6 transition-colors duration-200 ease-brand hover:border-brand-accent md:p-8"
              >
                <span className="flex size-12 items-center justify-center rounded-xl bg-brand-primary text-white">
                  <track.icon aria-hidden="true" className="size-6" />
                </span>

                <h3 className="font-display text-2xl font-medium text-ink md:text-[1.75rem]">
                  {track.title}
                </h3>

                <p className="text-ink-soft text-pretty">{track.text}</p>

                <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-medium text-link">
                  Ver soluções
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform duration-200 ease-brand group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
