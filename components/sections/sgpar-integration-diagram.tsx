const NODES = [
  { label: "Sacramentos", side: "left", y: 70 },
  { label: "Financeiro", side: "left", y: 240 },
  { label: "Catequese", side: "left", y: 410 },
  { label: "Imobilizados", side: "right", y: 70 },
  { label: "Dízimo", side: "right", y: 410 },
  { label: "MITRA", side: "right", y: 240 },
] as const;

/** Extremos das linhas, calculados até a borda do círculo central. */
const CONNECTORS = [
  { from: [260, 70], to: [390, 187] },
  { from: [260, 240], to: [370, 240] },
  { from: [260, 410], to: [390, 293] },
  { from: [640, 70], to: [510, 187] },
  { from: [640, 240], to: [530, 240] },
  { from: [640, 410], to: [510, 293] },
] as const;

/**
 * Resumo da integração dos módulos: os seis convergem para a base única do
 * SGPAR. Desenhado em SVG — não é uma reprodução da imagem antiga.
 *
 * Abaixo de `md` o diagrama daria texto ilegível, então a mesma informação
 * aparece como lista. O SVG carrega <title>/<desc> para leitores de tela.
 */
export function SgparIntegrationDiagram() {
  return (
    <>
      <svg
        viewBox="0 0 900 480"
        role="img"
        aria-labelledby="diagrama-titulo diagrama-descricao"
        className="hidden h-auto w-full md:block"
      >
        <title id="diagrama-titulo">
          Resumo da integração dos módulos do SGPAR
        </title>
        <desc id="diagrama-descricao">
          Os módulos Sacramentos, Financeiro, Catequese, Imobilizados, Dízimo e
          MITRA compartilham a mesma base de dados central do SGPAR.
        </desc>

        <g stroke="var(--brand-accent)" strokeWidth="1.5" opacity="0.55">
          {CONNECTORS.map(({ from, to }) => (
            <line
              key={`${from[0]}-${from[1]}`}
              x1={from[0]}
              y1={from[1]}
              x2={to[0]}
              y2={to[1]}
            />
          ))}
        </g>

        {NODES.map((node) => {
          const x = node.side === "left" ? 40 : 640;
          return (
            <g key={node.label}>
              <rect
                x={x}
                y={node.y - 28}
                width="220"
                height="56"
                rx="16"
                fill="var(--surface-card)"
                stroke="var(--hairline-strong)"
                strokeWidth="1"
              />
              <text
                x={x + 110}
                y={node.y + 6}
                textAnchor="middle"
                fill="var(--text-primary)"
                fontFamily="var(--font-display)"
                fontSize="17"
                fontWeight="500"
              >
                {node.label}
              </text>
            </g>
          );
        })}

        <circle
          cx="450"
          cy="240"
          r="80"
          fill="var(--brand-primary)"
        />
        <text
          x="450"
          y="236"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="var(--font-display)"
          fontSize="28"
          fontWeight="500"
          letterSpacing="-0.5"
        >
          SGPAR
        </text>
        <text
          x="450"
          y="262"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="var(--font-mono)"
          fontSize="11"
          letterSpacing="1"
          opacity="0.85"
        >
          BASE ÚNICA
        </text>
      </svg>

      <ul className="grid grid-cols-2 gap-3 md:hidden">
        {NODES.map((node) => (
          <li
            key={node.label}
            className="rounded-xl border border-hairline bg-surface px-4 py-3 text-center text-sm font-medium text-ink"
          >
            {node.label}
          </li>
        ))}
      </ul>
    </>
  );
}
