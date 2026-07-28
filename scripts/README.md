# scripts/

Ferramentas de verificação. Não fazem parte do build nem do bundle — nada aqui
é importado pelo site.

## `measure.mjs`

Mede geometria de layout num Chrome real e, opcionalmente, tira screenshot do
viewport.

### Por que existe

Métrica não responde tudo. "O hero está alto demais", "a próxima seção aparece
na dobra", "os CTAs ficam acima da dobra no celular" são perguntas sobre o
layout renderizado, e sem medir sobra estimar — estimativa erra. Este script
fecha esse buraco quando não há ninguém com navegador aberto no ciclo.

Ele já pagou o próprio custo: foi assim que descobrimos que o hero da home
tinha 666px com 128px de vazio acima do eyebrow, e foi assim que confirmamos
que os CTAs continuam acima da dobra em 375×667 depois da compactação.

### Requisitos

Node 21+ (usa o `WebSocket` embutido) e Chrome instalado. O script encontra o
Chrome sozinho no Windows, macOS e Linux; se não achar, aponte com
`CHROME_PATH`. Ele sobe e derruba o navegador por conta própria — não é preciso
deixar nada rodando antes.

O site precisa estar servindo:

```bash
pnpm build && pnpm start     # noutro terminal
```

### Uso

```bash
# desktop de referência
node scripts/measure.mjs http://localhost:3000/

# mobile de referência (emulação de dispositivo entra sozinha até 480px)
node scripts/measure.mjs http://localhost:3000/ --viewport 375x667

# elementos específicos, com screenshot
node scripts/measure.mjs http://localhost:3000/contato \
  --select "form,iframe" --screenshot contato.png

# saída bruta, para comparar dois estados
node scripts/measure.mjs http://localhost:3000/ --json > antes.json
```

| Opção | Padrão | Para quê |
| --- | --- | --- |
| `--viewport WxH` | `1440x900` | Viewport. Use `375x667` como mobile de referência |
| `--wait MS` | `5000` | Espera **real** após o load, para hidratar |
| `--select "a,b"` | — | Seletores CSS extras (bbox + opacidade) |
| `--screenshot PATH` | — | Salva PNG do viewport |
| `--mobile` / `--no-mobile` | auto (≤480px) | Força a emulação de dispositivo |
| `--port N` | porta livre | Porta de depuração do Chrome |
| `--json` | — | JSON cru em vez do relatório legível |

### Como ler a saída

`dobra` é o `innerHeight`. Para cada seção filha de `<main>` o relatório marca
`•` quando ela cabe inteira na primeira tela e `▸` quando é cortada pela dobra,
com quantos pixels dela aparecem.

A primeira linha da saída informa se a **emulação de dispositivo** está ligada.
Ela sai sempre e em primeiro lugar de propósito — ver a seção adiante.

A última parte lista elementos com `opacity` computada zero. **Abaixo da dobra
isso é esperado**: o site usa revelação em scroll. **Acima da dobra, leia o que
foi listado antes de concluir qualquer coisa.** Nem todo elemento invisível é
bug: o tooltip "Podemos ajudar?" do botão de WhatsApp é `opacity: 0` por
projeto e só aparece no hover, e ele aparece nessa lista em toda execução.

O que seria bug é um **bloco de conteúdo** ali — esse dependeria de JavaScript
para existir. Por isso o script imprime o seletor e o texto de cada um: contar
sem identificar já nos levou a diagnosticar um bug que não existia.

### Emulação de dispositivo muda o resultado

Ligar a emulação altera quebra de linha e altura de texto. No mesmo viewport de
375×667, o hero da home mede 503px sem emulação e 634px com — 131px de
diferença, o bastante para inverter a conclusão sobre a dobra. A emulação entra
sozinha até 480px de largura porque é o que representa um telefone real; se
comparar medições, garanta que ambas usaram o mesmo modo.

### Armadilha: `--virtual-time-budget` não serve para isto

O caminho óbvio seria `chrome --headless --screenshot --virtual-time-budget`,
que é mais rápido porque não espera de verdade. **Ele mente.**

O tempo virtual congela o `requestAnimationFrame`. Qualquer componente cuja
aparição dependa de rAF — toda a biblioteca `motion`, que anima as revelações
deste site — fica capturado no estado inicial, que aqui é `opacity: 0`.

Concretamente: a barra de estatísticas da home foi capturada como uma faixa
escura vazia, mesmo com 15 segundos de orçamento virtual. Por pouco não
abrimos investigação de um bug que não existia — num Chrome real, com espera
real, ela renderiza normalmente.

Por isso este script usa espera de relógio. Se alguém trocar por tempo virtual
para economizar segundos, reintroduz o mesmo erro. Vale para qualquer
ferramenta de screenshot que ofereça essa flag, não só para o Chrome direto.
