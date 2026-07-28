#!/usr/bin/env node
/**
 * measure.mjs, mede geometria de layout num Chrome real, sem navegador humano.
 *
 * Existe porque nem toda verificação é métrica: "o hero está alto demais" ou
 * "a próxima seção aparece na dobra" só se responde com números do layout
 * renderizado. Sem isso sobra estimar, e estimativa erra.
 *
 * Node nativo, fala CDP pelo WebSocket embutido (Node 21+). Sem puppeteer,
 * sem playwright, sem nenhuma dependência.
 *
 * ---------------------------------------------------------------------------
 * COMO RODAR
 * ---------------------------------------------------------------------------
 *
 *   pnpm build && pnpm start          # noutro terminal, servindo em :3000
 *
 *   node scripts/measure.mjs http://localhost:3000/
 *   node scripts/measure.mjs http://localhost:3000/ --viewport 375x667
 *   node scripts/measure.mjs http://localhost:3000/sobre --screenshot sobre.png
 *   node scripts/measure.mjs http://localhost:3000/ --select "header,.eyebrow,dl"
 *   node scripts/measure.mjs http://localhost:3000/ --json > medida.json
 *
 * Opções:
 *   --viewport WxH     Padrão 1440x900. Use 375x667 para o mobile de referência.
 *   --wait MS          Padrão 5000. Espera REAL após o load, para hidratar.
 *   --select "a,b,c"   Seletores CSS extras para medir (bbox + opacidade).
 *   --screenshot PATH  Salva PNG do viewport.
 *   --mobile / --no-mobile   Emulação de dispositivo. Padrão: auto (largura <= 480).
 *   --port N           Porta de depuração. Padrão: uma porta livre qualquer.
 *   --json             Saída JSON crua em vez do relatório legível.
 *
 * ---------------------------------------------------------------------------
 * COMO INTERPRETAR
 * ---------------------------------------------------------------------------
 *
 * `dobra` é `innerHeight`: tudo com `bottom` menor ou igual a esse valor está
 * visível sem rolar. Para cada seção filha de <main>, `visivelNaDobra` diz
 * quantos pixels dela cabem na primeira tela, negativo significa que a seção
 * anterior passou da dobra.
 *
 * `ocultosPorOpacidade` conta elementos com `opacity` computada igual a zero.
 * Num site com revelação em scroll isso é esperado abaixo da dobra; acima da
 * dobra é sinal de conteúdo que depende de JavaScript para existir.
 *
 * ---------------------------------------------------------------------------
 * ARMADILHA, não use --virtual-time-budget para isto
 * ---------------------------------------------------------------------------
 *
 * O caminho óbvio seria `chrome --headless --screenshot --virtual-time-budget`.
 * Ele mente. O tempo virtual congela o `requestAnimationFrame`, e qualquer
 * componente cuja aparição dependa de rAF, toda a biblioteca `motion`, que é
 * o que anima as revelações deste site, fica no estado inicial.
 *
 * Na prática: a barra de estatísticas da home foi capturada como uma faixa
 * vazia, e por pouco não viramos a noite atrás de um bug que não existia. Este
 * script usa espera real justamente por isso. Se você trocar por tempo
 * virtual para ganhar alguns segundos, vai reintroduzir o mesmo erro.
 *
 * Vale para qualquer ferramenta de screenshot com essa flag, não só para o
 * Chrome direto.
 */

import { spawn } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import net from "node:net";
import os from "node:os";
import path from "node:path";

// ---------------------------------------------------------------------------
// Argumentos
// ---------------------------------------------------------------------------

const argv = process.argv.slice(2);
const flag = (name, fallback = undefined) => {
  const i = argv.indexOf(`--${name}`);
  return i === -1 ? fallback : argv[i + 1];
};
const has = (name) => argv.includes(`--${name}`);

const url = argv.find((a) => !a.startsWith("--") && /^https?:\/\//.test(a));
if (!url) {
  console.error(
    "uso: node scripts/measure.mjs <url> [--viewport 1440x900] [--wait 5000]\n" +
      "     [--select \"sel,sel\"] [--screenshot out.png] [--json]",
  );
  process.exit(1);
}

const [width, height] = (flag("viewport", "1440x900")).split("x").map(Number);
const waitMs = Number(flag("wait", "5000"));
const selectors = (flag("select", "") || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
const screenshotPath = flag("screenshot");
const asJson = has("json");
const mobile = has("mobile")
  ? true
  : has("no-mobile")
    ? false
    : width <= 480; // auto: a emulação muda quebra de linha e altura de texto

// ---------------------------------------------------------------------------
// Chrome
// ---------------------------------------------------------------------------

function findChrome() {
  if (process.env.CHROME_PATH && existsSync(process.env.CHROME_PATH)) {
    return process.env.CHROME_PATH;
  }
  const candidates = {
    win32: [
      "C:/Program Files/Google/Chrome/Application/chrome.exe",
      "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
      `${os.homedir()}/AppData/Local/Google/Chrome/Application/chrome.exe`,
      "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    ],
    darwin: [
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      "/Applications/Chromium.app/Contents/MacOS/Chromium",
    ],
    linux: [
      "/usr/bin/google-chrome",
      "/usr/bin/chromium",
      "/usr/bin/chromium-browser",
    ],
  }[process.platform] ?? [];

  const found = candidates.find((p) => existsSync(p));
  if (!found) {
    throw new Error(
      "Chrome não encontrado. Defina CHROME_PATH apontando para o executável.",
    );
  }
  return found;
}

const freePort = () =>
  new Promise((resolve, reject) => {
    const srv = net.createServer();
    srv.on("error", reject);
    srv.listen(0, "127.0.0.1", () => {
      const { port } = srv.address();
      srv.close(() => resolve(port));
    });
  });

/**
 * Perfil fixo em vez de temporário descartável: no Windows o Chrome mantém
 * lock no diretório por um instante após sair, e apagá-lo falha com EPERM.
 * Reaproveitar o mesmo perfil evita o problema e deixa o script idempotente.
 */
function profileDir() {
  const dir = path.join(os.tmpdir(), "measure-mjs-profile");
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  return dir;
}

async function waitForEndpoint(port, timeoutMs = 20000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (res.ok) return await res.json();
    } catch {
      // ainda subindo
    }
    await new Promise((r) => setTimeout(r, 150));
  }
  throw new Error("Chrome não respondeu na porta de depuração a tempo.");
}

// ---------------------------------------------------------------------------
// Cliente CDP mínimo
// ---------------------------------------------------------------------------

function connect(wsUrl) {
  const ws = new WebSocket(wsUrl);
  let id = 0;
  const pending = new Map();

  ws.addEventListener("message", (ev) => {
    const msg = JSON.parse(ev.data);
    const resolve = pending.get(msg.id);
    if (resolve) {
      pending.delete(msg.id);
      resolve(msg.result);
    }
  });

  const ready = new Promise((r) => ws.addEventListener("open", r, { once: true }));

  return {
    ready,
    send: (method, params = {}) =>
      new Promise((resolve) => {
        const msgId = ++id;
        pending.set(msgId, resolve);
        ws.send(JSON.stringify({ id: msgId, method, params }));
      }),
    close: () => ws.close(),
  };
}

// ---------------------------------------------------------------------------
// Script avaliado na página
// ---------------------------------------------------------------------------

const pageScript = (extraSelectors) => `(() => {
  const box = (el) => {
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return {
      top: Math.round(r.top),
      bottom: Math.round(r.bottom),
      left: Math.round(r.left),
      width: Math.round(r.width),
      height: Math.round(r.height),
      opacidade: cs.opacity,
      visivelNaDobra: Math.round(Math.min(r.bottom, innerHeight) - Math.max(r.top, 0)),
    };
  };

  const rotulo = (el) =>
    el.getAttribute('aria-label') ||
    el.getAttribute('aria-labelledby') ||
    el.id ||
    el.tagName.toLowerCase();

  const secoes = [...document.querySelectorAll('main > *')].map((el) => ({
    rotulo: rotulo(el),
    ...box(el),
  }));

  const alvos = {};
  for (const sel of ${JSON.stringify(extraSelectors)}) {
    const el = document.querySelector(sel);
    alvos[sel] = el ? box(el) : null;
  }

  const ocultos = [...document.querySelectorAll('*')].filter(
    (el) => getComputedStyle(el).opacity === '0',
  );

  // Identifica o elemento oculto o suficiente para agir sobre ele: um
  // contador sozinho diz que existe problema, não onde.
  const identificar = (el) => {
    const partes = [el.tagName.toLowerCase()];
    if (el.id) partes.push('#' + el.id);
    const cls = (el.getAttribute('class') || '').split(/\\s+/).filter(Boolean).slice(0, 2);
    if (cls.length) partes.push('.' + cls.join('.'));
    const texto = (el.textContent || '').trim().replace(/\\s+/g, ' ').slice(0, 40);
    return { seletor: partes.join(''), texto, ...box(el) };
  };

  return JSON.stringify({
    url: location.href,
    viewport: { largura: innerWidth, altura: innerHeight },
    dobra: innerHeight,
    paginaAltura: Math.round(document.documentElement.scrollHeight),
    cabecalho: document.querySelector('header') ? box(document.querySelector('header')) : null,
    secoes,
    alvos,
    ocultosPorOpacidade: {
      total: ocultos.length,
      acimaDaDobra: ocultos.filter((el) => el.getBoundingClientRect().top < innerHeight).length,
      detalheAcimaDaDobra: ocultos
        .filter((el) => el.getBoundingClientRect().top < innerHeight)
        .map(identificar),
    },
  });
})()`;

// ---------------------------------------------------------------------------
// Relatório
// ---------------------------------------------------------------------------

function report(data) {
  const { viewport, dobra, cabecalho, secoes, alvos, ocultosPorOpacidade } = data;

  // O modo de emulação sai sempre, e em primeiro lugar: ele muda a quebra de
  // linha e a altura do texto, e comparar duas medições em modos diferentes
  // leva a conclusões opostas. Impresso aqui para ninguém depender de lembrar
  // quais args passou.
  console.log(
    `\nemulação de dispositivo: ${mobile ? "LIGADA" : "DESLIGADA"}` +
      `  ·  espera real: ${waitMs}ms`,
  );
  console.log(data.url);
  console.log(`viewport ${viewport.largura}x${viewport.altura}`);
  console.log(`altura total da página: ${data.paginaAltura}px\n`);

  if (cabecalho) console.log(`cabeçalho: ${cabecalho.height}px\n`);

  console.log("seções de <main>:");
  const w = Math.max(...secoes.map((s) => s.rotulo.length), 8);
  for (const s of secoes) {
    const dentro = s.top < dobra;
    const marca = dentro ? (s.bottom <= dobra ? "•" : "▸") : " ";
    console.log(
      `  ${marca} ${s.rotulo.padEnd(w)}  top=${String(s.top).padStart(5)}  ` +
        `bottom=${String(s.bottom).padStart(5)}  altura=${String(s.height).padStart(4)}` +
        (dentro ? `  visível=${s.visivelNaDobra}px` : ""),
    );
  }
  console.log("\n  • inteira na dobra   ▸ cortada pela dobra");

  const cruzando = secoes.find((s) => s.top < dobra && s.bottom > dobra);
  const seguinte = secoes.find((s) => s.top >= dobra);
  if (cruzando) {
    console.log(
      `\ndobra em ${dobra}px corta "${cruzando.rotulo}" ` +
        `(${dobra - cruzando.top}px de ${cruzando.height}px visíveis)`,
    );
  } else if (seguinte) {
    console.log(`\ndobra em ${dobra}px cai exatamente entre seções`);
  }

  if (Object.keys(alvos).length) {
    console.log("\nseletores pedidos:");
    for (const [sel, b] of Object.entries(alvos)) {
      if (!b) {
        console.log(`  ${sel}: não encontrado`);
        continue;
      }
      console.log(
        `  ${sel}: top=${b.top} bottom=${b.bottom} ${b.width}x${b.height} ` +
          `opacidade=${b.opacidade}${b.bottom <= dobra ? " [acima da dobra]" : " [abaixo da dobra]"}`,
      );
    }
  }

  console.log(
    `\nelementos com opacidade 0: ${ocultosPorOpacidade.total} ` +
      `(${ocultosPorOpacidade.acimaDaDobra} acima da dobra)`,
  );
  if (ocultosPorOpacidade.acimaDaDobra > 0) {
    // Sem listar quem é, este aviso vira falso alarme: tooltip de hover é
    // `opacity: 0` por projeto. Cabe a quem lê separar intenção de bug.
    console.log("  acima da dobra, confira se cada um é intencional:");
    for (const el of ocultosPorOpacidade.detalheAcimaDaDobra) {
      console.log(
        `    ${el.seletor}  top=${el.top} bottom=${el.bottom} ` +
          `(${el.visivelNaDobra}px na dobra)` +
          (el.texto ? `  "${el.texto}"` : ""),
      );
    }
    console.log(
      "  tooltip de hover é esperado; bloco de conteúdo não, esse dependeria de JS.",
    );
  }
  console.log();
}

// ---------------------------------------------------------------------------
// Execução
// ---------------------------------------------------------------------------

const chromePath = findChrome();
const port = Number(flag("port", "")) || (await freePort());

const chrome = spawn(
  chromePath,
  [
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    "--no-default-browser-check",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profileDir()}`,
    "about:blank",
  ],
  { stdio: "ignore", detached: false },
);

let client;
try {
  await waitForEndpoint(port);

  const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
  const page = targets.find((t) => t.type === "page");
  if (!page) throw new Error("Nenhuma aba disponível no Chrome.");

  client = connect(page.webSocketDebuggerUrl);
  await client.ready;

  await client.send("Emulation.setDeviceMetricsOverride", {
    width,
    height,
    deviceScaleFactor: 1,
    mobile,
  });
  await client.send("Page.enable");
  await client.send("Page.navigate", { url });

  // Espera real: o tempo virtual congelaria o rAF. Ver a nota no cabeçalho.
  await new Promise((r) => setTimeout(r, waitMs));

  const res = await client.send("Runtime.evaluate", {
    expression: pageScript(selectors),
    returnByValue: true,
  });
  const data = JSON.parse(res.result.value);

  if (screenshotPath) {
    const shot = await client.send("Page.captureScreenshot", {
      format: "png",
      captureBeyondViewport: false,
    });
    writeFileSync(screenshotPath, Buffer.from(shot.data, "base64"));
    data.screenshot = screenshotPath;
  }

  if (asJson) {
    console.log(JSON.stringify(data, null, 2));
  } else {
    report(data);
    if (screenshotPath) console.log(`screenshot: ${screenshotPath}\n`);
  }
} finally {
  client?.close();
  chrome.kill();
}
