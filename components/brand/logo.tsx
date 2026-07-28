import Image from "next/image";

import wordmarkBrand from "@/public/brand/desenvol-wordmark.png";
import wordmarkReverse from "@/public/brand/desenvol-wordmark-reverse.png";
import { cn } from "@/lib/utils";

import { LogoMark, type LogoMode } from "./logo-mark";

type LogoProps = {
  /** Tema da superfície. Vem do route group, via SiteShell. */
  mode?: LogoMode;
  className?: string;
  /** Exibe "Informática" abaixo do wordmark. Usado no footer. */
  withSubtitle?: boolean;
  priority?: boolean;
};

/** Proporção do wordmark no arquivo do cliente (850 × 130). */
const WORDMARK_HEIGHT = 18;
const WORDMARK_WIDTH = 118;

/**
 * Lockup horizontal: símbolo + wordmark, ambos recortados do arquivo original
 * do cliente (docs/brand/desenvol-logo.png). O lockup dele é vertical e não
 * caberia numa barra de 72px, por isso as duas peças são posicionadas lado a
 * lado aqui.
 */
export function Logo({
  mode = "light",
  className,
  withSubtitle = false,
  priority = false,
}: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark mode={mode} priority={priority} />
      <span className="flex flex-col gap-1.5">
        <Image
          src={mode === "dark" ? wordmarkReverse : wordmarkBrand}
          alt="Desenvol"
          width={WORDMARK_WIDTH}
          height={WORDMARK_HEIGHT}
          priority={priority}
          className="h-[18px] w-auto"
        />
        {withSubtitle ? (
          <span className="font-mono text-[0.625rem] tracking-[0.18em] text-ink-soft uppercase">
            Informática
          </span>
        ) : null}
      </span>
    </span>
  );
}
