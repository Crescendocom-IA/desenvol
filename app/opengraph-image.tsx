import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/data/site";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** O satori não lê do disco: os assets entram como data URI. */
async function dataUri(relativePath: string) {
  const file = await readFile(path.join(process.cwd(), relativePath));
  return `data:image/png;base64,${file.toString("base64")}`;
}

/**
 * Imagem OG única do site, gerada em build pelo `next/og` (já incluso no
 * Next — sem dependência extra). Rotas que não declaram a própria imagem
 * herdam esta automaticamente.
 *
 * Usa a versão reverse da marca, pela mesma razão do nav: o violeta original
 * não tem contraste suficiente sobre o fundo escuro.
 *
 * TODO(cliente): se quisermos uma arte por produto, basta adicionar um
 * `opengraph-image.tsx` dentro da pasta da rota correspondente.
 */
export default async function OpengraphImage() {
  const [mark, wordmark] = await Promise.all([
    dataUri("public/brand/desenvol-mark-reverse.png"),
    dataUri("public/brand/desenvol-wordmark-reverse.png"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          backgroundColor: "#0E0A22",
          backgroundImage:
            "radial-gradient(circle at 90% 10%, rgba(75,142,199,0.35) 0%, transparent 55%), radial-gradient(circle at 10% 95%, rgba(71,50,142,0.55) 0%, transparent 55%)",
          color: "#F5F2FB",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={mark} alt="" width={40} height={95} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={wordmark} alt="Desenvol" width={255} height={39} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <span style={{ fontSize: 22, letterSpacing: 3, color: "#AFA9EC" }}>
            DESDE 1994 · LONDRINA, PR
          </span>
          <span
            style={{
              fontSize: 68,
              lineHeight: 1.1,
              letterSpacing: -2,
              maxWidth: 900,
            }}
          >
            Sistemas de gestão para paróquias e empresas
          </span>
        </div>
      </div>
    ),
    size,
  );
}
