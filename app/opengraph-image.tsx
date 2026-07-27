import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/data/site";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Imagem OG única do site, gerada em build pelo `next/og` (já incluso no
 * Next — sem dependência extra). Rotas que não declaram a própria imagem
 * herdam esta automaticamente.
 *
 * TODO(cliente): se quisermos uma arte por produto, basta adicionar um
 * `opengraph-image.tsx` dentro da pasta da rota correspondente.
 */
export default function OpengraphImage() {
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
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="72" height="90" viewBox="0 0 64 80" fill="none">
            <path
              d="M34.5 18.15A19 19 0 1 0 34.5 53.85"
              stroke="#4B8EC7"
              strokeWidth="3.4"
              fill="none"
            />
            <path d="M28 4h11.2l7.6 9.4-2.4 42.2H28V4Z" fill="#7A66C4" />
          </svg>
          <span style={{ fontSize: 42, letterSpacing: -1 }}>DESENVOL</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <span
            style={{
              fontSize: 22,
              letterSpacing: 3,
              color: "#AFA9EC",
            }}
          >
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
