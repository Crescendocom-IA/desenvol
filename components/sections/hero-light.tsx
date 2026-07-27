"use client";

import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/layout/container";
import { HeroTitle } from "@/components/sections/hero-title";
import { CtaLink, type CtaSpec } from "@/components/ui/cta-link";
import { EASE_BRAND, STAGGER_STEP } from "@/lib/motion";

export type HeroLightProps = {
  eyebrow: string;
  title: string;
  titleAccentPart?: string;
  subtitle: string;
  primaryCta?: CtaSpec;
  secondaryCta?: CtaSpec;
};

/**
 * Hero das páginas de conteúdo: mesma estrutura do HeroDark, tipografia
 * mais compacta e grade sutil no lugar dos halos.
 */
export function HeroLight({
  eyebrow,
  title,
  titleAccentPart,
  subtitle,
  primaryCta,
  secondaryCta,
}: HeroLightProps) {
  const reduceMotion = useReducedMotion();

  const step = (index: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.6,
            ease: EASE_BRAND,
            delay: index * STAGGER_STEP,
          },
        };

  return (
    <section
      aria-labelledby="hero-titulo"
      className="grid-faint relative border-b border-hairline"
    >
      <Container className="py-16 md:py-20 lg:py-24">
        <div className="flex max-w-3xl flex-col gap-5">
          <motion.p {...step(0)} className="eyebrow">
            {eyebrow}
          </motion.p>

          <motion.div {...step(1)}>
            <HeroTitle
              id="hero-titulo"
              title={title}
              accentPart={titleAccentPart}
              className="text-3xl sm:text-4xl lg:text-[3.25rem] lg:leading-[1.06]"
            />
          </motion.div>

          <motion.p
            {...step(2)}
            className="max-w-2xl text-ink-soft text-pretty md:text-lg"
          >
            {subtitle}
          </motion.p>

          {primaryCta || secondaryCta ? (
            <motion.div {...step(3)} className="mt-2 flex flex-wrap gap-3">
              {primaryCta ? (
                <CtaLink {...primaryCta} variant="primary" size="md" />
              ) : null}
              {secondaryCta ? (
                <CtaLink {...secondaryCta} variant="outline" size="md" />
              ) : null}
            </motion.div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
