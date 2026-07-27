import { cn } from "@/lib/utils";

type LogoMarkProps = {
  className?: string;
  /** Quando true, o SVG é puramente decorativo (o texto ao lado já nomeia a marca). */
  decorative?: boolean;
};

/**
 * Símbolo da Desenvol redesenhado em SVG limpo a partir de
 * public/brand/desenvol-logo.png: o monólito violeta pixelado, envolvido
 * pelo arco azul-céu aberto.
 */
export function LogoMark({ className, decorative = true }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 64 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-8 w-auto", className)}
      role={decorative ? "presentation" : "img"}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : "Símbolo da Desenvol Informática"}
      focusable="false"
    >
      {/* Arco aberto */}
      <path
        d="M39.6 15.5A21 21 0 1 0 35.6 57.4"
        stroke="var(--brand-accent)"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      {/* Monólito */}
      <path
        d="M28 4h11.2l7.6 9.4-2.4 42.2H28V4Z"
        fill="var(--brand-primary)"
      />
      {/* Pixels de dados */}
      <g fill="var(--brand-accent)">
        <rect x="35" y="19" width="3.2" height="3.2" rx="0.4" />
        <rect x="38.6" y="24.6" width="5.4" height="3.2" rx="0.4" />
        <rect x="31.4" y="30.2" width="5.4" height="3.2" rx="0.4" />
        <rect x="39.2" y="30.2" width="3.2" height="3.2" rx="0.4" />
        <rect x="35" y="35.8" width="9" height="3.2" rx="0.4" />
        <rect x="38.2" y="41.4" width="3.6" height="3.6" rx="0.4" />
        <rect x="34.4" y="47" width="9" height="3.2" rx="0.4" />
        <rect x="30.6" y="49.6" width="3.2" height="3.2" rx="0.4" />
      </g>
    </svg>
  );
}
