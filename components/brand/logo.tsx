import { cn } from "@/lib/utils";

import { LogoMark } from "./logo-mark";

type LogoProps = {
  className?: string;
  /** Exibe "Informática" abaixo do wordmark. Usado no footer. */
  withSubtitle?: boolean;
};

/**
 * Lockup horizontal: símbolo + wordmark.
 *
 * O arquivo original do cliente (public/brand/desenvol-logo.png) é um lockup
 * vertical sobre fundo branco — inutilizável numa barra de 72px e ilegível no
 * tema escuro. O símbolo foi redesenhado em SVG (LogoMark) e o wordmark é
 * tipografado em Bricolage, de modo que a marca herda `currentColor` e funciona
 * nos dois temas. O PNG original permanece versionado como referência.
 */
export function Logo({ className, withSubtitle = false }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="h-9 w-auto" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.375rem] font-medium tracking-[-0.01em] text-ink">
          DESENVOL
        </span>
        {withSubtitle ? (
          <span className="mt-1 font-mono text-[0.625rem] tracking-[0.18em] text-ink-soft uppercase">
            Informática
          </span>
        ) : null}
      </span>
    </span>
  );
}
