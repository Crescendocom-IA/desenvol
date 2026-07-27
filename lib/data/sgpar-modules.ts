import {
  BookOpenCheck,
  Building2,
  GraduationCap,
  HandCoins,
  Landmark,
  Wallet,
  type LucideIcon,
} from "lucide-react";

/**
 * Conteúdo do SGPAR — Gerenciador Paroquial.
 * Textos transcritos literalmente do material do cliente.
 */

export const sgparIntro = [
  "O SGPAR é um sistema intuitivo e de fácil controle, projetado para oferecer uma experiência amigável ao usuário. Ele é composto por um conjunto de módulos, incluindo: Módulo Financeiro (Caixa/Bancos, Contas a Pagar/Receber), Módulo de Dízimos, Módulo de Catequese e Módulo de Sacramentos.",
  "Além disso, o SGPAR está disponível em versão online, o que facilita o acesso e torna o sistema mais prático. Sua infraestrutura centraliza todos os bancos de dados, simplificando a realização de backups e garantindo maior segurança para todas as informações.",
] as const;

export const sgparSeal = {
  title: "Tudo o que sua Paróquia precisa, em um único lugar",
  text: "Com o avanço da tecnologia nos dias atuais, a Desenvol Informática identificou a necessidade de otimizar os processos envolvidos na gestão das atividades de uma paróquia. Foi assim que surgiu o SGPAR. Com uma interface prática e intuitiva, o SGPAR possibilita a administração completa das igrejas por meio de suas funcionalidades. Além disso, o sistema está disponível em versão online, o que torna o acesso ainda mais fácil e conveniente.",
} as const;

export type SgparModule = {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
};

export const sgparModules: SgparModule[] = [
  {
    id: "sacramentos",
    name: "Módulo Sacramentos",
    description:
      "Registro completo dos Livros de Batismo, Crisma e Matrimônio, além da emissão de certidões e 2ª vias. Gestão de Agendas de Intenções de Missa, Casamentos, Processos de Habilitação Matrimonial, Cursos de Noivos e Batismo, bem como para o controle de Autorizações.",
    icon: BookOpenCheck,
  },
  {
    id: "financeiro",
    name: "Módulo Financeiro",
    description:
      "Controle completo de Caixa, Bancos e Aplicações, além de demonstrativos detalhados por Dimensão Social, Missionária e Religiosa. O sistema também proporciona integração eficiente com a Contabilidade.",
    icon: Wallet,
  },
  {
    id: "catequese",
    name: "Módulo Catequese",
    description:
      "Cadastro completo de Catequistas, Horários, Catequizandos e Turmas, além do controle de Faltas e Presenças. O sistema também gerencia o Dízimo Catequético e gera relatórios detalhados sobre Cadastros, Turmas e Contribuições.",
    icon: GraduationCap,
  },
  {
    id: "imobilizados",
    name: "Módulo Imobilizados",
    description:
      "Cadastro de bens móveis e imóveis, veículos, além de possibilitar a digitalização de documentos. O sistema também conta com uma Agenda de Pendências, facilitando a regularização de processos.",
    icon: Building2,
  },
  {
    id: "dizimo",
    name: "Módulo Dízimo",
    description:
      "Cadastro de Dizimistas e Contribuições, com encerramento diário integrado ao módulo financeiro. O sistema também emite Recibos de Contribuição, gera Boletos Bancários, e oferece relatórios cadastrais, de aniversariantes e de contribuições. Além disso, possibilita a impressão de Etiquetas.",
    icon: HandCoins,
  },
  {
    id: "mitra",
    name: "Módulo MITRA — Gerencial",
    description:
      "Controle completo de Repasses e do fluxo financeiro, incluindo Caixa, Bancos, Contas a Pagar e a Receber. Além disso, o sistema gera relatórios gerenciais detalhados por Dimensão Missionária, Social e Religiosa, e proporciona integração eficiente com a Contabilidade.",
    icon: Landmark,
  },
];

export type FeatureGroup = {
  /** Ex.: "1 – Emissão de Autorizações para Outras Paróquias". */
  heading: string;
  items: string[];
};

export type SgparDetail = {
  id: string;
  title: string;
  /** Linha de apoio exibida junto ao título do accordion. */
  summary: string;
  groups: FeatureGroup[];
};

export const sgparDetails: SgparDetail[] = [
  {
    id: "sacramentos",
    title: "Módulo Sacramentos",
    summary: "Livros, certidões, agendas e habilitação matrimonial",
    groups: [
      {
        heading: "1 – Emissão de Autorizações para Outras Paróquias",
        items: [
          "Preparação para Batismo",
          "Batismo",
          "Preparação para Matrimônio",
          "Primeira Eucaristia",
          "Crisma",
        ],
      },
      {
        heading: "2 – Emissão da Ficha de Cadastro para Cursos de Noivos",
        items: [
          "Cadastro da Ficha para Curso de Noivos",
          "Emissão do Certificado para o Noivo/Noiva",
          "Emissão da Relação dos Participantes do Curso de Noivos",
        ],
      },
      {
        heading: "3 – Emissão da Ficha de Cadastro para Cursos de Batismo",
        items: [
          "Cadastro da Ficha para o Curso de Batismo",
          "Emissão do Certificado do Curso de Batismo para Padrinhos/Pais",
          "Emissão da Relação dos Participantes do Curso de Batismo",
        ],
      },
      {
        heading: "4 – Registro de Batismo",
        items: [
          "Cadastro dos Livros de Batismo",
          "Consultas por Nome, Nome da Mãe, Nome do Pai, Data de Nascimento",
          "Emissão das Certidões",
          "Registros Automáticos no Livro após a Emissão da Certidão",
          "Emissão da Certidão Negativa de Batismo",
          "Emissão de Atestado de Batismo",
          "Emissão do Livro de Batismo",
        ],
      },
      {
        heading: "5 – Registro de Crisma",
        items: [
          "Cadastro dos Livros de Crisma",
          "Consultas por Nome, Nome da Mãe, Nome do Pai, Data de Nascimento",
          "Emissão das Certidões",
          "Registros Automáticos no Livro após a Emissão da Certidão",
          "Emissão do Livro de Crisma",
        ],
      },
      {
        heading: "6 – Registro de Matrimônios",
        items: [
          "Cadastro dos Livros de Matrimônio",
          "Consultas por Nome do Noivo, Nome da Noiva, Data de Nascimento do Noivo, Data de Nascimento da Noiva",
          "Emissão das Certidões",
          "Registros Automáticos no Livro após a Emissão da Certidão",
          "Emissão da Notificação para o Noivo e para a Noiva",
          "Emissão do Pedido de Certidão de Batismo para Outras Paróquias",
          "Emissão do Livro de Matrimônio",
        ],
      },
      {
        heading: "7 – Agenda de Compromissos",
        items: [
          "Registros dos Compromissos do Pároco",
          "Aluguéis de Salão",
          "Reuniões de Salas",
        ],
      },
      {
        heading: "8 – Agenda de Casamentos",
        items: [
          "Atualização da Agenda de Casamentos",
          "Relatório de Casamentos no Período",
          "Consulta Automática pelo Calendário dos Casamentos Agendados",
        ],
      },
      {
        heading: "9 – Agenda de Missas",
        items: [
          "Atualização das Intenções para as Missas",
          "Relatório das Intenções, separando por Horários e Data da Missa a ser Celebrada",
        ],
      },
      {
        heading: "10 – Processo de Habilitação Matrimonial",
        items: [
          "Pedido de Certidão de Batismo",
          "Certidão de Casamento",
          "Lembrança de Casamento",
          "Habilitação Matrimonial",
          "Declaração dos Noivos",
          "Ata do Matrimônio",
          "Proclamas",
          "Licença do Pároco para Celebração em Outra Paróquia",
          "Declaração para Assistir ao Matrimônio",
          "Requerimento",
          "Declaração para Matrimônio Religioso com Efeito Civil",
          "Juramento Supletório na Falta de Batistério",
          "Dados do Registro Paroquial / Civil",
          "Cursos de Noivos e Batismo, Autorizações",
        ],
      },
    ],
  },
  {
    id: "balancetes",
    title: "Módulo Balancetes — Caixa/Bancos",
    summary: "Integrado à Contabilidade",
    groups: [
      {
        heading: "1 – Balancete Paroquial – Caixa/Bancos",
        items: [
          "Cadastro do Plano de Contas, separado por Receitas/Despesas (Dimensões Missionária, Religiosa e Social) e seus itens correspondentes",
          "Cadastro de Contas Bancárias e Aplicações",
          "Atualização do Movimento Financeiro do Mês/Ano, integrando Caixa, Bancos e Contabilidade",
          "Emissão de Recibos de Pagamentos",
          "Demonstrativo Financeiro Contábil Mensal para Contabilidade – Analítico",
          "Demonstrativo Financeiro Contábil Mensal para a Paróquia, separando por Dimensões – Analítico",
          "Resumo do Demonstrativo Financeiro Contábil Mensal para a Paróquia, separando por Dimensões – Sintético",
          "Relatório do Caixa Diário, com seus Saldos",
          "Demonstrativo Financeiro Diário para Contabilidade",
          "Relatório do Movimento Individual da Conta e Item",
          "Relatório do Movimento por Centro de Custos",
          "Demonstrativo Financeiro Anual",
          "Geração do Arquivo Magnético para Contabilização Automática dos Lançamentos",
        ],
      },
    ],
  },
  {
    id: "dizimos",
    title: "Módulo Dízimos",
    summary: "Dizimistas, arrecadação e correspondência",
    groups: [
      {
        heading: "1 – Dízimos",
        items: [
          "Cadastro de Dizimistas da Paróquia",
          "Atualização do Movimento do Dízimo do Mês/Ano",
          "Consulta do Resumo do Dízimo do Mês/Ano, totalizando Dizimistas Cadastrados, Dizimistas Contribuintes, Total da Arrecadação, Média por Dizimista, Média por Contribuinte",
          "Consulta Automática dos Dizimistas e suas Contribuições",
          "Relatórios Cadastrais de Dizimistas e Etiquetas para Correspondência",
          "Relatório do Demonstrativo Anual de Arrecadação, separando por Dizimista e Contribuições Mensais de Cada um",
          "Relatório e Etiquetas de Aniversariantes Dizimistas, Cônjuge e Casamento",
          "Emissão do Modelo de Carnê para Distribuição",
        ],
      },
    ],
  },
  {
    id: "catequese",
    title: "Módulo Catequese",
    summary: "Turmas, catequistas e dízimo catequético",
    groups: [
      {
        heading: "1 – Catequese",
        items: [
          "Cadastro de Catequizandos com suas etapas concluídas, horários de aulas e catequista",
          "Cadastro de Catequistas da Paróquia",
          "Cadastro de Horários de Catequese da Paróquia",
          "Transferência para Outras Paróquias, durante ou no final do ano catequético",
          "Relatório das Turmas de Catequese por Catequista, Etapa e Horário",
        ],
      },
      {
        heading: "2 – Dízimo Catequético",
        items: [
          "Atualização do Movimento do Dízimo do Mês/Ano",
          "Relatórios Cadastrais de Dizimistas e Etiquetas para Correspondência",
          "Relatório do Demonstrativo Anual de Arrecadação, separando por Dizimista e Contribuições Mensais de Cada Um",
          "Relatório e Etiquetas de Aniversariantes Dizimistas",
          "Consulta do Resumo do Dízimo do Mês/Ano, totalizando Dizimistas Cadastrados, Dizimistas Contribuintes, Total da Arrecadação, Média por Dizimista, Média por Contribuinte",
          "Consulta Automática dos Dizimistas e suas Contribuições",
          "Emissão do Modelo de Carnê para Distribuição",
        ],
      },
    ],
  },
];
