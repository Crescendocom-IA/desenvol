"use client";

import { motion, useReducedMotion } from "motion/react";

import { EASE_BRAND } from "@/lib/motion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Atraso em segundos. Use para escalonar itens de uma mesma lista. */
  delay?: number;
};

/**
 * Revelação de conteúdo ao entrar na viewport. Dispara uma única vez e não
 * faz parallax — conforme o design system. Com `prefers-reduced-motion`,
 * o conteúdo aparece direto no estado final.
 *
 * Renderiza sempre uma <div>: quando precisar de outra semântica (um <li>,
 * por exemplo), envolva o Reveal com o elemento certo em vez de trocá-lo.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-64px" }}
      transition={{ duration: 0.5, ease: EASE_BRAND, delay }}
    >
      {children}
    </motion.div>
  );
}
