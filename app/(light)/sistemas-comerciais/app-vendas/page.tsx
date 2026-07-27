import { Container } from "@/components/layout/container";
import { RestrictedAccessCard } from "@/components/sections/restricted-access-card";
import { buildMetadata } from "@/lib/seo";

export const metadata = {
  ...buildMetadata({
    title: "App Vendas",
    description:
      "Área restrita do aplicativo de vendas da Desenvol Informática. O acesso é liberado aos clientes mediante contato com a nossa equipe.",
    path: "/sistemas-comerciais/app-vendas",
  }),
  // Página sem conteúdo público: não faz sentido indexá-la.
  robots: { index: false, follow: true },
};

export default function AppVendasPage() {
  return (
    <Container className="flex min-h-[60vh] items-center justify-center py-20">
      <RestrictedAccessCard />
    </Container>
  );
}
