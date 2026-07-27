"use client";

import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/layout/container";
import { HeroTitle } from "@/components/sections/hero-title";
import { CtaLink, type CtaSpec } from "@/components/ui/cta-link";
import { EASE_BRAND, STAGGER_STEP } from "@/lib/motion";

export type HeroDarkProps = {
  eyebrow: string;
  title: string;
  titleAccentPart?: string;
  subtitle: string;
  primaryCta?: CtaSpec;
  secondaryCta?: CtaSpec;
};

export function HeroDark({
  eyebrow,
  title,
  titleAccentPart,
  subtitle,
  primaryCta,
  secondaryCta,
}: HeroDarkProps) {
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
      className="halo relative overflow-hidden border-b border-hairline"
    >
      <Container className="py-20 md:py-28 lg:py-32">
        <div className="flex max-w-3xl flex-col gap-6">
          <motion.p {...step(0)} className="eyebrow">
            {eyebrow}
          </motion.p>

          <motion.div {...step(1)}>
            <HeroTitle
              id="hero-titulo"
              title={title}
              accentPart={titleAccentPart}
            />
          </motion.div>

          <motion.p
            {...step(2)}
            className="max-w-2xl text-lg text-ink-soft text-pretty"
          >
            {subtitle}
          </motion.p>

          {primaryCta || secondaryCta ? (
            <motion.div {...step(3)} className="mt-2 flex flex-wrap gap-3">
              {primaryCta ? (
                <CtaLink {...primaryCta} variant="primary" size="lg" />
              ) : null}
              {secondaryCta ? (
                <CtaLink {...secondaryCta} variant="outline" size="lg" />
              ) : null}
            </motion.div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
