import { SiteShell } from "@/components/layout/site-shell";

/** Rotas de conteúdo: listas longas, accordions, formulários, leitura extensa. */
export default function LightLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <SiteShell mode="light">{children}</SiteShell>;
}
