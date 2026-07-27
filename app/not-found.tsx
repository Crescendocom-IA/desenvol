import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { SiteShell } from "@/components/layout/site-shell";
import { CtaLink } from "@/components/ui/cta-link";
import { navItems } from "@/lib/data/nav";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false, follow: true },
};

/**
 * Vive fora dos route groups, então monta o próprio SiteShell.
 * Usa o tema escuro, como as demais páginas institucionais.
 */
export default function NotFound() {
  return (
    <SiteShell mode="dark">
      <section aria-labelledby="nao-encontrado" className="halo relative">
        <Container className="flex flex-col items-start gap-8 py-24 md:py-32">
          <p className="eyebrow">Erro 404</p>

          <h1
            id="nao-encontrado"
            className="display-tight max-w-2xl font-display text-4xl font-medium text-ink text-balance md:text-6xl"
          >
            Não encontramos esta página
          </h1>

          <p className="max-w-xl text-lg text-ink-soft text-pretty">
            O endereço pode ter mudado no novo site. Tente um dos caminhos
            abaixo ou fale com a nossa equipe.
          </p>

          <div className="flex flex-wrap gap-3">
            <CtaLink label="Voltar à home" href="/" variant="primary" size="lg" />
            <CtaLink
              label="Falar com a Desenvol"
              href="/contato"
              variant="outline"
              size="lg"
            />
          </div>

          <nav aria-label="Seções do site" className="mt-4">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-link underline underline-offset-4"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </section>
    </SiteShell>
  );
}
