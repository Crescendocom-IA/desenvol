# Site institucional Desenvol

Novo site da Desenvol Informática (Londrina/PR), em substituição ao WordPress
de 2019. Next.js 15, Tailwind v4 e shadcn/ui, hospedado na Vercel.

## Rodando local

```bash
pnpm install
pnpm dev              # desenvolvimento, porta 3000
pnpm build            # build de produção
pnpm start            # servir o build
pnpm lint             # verificação
```

Node 20+ e pnpm 11 (fixado em `packageManager`).

## Variáveis de ambiente

Copie `.env.example` para `.env.local`. **Todas são opcionais** — sem nenhuma
delas o site sobe inteiro e funciona.

```bash
# Domínio de produção. Usado em canonical, og:url, sitemap.xml e robots.txt.
# Sem isso: usa https://www.desenvol.com.br; em preview na Vercel, cai para a
# URL do próprio deploy.
NEXT_PUBLIC_SITE_URL=

# Envio do formulário de contato.
# Sem isso: a server action devolve um mailto: já preenchido.
RESEND_API_KEY=

# Remetente dos e-mails. Precisa ser um domínio verificado no Resend.
# Sem isso: usa o remetente de teste onboarding@resend.dev.
RESEND_FROM=
```

## ⚠️ Antes do primeiro deploy em produção

**Envie um e-mail de teste real** pelo formulário, com `RESEND_API_KEY`
configurada e domínio verificado no Resend. Esse caminho nunca foi exercitado
de ponta a ponta — o desenvolvimento inteiro rodou no fallback.

O fallback `mailto:` é comportamento **correto** quando não há chave, e é o que
está ativo hoje. Mas não é o comportamento pretendido em produção: ele exige
que o visitante tenha um programa de e-mail configurado e clique em "enviar"
lá. Quem não tiver, não conclui o contato.

## Deploy

Vercel, com detecção automática de Next.js. Todas as rotas são estáticas; a
única parte dinâmica é a server action do formulário.

O passo a passo completo — root directory, variáveis por ambiente, domínio,
e por que o `packageManager` não deve ser alterado — está em
[`docs/HANDOFF_DEV.md`](docs/HANDOFF_DEV.md).

## Estrutura

- `app/` — as 12 rotas, divididas em dois route groups: `(dark)` para as
  páginas institucionais curtas e `(light)` para as de conteúdo denso. O tema é
  imposto pela rota; não há toggle.
- `components/` — `brand/` (logo), `layout/` (casca, nav, footer),
  `sections/` (blocos de página), `ui/` (primitivos shadcn), `motion/`.
- `lib/data/` — **todo o conteúdo institucional**, transcrito literalmente do
  site atual. É aqui que se edita texto, não nos componentes.
- `lib/` — `seo.ts` (metadata por página), `cta.ts`, `motion.ts`, `utils.ts`.
- `public/brand/` — os quatro recortes da marca servidos ao navegador. A arte
  oficial do cliente fica em `docs/brand/` e **não** é publicada.

## Documentação

- [`docs/HANDOFF_CLIENTE.md`](docs/HANDOFF_CLIENTE.md) — o que foi entregue e o
  que falta o cliente fornecer, em linguagem de negócio.
- [`docs/HANDOFF_DEV.md`](docs/HANDOFF_DEV.md) — onboarding técnico: decisões
  de arquitetura, mapa de "quero mudar X → arquivo Y", deploy e riscos
  conhecidos.
- [`.reports/LIGHTHOUSE.md`](.reports/LIGHTHOUSE.md) — baseline de performance,
  acessibilidade e SEO, com causa raiz do que está abaixo de 90.

## Licença

Proprietário. © 2026 Desenvol Informática. Todos os direitos reservados.
