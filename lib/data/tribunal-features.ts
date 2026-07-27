import {
  Banknote,
  FileSignature,
  FileStack,
  MessageSquare,
  Receipt,
  ScanLine,
  Table,
  Users,
  type LucideIcon,
} from "lucide-react";

/**
 * Sistema para Tribunais Eclesiásticos.
 * Textos transcritos literalmente do material do cliente.
 */

export const tribunalIntro = [
  "O sistema para Tribunais Eclesiásticos foi desenvolvido com o objetivo de facilitar o dia a dia do secretariado do Tribunal Eclesiástico. Utilizando ferramentas modernas, criamos uma solução eficiente para a gestão de processos canônicos. Com o Tribunal Eclesiástico, é possível administrar de forma rápida e objetiva todos os cadastros, etapas do processo, além de gerar documentos integrados com o Microsoft Word. O sistema também permite agendar audiências, depoimentos e controlar toda a parte financeira.",
  "Agilidade, rapidez e facilidade de uso são as principais características deste software!",
] as const;

export type TribunalFeature = {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
};

export const tribunalFeatures: TribunalFeature[] = [
  {
    id: "processos",
    name: "Cadastro Completo dos Dados dos Processos",
    description:
      "Todas as informações pertinentes ao processo podem ser cadastradas para acompanhamento posterior, incluindo: Processos Documentais, Processos Ordinários e Processos Breves.",
    icon: FileStack,
  },
  {
    id: "pessoas",
    name: "Cadastro de Pessoas",
    description:
      "Cadastro das pessoas vinculadas aos processos, incluindo os seguintes tipos: Demandante, Demandado, Testemunhas, Defensor, dentre outros tipos.",
    icon: Users,
  },
  {
    id: "documentos",
    name: "Modelos de Documentos com Microsoft Word",
    description:
      "Geração automática dos dados dos processos para mais de 40 modelos de documentos já catalogados, como: Notificações, Certidões, Etiquetas, AR para correspondências, e diversos outros modelos.",
    icon: FileSignature,
  },
  {
    id: "relatorios",
    name: "Relatórios",
    description:
      "Geração de relatórios com diversos filtros de pesquisa, que vão desde a fase atual do processo até os juízes responsáveis por cada caso.",
    icon: Table,
  },
  {
    id: "digitalizacao",
    name: "Digitalização de Documentos",
    description:
      "Possibilidade de anexar documentos digitalizados diretamente ao processo, agilizando o acesso e a gestão da informação.",
    icon: ScanLine,
  },
  {
    id: "financeiro",
    name: "Controle Financeiro do Tribunal",
    description:
      "Possibilidade de gerenciar todo o movimento financeiro do Tribunal, incluindo contas a pagar, contas a receber, caixa e contas bancárias, com a geração de relatórios financeiros e balancetes sintéticos e analíticos.",
    icon: Banknote,
  },
  {
    id: "boletos",
    name: "Boletos Bancários",
    description:
      "Possibilidade de gerar boletos bancários para a cobrança das taxas de acompanhamento dos processos.",
    icon: Receipt,
  },
  {
    id: "sms",
    name: "Envio de SMS",
    description:
      "Possibilidade de envio de SMS para o Demandante, Demandado, Juízes, entre outros.",
    icon: MessageSquare,
  },
];
