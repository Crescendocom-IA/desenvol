# Lighthouse — baseline v1

Medido em `2026-07-28` contra o build de produção (`pnpm build && pnpm start`)
servindo em `http://localhost:3000`. Lighthouse 13.4.1, Chrome headless.

Rotas de referência: a **home** (escura, leve) e o **SGPAR** (clara, a mais
densa do site — 6 cards de módulo, 4 accordions com a lista completa de
características e um diagrama SVG).

Os relatórios completos ficam em `.reports/lighthouse-<rota>-<dispositivo>.html`.
Não são versionados: ~800 KB cada. Para regerá-los, veja "Como reproduzir".

## Resultado atual

| Rota | Dispositivo | Performance | Accessibility | Best Practices | SEO |
| --- | --- | --- | --- | --- | --- |
| `/` | desktop | **99** | **100** | 96 | **100** |
| `/` | mobile | 87 | **100** | 96 | **100** |
| `/sistemas-eclesiais/sgpar` | desktop | **99** | **100** | 96 | **100** |
| `/sistemas-eclesiais/sgpar` | mobile | 85 | **100** | 96 | **100** |

Os números de mobile são a **mediana de 3 execuções**. Isso não é preciosismo:
numa das rodadas de baseline o SGPAR deu 76 e na seguinte 85. Lighthouse mobile
aplica 4x de throttling de CPU, e numa máquina de trabalho a variação entre
execuções chega a 9 pontos. Uma medição só levaria o próximo dev a caçar um
problema que não existe. Desktop foi estável em 99 nas duas rotas.

Métricas de mobile (mediana):

| Métrica | Home | SGPAR | Referência boa |
| --- | --- | --- | --- |
| First Contentful Paint | 0,9 s | 0,9 s | < 1,8 s |
| Largest Contentful Paint | 4,1 s | 4,2 s | < 2,5 s |
| Speed Index | 0,9 s | 0,9 s | < 3,4 s |
| Total Blocking Time | 54 ms | 69 ms | < 200 ms |
| Cumulative Layout Shift | 0,000 | 0,000 | < 0,1 |

## Antes e depois — remoção do eixo `opsz`

A Bricolage Grotesque era carregada com dois eixos variáveis além do peso,
`opsz` e `wdth`. O `wdth` é usado de fato — o utilitário `display-tight` aplica
`font-variation-settings: "wdth" 90` nos títulos grandes. **O `opsz` não era
referenciado por nenhum seletor.**

| | Baseline | Após remover `opsz` | Δ |
| --- | --- | --- | --- |
| Arquivo da Bricolage | 128,2 KB | 76,3 KB | **−51,9 KB (−40%)** |
| Total de fontes | 199,2 KB | 148,3 KB | −51,0 KB (−26%) |
| LCP mobile, home | 4,3 s | 4,1 s | −0,2 s |
| LCP mobile, SGPAR | 4,4 s | 4,2 s | −0,2 s |
| Performance mobile, home | 86 | 87 | +1 |
| Performance mobile, SGPAR | 85 | 85 | 0 |

A economia de bytes é real e verificada na rede. **O efeito na nota foi
irrelevante** — e isso derrubou a hipótese original de que a fonte de display
era a causa do LCP alto. A mudança foi mantida porque 51,9 KB a menos sem
alterar um pixel é ganho incondicional, não porque resolveu a nota.

## Por que o mobile fica abaixo de 90 — diagnóstico revisado

A primeira leitura foi que a Bricolage gatilhava um candidato tardio de LCP ao
terminar de baixar. Removido o eixo e economizados 51 KB, a nota não se moveu.
Segue o diagnóstico correto.

**Não existe defeito de renderização.** Três medições independentes apontam
para isso:

| Medição | Resultado |
| --- | --- |
| Sem throttling (`--throttling-method=provided`) | **Performance 100**, FCP 0,1 s, **LCP 0,2 s** |
| Speed Index sob throttling simulado | **0,9 s** — a página está visualmente completa |
| Fim da última requisição no traço observado | **244 ms** (28 requisições, ~452 KB) |

Se a página fica visualmente completa em 0,9 s e todo o carregamento termina em
244 ms, um LCP de 4,1 s não descreve um paint tardio. Dois sinais confirmam:
**LCP e TTI são exatamente iguais em toda execução simulada** (4,1 s / 4,1 s),
e o elemento de LCP não chega a ser reportado.

**O que a nota mede é peso de transferência sob 4G lento.** O preset mobile
simula 1,6 Mbps e 150 ms de RTT, com 4x de throttling de CPU. Composição da
página:

| Tipo | Requisições | Peso |
| --- | --- | --- |
| Script | 18 | 220,7 KB |
| Font | 3 | 148,3 KB |
| Other (RSC, manifests) | 3 | 44,1 KB |
| Document | 1 | 18,8 KB |
| Stylesheet | 1 | 12,1 KB |
| Image | 2 | 8,4 KB |
| **Total** | **28** | **~452 KB** |

452 KB a ~200 KB/s dão ~2,3 s só de transferência, mais os RTTs de 28
requisições e o parse do JavaScript a 1/4 da velocidade de CPU. Os ~4 s são o
modelo funcionando corretamente, não um bug nosso.

Isso **não** é desculpa: numa conexão móvel ruim de verdade — secretaria
paroquial no interior — o carregamento seria mesmo mais lento. Mas duas
ressalvas importam para interpretar o número:

1. A medição é contra `localhost`, sem CDN. Na Vercel os assets saem do edge,
   com HTTP/2 e latência muito menor. O termo de transferência muda bastante.
2. TBT de 54 ms e CLS zero indicam que, uma vez carregada, a página é leve e
   estável. O problema é chegar, não executar.

**Próximo passo obrigatório: re-medir contra o preview da Vercel.** Só ali o
número é comparável ao que o usuário real experimenta. Não faz sentido otimizar
mais contra localhost.

### Alavancas restantes, por tamanho

1. **JavaScript, 220,7 KB em 18 requisições.** É a linha de base de Next 15 +
   React 19 com alguns componentes de cliente. Há pouco espaço sem trocar
   arquitetura. Os componentes de cliente hoje são: nav (dropdown e sheet),
   accordion do SGPAR, formulário de contato, card de PIX e o `Reveal` de
   scroll. Se algum dia isso virar prioridade, o `Reveal` é o mais fácil de
   eliminar.
2. **Fontes, 148,3 KB em 3 famílias.** Já sem o eixo inútil. Reduzir mais exige
   decisão de design: cair para duas famílias, ou usar `display: "optional"` na
   Bricolage — que evita o repaint tardio ao custo de alguns visitantes verem a
   fonte de fallback na primeira visita.
3. **`legacy-javascript`, 14 KB** de polyfills que o Next injeta pelo
   `browserslist` padrão. Só vale mexer depois de definir com o cliente quais
   navegadores precisam de suporte — lembrando que há dioceses em Firefox ESR.

## Best Practices 96 — falso positivo local, não corrija

Duas requisições 404 no console:

```
http://localhost:3000/_vercel/insights/script.js
http://localhost:3000/_vercel/speed-insights/script.js
```

São os scripts do `@vercel/analytics` e do `@vercel/speed-insights`. **Esses
endpoints são injetados pela infraestrutura da Vercel em tempo de deploy e não
existem em `next start` local** — o 404 é o comportamento esperado fora da
Vercel, não um erro do site.

Não tente "consertar" removendo os componentes `<Analytics />` e
`<SpeedInsights />` do `app/layout.tsx`: isso desliga a telemetria em produção
para eliminar um erro que só aparece em desenvolvimento. Em produção esta
categoria deve marcar 100 — confirme na primeira medição do preview.

## O que foi corrigido nesta rodada

**Hero deixou de depender de JavaScript para ficar visível.**

O `motion` serializa o estado inicial da animação como atributo `style` no HTML
do servidor. A home era entregue com **19 elementos em `opacity:0`** —
incluindo o `<h1>` do hero. Eles só apareciam depois da hidratação, e se o
JavaScript falhasse, o hero simplesmente não aparecia.

A entrada dos dois heroes passou a ser animação CSS (`rise-in` em
`app/globals.css`), com a mesma curva, a mesma duração e o mesmo stagger de
0,08 s do design system. O visual é idêntico. `HeroDark` e `HeroLight`
deixaram de ser Client Components.

Foi mantido por consertar um defeito real de robustez, não por métrica — o
ganho medido foi de 1 ponto. Os 15 elementos que ainda saem em `opacity:0` são
os blocos abaixo da dobra, que usam `whileInView`; ver abaixo.

## Recomendações não aplicadas

Nenhuma bloqueia o handoff.

1. **Re-medir no preview da Vercel** antes de qualquer otimização adicional.
   É o único número que representa o usuário real.
2. **Blocos abaixo da dobra ainda dependem de JS.** O componente `Reveal`
   (`components/motion/reveal.tsx`) usa `whileInView` e serializa `opacity:0`
   nos 15 elementos restantes. Não afeta LCP (estão fora da viewport inicial)
   nem indexação (o Googlebot executa JS), mas se o JS falhar, o conteúdo
   abaixo do hero não aparece. Não dá para resolver só com CSS enquanto
   `animation-timeline: view()` for exclusivo do Chrome. Mitigação barata: um
   `<noscript>` com `[style*="opacity:0"]{opacity:1!important}`.
3. **`unused-javascript`** — 24 KB, economia estimada de ~150 ms, vindo dos
   chunks do framework. Sem ação prática do nosso lado.

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

Para desktop, acrescente `--preset=desktop`. Para separar problema real de
artefato do modelo de simulação, acrescente `--throttling-method=provided`
(sem throttling) ou `--throttling-method=devtools` (throttling aplicado de
verdade).

Duas ressalvas ao rodar no Windows:

- O `chrome-launcher` falha ao remover o próprio diretório temporário (`EPERM`)
  e o comando sai com código 1 — **sempre depois** de escrever o relatório.
  Valide pela existência do arquivo, não pelo exit code.
- Rode pelo bash. No PowerShell, `--chrome-flags="--headless=new --no-sandbox"`
  é quebrado nos espaços e o Chrome sobe sem as flags.

Para mobile, rode 3 vezes e use a mediana, pelo motivo explicado acima.
