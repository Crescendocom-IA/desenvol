import { SiteShell } from "@/components/layout/site-shell";

/** Rotas institucionais: hero de impacto, halos radiais, leitura curta. */
export default function DarkLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <SiteShell mode="dark">{children}</SiteShell>;
}
