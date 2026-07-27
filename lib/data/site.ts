/**
 * Dados institucionais da Desenvol Informática.
 * Fonte única para footer, página de contato e metadados.
 */

export const siteConfig = {
  name: "Desenvol Informática",
  shortName: "Desenvol",
  tagline: "Soluções de gestão desde 1994",
  description:
    "Desde 1994, a Desenvol Informática desenvolve sistemas de gestão para paróquias, dioceses e tribunais eclesiásticos, e soluções de ERP, NF-e e vendas para empresas.",
  // TODO(cliente): confirmar o domínio final de produção antes do deploy.
  url: "https://www.desenvol.com.br",
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
