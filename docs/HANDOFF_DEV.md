# Handoff técnico — site institucional Desenvol

Para quem for assumir a manutenção. A ideia é que uma leitura baste.

---

## Visão geral

Next.js 15 (App Router, React 19, Server Components por padrão), Tailwind v4
com tokens em `@theme`, shadcn/ui sobre Base UI, deploy na Vercel. Todas as 12
rotas são estáticas; a única parte dinâmica é a server action do formulário de
contato.

A marca é violeta indigo (`#47328E`) com acento azul-céu (`#4B8EC7`), extraída
da logo real do cliente — o azul do site antigo era um erro. Existem dois temas
e **não há toggle**: o tema é imposto pela rota, via route groups `(dark)` e
`(light)`. Páginas institucionais curtas são escuras; páginas com listas longas
e formulários são claras, porque leitura extensa no escuro cansa.

Todo o conteúdo institucional é transcrição literal do site atual. Reagrupar,
dividir em parágrafos e mudar destaque é permitido. Reescrever, não.

---

## Como rodar

```bash
pnpm install
pnpm dev              # ambiente de desenvolvimento (porta 3000)
pnpm build            # build de produção
pnpm start            # servir o build
pnpm lint             # verificação
```

Node 20+. O `packageManager` do `package.json` fixa o pnpm 11.17.0 — ver
"Fluxo de deploy" para o porquê.

### Variáveis de ambiente

Todas são opcionais. Sem nenhuma delas o site sobe inteiro e funciona; o que
muda é o comportamento descrito na última coluna. Copie `.env.example` para
`.env.local`.

| Variável | Obrigatória | O que faz | Sem ela |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | não | Domínio base de `canonical`, `og:url`, `sitemap.xml` e `robots.txt` | Usa `https://www.desenvol.com.br`; em preview na Vercel, cai para a URL do próprio deploy |
| `RESEND_API_KEY` | não | Liga o envio real do formulário de contato | A server action devolve um `mailto:` já preenchido |
| `RESEND_FROM` | não | Remetente dos e-mails do formulário | Usa `onboarding@resend.dev`, o remetente de teste do Resend |

Essas três são tudo o que o código lê. Confira com
`grep -rn "process.env" app components lib`.

---

## Estrutura de pastas

Árvore real do repositório. Difere da especificação original do briefing em
alguns pontos, anotados com `←`.

```
desenvol-site/
├─ app/
│  ├─ layout.tsx                    # fontes, metadata base, analytics
│  ├─ globals.css                   # Tailwind v4 + todos os tokens de tema
│  ├─ not-found.tsx                 # 404, monta o próprio SiteShell
│  ├─ sitemap.ts
│  ├─ robots.ts
│  ├─ opengraph-image.tsx           # ← imagem OG gerada em build (não há public/og/)
│  ├─ favicon.ico
│  ├─ (dark)/
│  │  ├─ layout.tsx                 # SiteShell mode="dark"
│  │  ├─ page.tsx                   # home
│  │  ├─ sobre/page.tsx
│  │  ├─ sistemas-eclesiais/page.tsx
│  │  └─ sistemas-comerciais/page.tsx
│  └─ (light)/
│     ├─ layout.tsx                 # SiteShell mode="light"
│     ├─ contato/
│     │  ├─ page.tsx
│     │  └─ actions.ts              # server action do formulário
│     ├─ midia/missas-datashow/page.tsx
│     ├─ sistemas-comerciais/{erp,nf-e,app-vendas}/page.tsx
│     └─ sistemas-eclesiais/{sgpar,tribunal-eclesiastico}/page.tsx
├─ components/
│  ├─ brand/
│  │  ├─ logo.tsx                   # lockup horizontal: símbolo + wordmark
│  │  └─ logo-mark.tsx              # só o símbolo
│  ├─ layout/
│  │  ├─ site-shell.tsx             # ← casca comum: aplica data-mode, nav, footer, whatsapp
│  │  ├─ container.tsx              # ← max-w-6xl + padding padrão
│  │  ├─ nav.tsx                    # Server Component
│  │  ├─ nav-desktop.tsx            # ← lista do nav; client, ver decisão 6
│  │  ├─ nav-dropdown.tsx
│  │  ├─ nav-link.tsx               # ← item simples com estado ativo
│  │  ├─ nav-mobile-sheet.tsx
│  │  ├─ footer.tsx
│  │  ├─ suporte-cta.tsx
│  │  └─ whatsapp-float.tsx
│  ├─ motion/
│  │  └─ reveal.tsx                 # ← revelação em scroll (whileInView)
│  ├─ sections/
│  │  ├─ hero-dark.tsx  hero-light.tsx  hero-title.tsx
│  │  ├─ stats-bar.tsx  dual-tracks.tsx
│  │  ├─ products-grid.tsx  product-card.tsx
│  │  ├─ module-card.tsx  module-accordion.tsx  feature-list.tsx
│  │  ├─ feature-block.tsx          # ← destaque alternado das landings
│  │  ├─ narrative-blocks.tsx       # ← contexto/solução/flexibilidade (ERP, NF-e)
│  │  ├─ mission-vision-values.tsx  statement-quote.tsx
│  │  ├─ sgpar-integration-diagram.tsx
│  │  ├─ missas-datashow-block.tsx  pix-card.tsx
│  │  ├─ restricted-access-card.tsx # ← portão do App Vendas
│  │  ├─ contact-form.tsx  cta-band.tsx
│  └─ ui/                           # primitivos shadcn (Base UI) + cta-link.tsx
├─ lib/
│  ├─ data/                         # todo o conteúdo, ver tabela adiante
│  ├─ cta.ts                        # ← classes de CTA via cva
│  ├─ motion.ts                     # ← curva de easing e passo do stagger
│  ├─ seo.ts                        # buildMetadata()
│  └─ utils.ts                      # cn()
├─ public/brand/                    # só os 4 recortes servidos ao navegador
├─ docs/
│  ├─ brand/desenvol-logo.png       # ← arte oficial da marca, NÃO publicada
│  └─ HANDOFF_*.md                  # este arquivo e o do cliente
└─ .reports/LIGHTHOUSE.md           # baseline de performance
```

Diferenças em relação ao briefing, e o porquê:

- **Não existe `public/og/`.** A imagem OG é gerada em build por
  `app/opengraph-image.tsx` usando `next/og`, que já vem no Next — evitou uma
  dependência e um asset estático para manter em sincronia.
- **`components/ui/select.tsx` foi removido.** O formulário usa `<select>`
  nativo (decisão 4). Deixar o primitivo sem uso seria código morto.
- **`site-shell.tsx`, `container.tsx`, `nav-link.tsx`, `nav-desktop.tsx`,
  `feature-block.tsx`, `narrative-blocks.tsx`, `hero-title.tsx`,
  `restricted-access-card.tsx`, `reveal.tsx`, `pix-card.tsx`, `cta-link.tsx`,
  `lib/cta.ts` e `lib/motion.ts`** não estavam na árvore do briefing. Saíram de
  repetição real durante a construção.
- **`lib/data/` tem mais arquivos** do que o briefing previa:
  `institutional.ts`, `commercial.ts` e `contact-form.ts`.

---

## As decisões que saíram do briefing

Estão aqui para você **não "corrigir" achando que são bugs**. Todas foram
revisadas e aprovadas.

### 1. A logo usa os recortes do arquivo do cliente, com uma variante reverse

**O que fizemos:** recortamos símbolo e wordmark de
`docs/brand/desenvol-logo.png` removendo o fundo branco, e geramos uma
segunda versão em que o violeta vira quase-branco.
**Por quê:** o arquivo do cliente é um lockup vertical sobre fundo branco
opaco — inutilizável numa barra de 72px. E o violeta `#47328E` rende **1,95:1**
sobre o fundo escuro `#0E0A22`, ou seja, praticamente invisível nas 4 rotas
escuras. O arco azul-céu é preservado nas duas versões.
**O que muda para você:** `SiteShell` passa o tema até o `<Logo />`, então cada
página carrega só a variante que usa. Se trocar os assets, gere os dois.

> **A arte oficial da marca fica em `docs/brand/desenvol-logo.png` e não é
> publicada.** Só os quatro recortes derivados vivem em `public/brand/`, porque
> são os únicos que o navegador precisa buscar. O original tem 3,6 MB e nenhuma
> página o referencia — deixá-lo em `public/` o exporia numa URL pública que
> qualquer varredura descobre, sem nenhum ganho. `docs/` não é servido pelo
> Next. Se precisar regerar os recortes, a fonte é esse arquivo.

> Histórico, para rastreabilidade: a primeira versão usava um SVG redesenhado
> à mão, e essa abordagem chegou a ser aprovada em revisão interna. A troca
> pelo arquivo raster do cliente foi **instrução da direção do projeto**, não
> uma decisão de engenharia nossa nem um pedido da Desenvol — a Desenvol não
> teve acesso ao trabalho até aqui e não emitiu pedido nenhum.
>
> O racional da instrução foi fidelidade de marca: o SVG era uma releitura das
> formas, e a direção preferiu o desenho real. O que decorreu disso, aí sim
> como decisão técnica, foi *como* viabilizar o raster — recorte, remoção de
> fundo por un-multiply e a variante reverse.
>
> Se encontrar referência a um "SVG de linha do header" em documento anterior,
> está desatualizada.

### 2. O QR code do PIX não foi gerado

**O que fizemos:** o card de PIX mostra a chave (CNPJ) copiável, o banco e o
favorecido. Não há QR.
**Por quê:** gerar um BR Code a partir de dados inferidos pode produzir um
payload inválido — dano real com dinheiro de terceiros.
**O que muda para você:** quando o cliente enviar o QR oficial do Sicredi, é
só colocar em `public/brand/` (é asset servido, diferente da arte oficial) e
renderizar com `next/image` em `components/sections/pix-card.tsx`.

### 3. `typedRoutes` está no topo do `next.config.ts`, não em `experimental`

**O que fizemos:** `typedRoutes: true` na raiz do config.
**Por quê:** virou estável no Next 15.5; deixá-lo em `experimental` gera
warning no build.
**O que muda para você:** `<Link href>` é checado em tempo de compilação. Rota
nova só compila depois que a pasta existe. `components/ui/cta-link.tsx` é o
único lugar que converte `string` para `Route`, de propósito.

### 4. O formulário usa `<select>` nativo, não o primitivo do shadcn

**O que fizemos:** `<select>` HTML estilizado com Tailwind em
`components/sections/contact-form.tsx`.
**Por quê:** envia junto com a server action sem depender de JavaScript e usa
o seletor do próprio sistema operacional no mobile.
**O que muda para você:** não instale `components/ui/select.tsx` para "padronizar".

### 5. Existe um token `--link` separado da cor da marca

**O que fizemos:** links e ícones-chave usam `--link`, que é o violeta da marca
no tema claro e o violeta claro `#AFA9EC` no escuro.
**Por quê:** contraste. `#47328E` como **texto** sobre `#0E0A22` não passa AA.
Como **fundo de botão** com texto branco, o mesmo violeta rende 9,9:1 — por
isso a cor sólida da marca continua nos botões.
**O que muda para você:** use `text-link` para links. Não troque por
`text-brand-primary` no escuro.

### 6. A entrada do hero é CSS, e a lista do nav vive no cliente

Duas decisões menores, mas que parecem "erradas" sem contexto:

- **Hero em animação CSS (`rise-in`), não em `motion`.** O `motion` serializa
  `style="opacity:0"` no HTML do servidor: o `<h1>` do hero, que é o elemento
  de LCP, só aparecia após a hidratação e sumia de vez se o JS falhasse.
  Não converta de volta.
- **`nav-desktop.tsx` é Client Component e importa `navItems` diretamente.**
  Os itens do menu carregam componentes de ícone do lucide, que não são
  serializáveis através da fronteira server → client. Passar `navItems` como
  prop de `nav.tsx` quebra o build.

---

## Onde editar o quê

| Quero mudar | Arquivo |
| --- | --- |
| Missão, visão, valores, texto "sobre" | `lib/data/institutional.ts` |
| Endereço, telefone, e-mail, CNPJ, PIX, WhatsApp | `lib/data/site.ts` |
| Números da barra de estatísticas da home | `lib/data/site.ts` (`stats`) |
| Módulos e características do SGPAR | `lib/data/sgpar-modules.ts` |
| Características do Tribunal Eclesiástico | `lib/data/tribunal-features.ts` |
| Textos do ERP e da NF-e | `lib/data/commercial.ts` |
| Lista de produtos, taglines, ícones | `lib/data/products.ts` |
| Item do menu principal | `lib/data/nav.ts` |
| Link em "Acesso a clientes" (footer) | `lib/data/external-links.ts` (`clientPortals`) |
| Assuntos do formulário de contato | `lib/data/contact-form.ts` (`SUBJECTS`) |
| Cor primária e todos os tokens de tema | `app/globals.css` |
| Fontes | `app/layout.tsx` |
| Imagem de compartilhamento (OG) | `app/opengraph-image.tsx` |
| Título e descrição de uma página | `export const metadata` da própria página, via `buildMetadata()` |
| Ativar envio real do formulário | `.env.local`: `RESEND_API_KEY` + `RESEND_FROM` |

Duas armadilhas: os textos institucionais **não** ficam em `site.ts` (só os
dados de contato), e **não existe** `public/og/` — a imagem OG é gerada por
`app/opengraph-image.tsx`. Se você seguiu a especificação original do briefing,
esses dois pontos mudaram.

Para adicionar uma rota: crie a pasta dentro de `(dark)` ou `(light)` conforme
o tema, e acrescente o caminho em `routes` (`lib/data/nav.ts`) para entrar no
sitemap. O `typedRoutes` reclama até a pasta existir.

---

## Fluxo de deploy

Repositório: `https://github.com/Crescendocom-IA/desenvol`

1. **Importar** o repositório na Vercel. O preset Next.js é detectado sozinho;
   não há `vercel.json` porque não é preciso.
2. **Root Directory:** a raiz do repositório (padrão) — o `package.json` está
   nela.
3. **Build e Install Command:** deixe os padrões.
4. **Variáveis de ambiente:** nenhuma é obrigatória para o build passar.
   Adicione conforme forem sendo obtidas, pela tabela lá em cima. Configure
   `NEXT_PUBLIC_SITE_URL` **só no ambiente de produção** — em preview, deixe
   vazio para o site usar a URL do próprio deploy.
5. **Domínio:** aponte o domínio depois do preview aprovado, e só então defina
   `NEXT_PUBLIC_SITE_URL`.
6. **Preview branches:** o padrão da Vercel (todo push em branch não-principal
   gera preview) já serve. Previews recebem `noindex` automaticamente.

**Não mexa no `packageManager` do `package.json`.** Ele fixa o pnpm 11.17.0, e
isso não é capricho: as aprovações de build script (sharp, unrs-resolver) estão
em `pnpm-workspace.yaml` sob a chave `allowBuilds`, que só existe a partir do
pnpm 11. Sem o pin, a Vercel infere pnpm 9 ou 10 pelo `lockfileVersion: '9.0'`
do lockfile e a instalação quebra.

---

## Riscos conhecidos

**Fallback de `:has()` no CSS de tema.** O `<html>` herda os tokens do tema por
`html:has([data-mode="..."])`. O Firefox só ganhou `:has()` na versão 121, e
existem dioceses rodando Firefox ESR. Por isso o `:root` também recebe os
tokens claros, como piso. Não remova sem testar em Firefox ESR — no ESR 115 é
esse fallback que evita o `<html>` ficar sem tokens. ESR 128 e 140 já têm
`:has()` e não dependem dele.

**`text-ink-faint` não passa AA em texto de corpo.** Rende 3,8:1 no escuro e
3,2:1 no claro. Existe porque estava na especificação da paleta, mas **nenhum
componente o usa hoje**. Para texto pequeno secundário, use `text-ink-soft`
(8,8:1 no escuro, 7,0:1 no claro). Há um aviso no próprio token em
`app/globals.css`.

**O formulário depende de variável de ambiente externa.** Sem `RESEND_API_KEY`
ele cai para `mailto:` — comportamento intencional, não bug. Mas veja o aviso
no README: faça um envio de teste real antes do primeiro deploy em produção.

**A página do App Vendas está `noindex` e fora do sitemap.** Se ela for
reativada para busca, são dois lugares: remover o `robots` de
`app/(light)/sistemas-comerciais/app-vendas/page.tsx` **e** tirar o filtro em
`app/sitemap.ts`. Mudar só um gera sinal contraditório para o Google. A decisão
entre manter trancada ou abrir está pendente com o cliente — ver
`docs/HANDOFF_CLIENTE.md`, item 7.

**Conteúdo abaixo da dobra depende de JavaScript.** O componente `Reveal`
(`components/motion/reveal.tsx`) usa `whileInView` do `motion`, que serializa
`opacity:0` no HTML do servidor. São 15 elementos. Não afeta LCP nem
indexação (o Googlebot executa JS), mas se o JS falhar, o conteúdo abaixo do
hero não aparece. Ver `.reports/LIGHTHOUSE.md` para a mitigação sugerida.

**Performance mobile está em 87/85, abaixo de 90 — e não há defeito de
renderização por trás disso.** Sem throttling a home marca Performance 100 com
LCP de 0,2 s, o Speed Index é 0,9 s mesmo sob throttling, e todo o carregamento
termina em 244 ms no traço observado. O que a nota mede é peso de transferência
sob o modelo de 4G lento: ~452 KB, dos quais 220 KB de JavaScript e 148 KB de
fontes.

Antes de otimizar mais, **re-meça contra o preview da Vercel** — a medição
atual é contra `localhost`, sem CDN, e o termo de transferência muda bastante
no edge. Diagnóstico completo, com as alavancas restantes ordenadas por
tamanho, em `.reports/LIGHTHOUSE.md`.

**Não reintroduza o eixo `opsz` na Bricolage.** Ele foi removido por não ser
referenciado por nenhum seletor, economizando 51,9 KB sem mudar um pixel. O
`wdth`, esse sim, é usado pelo `display-tight`.

---

## Histórico de commits desta entrega

Do mais recente para o mais antigo. Os oito primeiros (`90d28dc` a `9ce7280`)
são a construção do site; os demais são as duas levas de ajuste e documentação.

```
c5665bd chore: tira a arte oficial da marca da superficie publica
fc3cff9 docs: atualiza historico de commits no handoff tecnico
541a0b6 perf: remove eixo opsz nao referenciado da Bricolage (-51,9 KB)
2ec0cb0 chore: v1 pronta para preview
1b628a8 docs: historico de commits no handoff tecnico
68b0497 docs: README + .env.example
d3b0273 docs: handoff tecnico para proximo dev
589b63a docs: handoff para cliente com pendencias consumiveis
ac153bc chore: relatorio Lighthouse baseline (home + sgpar, mobile + desktop)
71e3e83 fix: hero deixa de depender de JS para ficar visivel
5561056 fix: og:url correto em preview e registro do limite do text-ink-faint
8c60c41 chore: prepara o deploy na vercel
a846f71 feat(marca): usa a logo original do cliente no lugar do SVG redesenhado
9ce7280 chore: validation pass
37a2456 feat: SEO, sitemap, robots, 404 e otimizacoes finais
48a6d7a feat: pagina de contato com formulario
f7af8ca feat: paginas ERP, NF-e, App Vendas e Missas DataShow
87ea981 feat: paginas SGPAR e Tribunal Eclesiastico
e72446e feat: paginas dark - sobre e landings de categoria
093e7f8 feat(home): hero, stats, dual tracks, produtos e institucional
b20b74d feat: layout base - nav, footer, route groups e temas
90d28dc chore: scaffold next.js 15 + tailwind v4 + design tokens
```

Quatro commits valem leitura da mensagem completa (`git show --quiet <hash>`),
porque explicam decisões que não são óbvias no diff: `a846f71` (por que existe
uma variante reverse da logo), `8c60c41` (por que o pnpm está fixado),
`5561056` (por que o og:url muda em preview) e `71e3e83` (por que o hero saiu
do `motion`).
