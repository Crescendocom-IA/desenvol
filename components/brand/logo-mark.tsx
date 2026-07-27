import Image from "next/image";

import markBrand from "@/public/brand/desenvol-mark.png";
import markReverse from "@/public/brand/desenvol-mark-reverse.png";
import { cn } from "@/lib/utils";

export type LogoMode = "light" | "dark";

type LogoMarkProps = {
  /** Tema da superfície onde a marca é aplicada. */
  mode?: LogoMode;
  className?: string;
  priority?: boolean;
};

/** Proporção do símbolo no arquivo do cliente (177 × 420). */
const MARK_HEIGHT = 44;
const MARK_WIDTH = 19;

/**
 * Símbolo da Desenvol, extraído do arquivo original do cliente
 * (public/brand/desenvol-logo.png) com o fundo branco removido.
 *
 * Em superfícies escuras usamos a versão reverse: o violeta da marca rende
 * apenas 1,95:1 sobre #0E0A22 e ficaria praticamente invisível. O arco
 * azul-céu é preservado nas duas versões.
 */
export function LogoMark({
  mode = "light",
  className,
  priority = false,
}: LogoMarkProps) {
  return (
    <Image
      src={mode === "dark" ? markReverse : markBrand}
      alt=""
      width={MARK_WIDTH}
      height={MARK_HEIGHT}
      priority={priority}
      className={cn("h-11 w-auto", className)}
    />
  );
}
