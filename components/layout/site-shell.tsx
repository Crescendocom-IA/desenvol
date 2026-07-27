import { Footer } from "@/components/layout/footer";
import { Nav } from "@/components/layout/nav";
import { WhatsAppFloat } from "@/components/layout/whatsapp-float";

type SiteShellProps = {
  /**
   * Tema da rota. Não há toggle: cada route group fixa o seu.
   * O <html> herda os mesmos tokens via `:has()` em globals.css, o que
   * cobre a área de overscroll e o conteúdo em portal.
   */
  mode: "dark" | "light";
  children: React.ReactNode;
};

export function SiteShell({ mode, children }: SiteShellProps) {
  return (
    <div data-mode={mode} className="flex min-h-dvh flex-col bg-bg text-ink">
      <a
        href="#conteudo"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-100 focus-visible:rounded-lg focus-visible:bg-brand-primary focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:text-white"
      >
        Pular para o conteúdo
      </a>
      <Nav mode={mode} />
      <main id="conteudo" className="flex-1">
        {children}
      </main>
      <Footer mode={mode} />
      <WhatsAppFloat />
    </div>
  );
}
