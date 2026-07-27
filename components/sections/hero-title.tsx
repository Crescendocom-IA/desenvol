import { Fragment } from "react";

import { cn } from "@/lib/utils";

type HeroTitleProps = {
  title: string;
  /** Trecho literal de `title` que recebe o gradiente (dark) ou a cor da marca (light). */
  accentPart?: string;
  className?: string;
  id?: string;
};

/**
 * Título de hero com destaque em um trecho do próprio texto.
 * O trecho é localizado no título em vez de recebido separado, para o
 * conteúdo continuar sendo uma única frase legível na fonte de dados.
 */
export function HeroTitle({ title, accentPart, className, id }: HeroTitleProps) {
  const parts =
    accentPart && title.includes(accentPart)
      ? title.split(accentPart)
      : [title];

  return (
    <h1
      id={id}
      className={cn(
        "display-tight text-4xl font-medium text-balance sm:text-5xl lg:text-[4.25rem] lg:leading-[1.04]",
        className,
      )}
    >
      {parts.map((part, index) => (
        <Fragment key={index}>
          {part}
          {index < parts.length - 1 && accentPart ? (
            <span className="text-brand-gradient">{accentPart}</span>
          ) : null}
        </Fragment>
      ))}
    </h1>
  );
}
