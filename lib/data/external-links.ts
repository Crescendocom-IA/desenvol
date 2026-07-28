/**
 * Links externos herdados do site atual.
 * As URLs são preservadas exatamente como estão hoje, não reescrever.
 */

export type ExternalLink = {
  label: string;
  href: string;
  description?: string;
};

/** Área "Acesso a clientes", os portais SGPAR ONLINE e correlatos. */
export const clientPortals: ExternalLink[] = [
  {
    label: "Plantão do dízimo",
    href: "https://desenvol.com.br/plantao/",
    description: "Lançamento de contribuições em plantão",
  },
  {
    label: "Mitras",
    href: "https://desenvol.com.br/mitras/",
    description: "Acesso ao módulo gerencial das mitras",
  },
  {
    label: "Entidades",
    href: "https://desenvol.com.br/entidades/",
    description: "Acesso das entidades cadastradas",
  },
  {
    label: "Eventos",
    href: "https://web.desenvol.com.br:8021/eventos/?PRI=DIVE",
    description: "Inscrições e controle de eventos",
  },
  {
    label: "SBC – Canonistas",
    href: "https://desenvol.com.br/canonistas/",
    description: "Sociedade Brasileira de Canonistas",
  },
  {
    label: "Desenvol Sign",
    href: "https://app.plugsign.com.br/signin/?secure=true",
    description: "Assinatura digital de documentos",
  },
];

/** Instalador do atendimento remoto. O servidor original cuida do download. */
export const supportDownload: ExternalLink = {
  label: "Suporte técnico",
  href: "https://www.desenvol.com.br/suporte.exe",
  description: "Baixe o atendimento remoto",
};

/** Repositório atual das celebrações em PowerPoint. */
export const missasDatashowArchive: ExternalLink = {
  label: "Baixar arquivos",
  href: "https://www.desenvol.com.br/missas-datashow/",
  description: "Celebrações litúrgicas semanais em PowerPoint",
};
