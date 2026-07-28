/**
 * Dados institucionais da Desenvol Informática.
 * Fonte única para footer, página de contato e metadados.
 */

/**
 * Base de canonical, og:url, sitemap e robots.
 *
 * Lida apenas em contexto de servidor (lib/seo, app/sitemap, app/robots,
 * app/layout), nenhum componente de cliente lê `siteConfig.url`.
 *
 * TODO(cliente): confirmar o domínio final de produção. Até lá,
 * `NEXT_PUBLIC_SITE_URL` corrige o domínio pelo painel da Vercel, sem deploy.
 */
function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  // Em preview, apontar para o domínio de produção quebra o compartilhamento:
  // www.desenvol.com.br ainda serve o site antigo, que não tem /opengraph-image.
  // Usar a URL do próprio deploy faz o preview referenciar a si mesmo.
  if (
    process.env.VERCEL_ENV &&
    process.env.VERCEL_ENV !== "production" &&
    process.env.VERCEL_URL
  ) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "https://www.desenvol.com.br";
}

const siteUrl = resolveSiteUrl();

export const siteConfig = {
  name: "Desenvol Informática",
  shortName: "Desenvol",
  tagline: "Soluções de gestão desde 1994",
  description:
    "Desde 1994, a Desenvol Informática desenvolve sistemas de gestão para paróquias, dioceses e tribunais eclesiásticos, e soluções de ERP, NF-e e vendas para empresas.",
  url: siteUrl,
  foundedYear: 1994,
  locale: "pt-BR",
} as const;

export const contact = {
  address: {
    street: "Rua Pernambuco, 269",
    complement: "Sala 1402",
    district: "Centro",
    city: "Londrina",
    state: "PR",
    postalCode: "86020-120",
    full: "Rua Pernambuco, 269 – Sala 1402 – Centro – Londrina/PR – 86020-120",
  },
  email: "desenvol@desenvol.com.br",
  phone: {
    label: "(43) 3323-4641",
    href: "tel:+554333234641",
  },
  cnpj: "06.059.586/0001-46",
  // TODO(cliente): substituir pelo link real do Joinchat usado no site atual.
  whatsapp: "https://wa.me/554333234641",
  mapsEmbedQuery: "Rua Pernambuco, 269, Centro, Londrina - PR, 86020-120",
} as const;

export const pix = {
  key: contact.cnpj,
  keyType: "CNPJ",
  bank: "Banco Sicredi S/A",
  holder: "Desenvol Informática",
} as const;

/** Números usados na barra de estatísticas da home. Nada aqui é inventado. */
export const stats = [
  { value: "30+", label: "Anos de estrada" },
  { value: "1994", label: "Ano de fundação" },
  { value: "2", label: "Universos atendidos" },
  { value: "∞", label: "Suporte contínuo" },
] as const;
