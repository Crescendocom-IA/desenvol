# Site institucional — Desenvol Informática

Substituto do `desenvol.com.br` atual (WordPress, 2019). Next.js 15 com App
Router, Tailwind v4 e shadcn/ui.

## Rodando localmente

```bash
pnpm install
pnpm dev
```

Outros comandos: `pnpm build`, `pnpm start`, `pnpm lint`.

## Variáveis de ambiente

Copie `.env.example` para `.env.local`. Todas são opcionais — sem elas o
formulário de contato cai para `mailto:` com a mensagem já preenchida.

## Tema por rota

Não existe toggle de tema. Cada route group fixa o seu:

- `app/(dark)/` — home, `/sobre` e as duas landings de categoria. Páginas
  curtas, de impacto, com halos radiais.
- `app/(light)/` — páginas de produto, mídia e contato. Listas longas e
  formulários, onde leitura extensa no escuro cansa.

O layout de cada grupo envolve a página em um elemento com `data-mode`, e o
`<html>` herda os mesmos tokens via `:has()` em `app/globals.css`. Isso pinta a
área de overscroll com a cor certa e alcança conteúdo em portal (sheet,
dialog), que vive fora da árvore do route group.

## Marca

`public/brand/desenvol-logo.png` é o arquivo original do cliente — um lockup
vertical sobre fundo branco, com o topo do símbolo cortado na borda da imagem
e ruído de compressão no fundo. Dele foram recortados, com o fundo removido:

| Asset | Uso |
| --- | --- |
| `desenvol-mark.png` | Símbolo, cores da marca — superfícies claras |
| `desenvol-wordmark.png` | Wordmark violeta — superfícies claras |
| `desenvol-mark-reverse.png` | Símbolo em reverse — superfícies escuras |
| `desenvol-wordmark-reverse.png` | Wordmark em reverse — superfícies escuras |

O reverse existe porque o violeta `#47328E` rende 1,95:1 sobre o fundo escuro
`#0E0A22` e ficaria ilegível. Nele o violeta vira quase-branco e o arco
azul-céu da marca é preservado. `SiteShell` passa o tema da rota até o
`<Logo />`, então cada página carrega só a variante que usa.

Para regenerar os recortes é preciso o arquivo original — veja o histórico do
commit "usa a logo original do cliente" para o script de extração.

## Onde ficam os textos

Todo o conteúdo institucional está em `lib/data/`, transcrito literalmente do
material do cliente:

| Arquivo | Conteúdo |
| --- | --- |
| `site.ts` | Endereço, telefone, CNPJ, PIX, números da home |
| `institutional.ts` | Sobre, missão, visão, valores, Missas DataShow |
| `products.ts` | Os cinco produtos e seus destinos |
| `sgpar-modules.ts` | Módulos do SGPAR e características detalhadas |
| `tribunal-features.ts` | Características do Tribunal Eclesiástico |
| `commercial.ts` | Textos do ERP e da NF-e |
| `external-links.ts` | Portais de cliente, suporte e Missas DataShow |
| `nav.ts` | Estrutura do menu e lista de rotas (base do sitemap) |

Esses textos são preservados palavra por palavra. Reagrupar e destacar é
permitido; reescrever não.

## Pendências com o cliente

Marcadas no código como `// TODO(cliente):`:

- **Logo em vetor (SVG/AI/EPS).** O PNG fornecido é raster, tem o topo do
  símbolo cortado na borda da imagem e artefatos de compressão. Com o vetor,
  a marca fica nítida em qualquer tamanho e o reverse sai exato
- Aprovação do uso reverse da marca sobre fundo escuro
- Link real do Joinchat/WhatsApp (hoje: `wa.me` com o telefone comercial)
- Imagem oficial do QR code PIX emitida pelo Sicredi
- Remetente verificado no Resend e `RESEND_API_KEY` de produção
- Domínio final de produção
- Horário de atendimento para a página de contato
- Captura de tela de um slide das Missas DataShow
- Destino definitivo da área do App Vendas (autenticação real ou
  encaminhamento para contato, como está hoje)

## Deploy

Vercel. Todas as rotas são estáticas; a única parte dinâmica é a server action
do formulário de contato.
