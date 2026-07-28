# Lighthouse — baseline v1

Medido em `2026-07-28` contra o build de produção (`pnpm build && pnpm start`)
servindo em `http://localhost:3000`. Lighthouse 13.4.1, Chrome headless.

Rotas de referência: a **home** (escura, leve) e o **SGPAR** (clara, a mais
densa do site — 6 cards de módulo, 4 accordions com a lista completa de
características e um diagrama SVG).

Os relatórios completos ficam em `.reports/lighthouse-<rota>-<dispositivo>.html`.
Não são versionados: ~800 KB cada. Para regerá-los, veja "Como reproduzir".

## Resultado

| Rota | Dispositivo | Performance | Accessibility | Best Practices | SEO |
| --- | --- | --- | --- | --- | --- |
| `/` | desktop | **99** | **100** | 96 | **100** |
| `/` | mobile | 86 | **100** | 96 | **100** |
| `/sistemas-eclesiais/sgpar` | desktop | **99** | **100** | 96 | **100** |
| `/sistemas-eclesiais/sgpar` | mobile | 85 | **100** | 96 | **100** |

Os números de mobile são a **mediana de 3 execuções**. Isso não é preciosismo:
a primeira rodada do SGPAR deu 76 e a segunda 85. Lighthouse mobile aplica 4x
de throttling de CPU, e numa máquina de trabalho a variação entre execuções
chega a 9 pontos. Uma medição só levaria o próximo dev a caçar um problema que
não existe. Desktop foi estável em 99 nas duas rotas.

Métricas de mobile (mediana):

| Métrica | Home | SGPAR | Referência boa |
| --- | --- | --- | --- |
| First Contentful Paint | 0,9 s | 0,9 s | < 1,8 s |
| Largest Contentful Paint | 4,3 s | 4,4 s | < 2,5 s |
| Total Blocking Time | 55 ms | 59 ms | < 200 ms |
| Cumulative Layout Shift | 0,000 | 0,000 | < 0,1 |
| Speed Index | 0,9 s | 1,7 s | < 3,4 s |

CLS zero e TBT abaixo de 60 ms nas duas rotas. **O LCP é a única métrica fora
da faixa boa** — e ele sozinho responde por 25% do peso da nota.

## Abaixo de 90 — causa raiz

### Performance mobile (86 / 85) — a fonte de display gatilha o LCP

Não é ruído nem excesso de JavaScript. A medição de rede aponta para um
arquivo específico:

| Arquivo | Tamanho | Termina em |
| --- | --- | --- |
| Bricolage Grotesque (variável) | **128,5 KB** | **3007 ms** |
| Onest (variável) | 39,8 KB | 1949 ms |
| JetBrains Mono (variável) | 31,8 KB | 1839 ms |
| **Total de fontes** | **200,1 KB** | |

A sequência é essa: o texto pinta em fonte de fallback logo no FCP (0,9 s),
o navegador termina de baixar a Bricolage aos 3,0 s, o `<h1>` do hero é
repintado com a fonte real e o Chrome registra um **novo candidato a LCP**.
Daí o vão entre FCP e LCP.

Uma medição com throttling real (`--throttling-method=devtools`, em vez do
modelo simulado padrão) confirma na home: Performance 80, FCP 2,0 s,
LCP 4,9 s, TBT 80 ms, CLS 0. Ou seja, o LCP tardio é comportamento real sob
rede móvel lenta, não artefato da simulação.

**Recomendação (não aplicada — mexe na configuração de fontes, que está
congelada):** a Bricolage é carregada com dois eixos variáveis além do peso —
`opsz` e `wdth` (`app/layout.tsx`). O `wdth` é usado de fato: o utilitário
`display-tight` aplica `font-variation-settings: 'wdth' 90` nos títulos
grandes, que é um efeito distintivo definido no design system. **Já o `opsz`
não é referenciado em lugar nenhum do código.** Remover só o `opsz` reduz o
arquivo sem alterar um pixel do que está na tela.

Duas opções, em ordem de custo:

1. **Tirar o eixo `opsz`** de `Bricolage_Grotesque` em `app/layout.tsx`.
   Zero impacto visual, porque nada consome esse eixo. É a primeira coisa a
   testar.
2. **Trocar a variável por pesos estáticos** (`weight: ['400','500']`),
   perdendo o `wdth` e portanto o efeito `display-tight`. Corta bem mais
   bytes, mas é decisão de design — precisa de aprovação.

Antes de mexer, vale re-medir no preview da Vercel: lá os arquivos saem de CDN
com Brotli e HTTP/2, o que muda o tempo de download das fontes. É possível que
o número já suba sem alteração nenhuma.

### Best Practices (96) — falso positivo local

Duas requisições 404 no console:

```
http://localhost:3000/_vercel/insights/script.js
http://localhost:3000/_vercel/speed-insights/script.js
```

São os scripts do `@vercel/analytics` e do `@vercel/speed-insights`. Esses
endpoints só existem quando o site roda na Vercel; em `next start` local eles
retornam 404 por definição. **Em produção esta categoria deve ir a 100** — vale
confirmar na primeira medição do preview. Nenhuma ação necessária.

## O que foi corrigido nesta rodada

**Hero deixou de depender de JavaScript para ficar visível.**

O `motion` serializa o estado inicial da animação como atributo `style` no HTML
do servidor. O resultado é que a home era entregue com **19 elementos em
`opacity:0`** — incluindo o `<h1>` do hero, que é o elemento de LCP. Eles só
apareciam depois da hidratação, e se o JavaScript falhasse ou demorasse, o
hero simplesmente não aparecia.

A entrada dos dois heroes passou a ser animação CSS (`rise-in` em
`app/globals.css`), com a mesma curva, a mesma duração e o mesmo stagger de
0,08 s do design system. O visual é idêntico. Ganhos: o texto pinta junto com
o primeiro paint, nunca fica preso invisível, e `HeroDark`/`HeroLight`
deixaram de ser Client Components.

Antes e depois, mobile:

| | Home | SGPAR |
| --- | --- | --- |
| Antes | 85 | 84 |
| Depois | 86 | 85 |

**Sendo direto: a correção quase não moveu a nota** — e não deveria mesmo,
porque o gargalo do LCP é o download da fonte, não a hidratação. Ela foi
mantida porque conserta um defeito real de robustez (conteúdo principal
invisível sem JS), não porque melhorou a métrica. Os 15 elementos que ainda
saem em `opacity:0` são os blocos abaixo da dobra, que usam `whileInView` —
ver "Recomendações".

## Recomendações não aplicadas

Nenhuma bloqueia o handoff.

1. **Eixo `opsz` da Bricolage** — descrito acima. Menor esforço, maior retorno
   provável.
2. **Blocos abaixo da dobra ainda dependem de JS.** O componente `Reveal`
   (`components/motion/reveal.tsx`) usa `whileInView` e serializa `opacity:0`
   nos 15 elementos restantes. Não afeta LCP (estão fora da viewport inicial),
   mas se o JS falhar, o conteúdo abaixo do hero não aparece. Não dá para
   resolver só com CSS enquanto `animation-timeline: view()` for exclusivo do
   Chrome. Mitigação barata: um `<noscript>` com
   `[style*="opacity:0"]{opacity:1!important}`.
3. **`unused-javascript`** — 24 KB, economia estimada de ~150 ms. Vem dos
   chunks do framework. Sem ação prática do nosso lado.
4. **`legacy-javascript`** — 14 KB de polyfills que o Next injeta por causa do
   `browserslist` padrão. Só vale mexer depois de definir com o cliente quais
   navegadores precisam ter suporte — lembrando que há dioceses em Firefox ESR.

## Como reproduzir

```bash
pnpm build
pnpm start                     # deixe rodando

# noutro terminal
npx lighthouse http://localhost:3000/ \
  --only-categories=performance,accessibility,best-practices,seo \
  --chrome-flags="--headless=new" \
  --output=html --output-path=.reports/lighthouse-home-mobile.html
```

Para desktop, acrescente `--preset=desktop`. Para throttling real em vez do
simulado, acrescente `--throttling-method=devtools`.

Duas ressalvas ao rodar no Windows:

- O `chrome-launcher` falha ao remover o próprio diretório temporário (`EPERM`)
  e o comando sai com código 1 — **sempre depois** de escrever o relatório.
  Valide pela existência do arquivo, não pelo exit code.
- Rode pelo bash. No PowerShell, `--chrome-flags="--headless=new --no-sandbox"`
  é quebrado nos espaços e o Chrome sobe sem as flags.

Para mobile, rode 3 vezes e use a mediana, pelo motivo explicado acima.
