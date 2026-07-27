import { cva, type VariantProps } from "class-variance-authority";

/**
 * Classes compartilhadas de call-to-action.
 *
 * Deliberadamente um gerador de classes e não um componente: assim navegação
 * continua em <Link>/<a> e ação continua em <button>, sem cruzar as duas
 * semânticas só para reaproveitar estilo.
 */
export const ctaVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 rounded-lg",
    "font-medium whitespace-nowrap",
    "transition-[background-color,border-color,color,transform] duration-200 ease-brand",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:size-4 [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        primary:
          "bg-brand-primary text-white hover:bg-brand-primary-dark",
        outline:
          "border border-hairline-strong text-ink hover:border-brand-accent hover:bg-secondary",
        ghost: "text-ink hover:bg-secondary",
        quiet:
          "text-link underline-offset-4 hover:underline px-0! h-auto!",
      },
      size: {
        sm: "h-9 px-3.5 text-sm",
        md: "h-11 px-5 text-sm",
        lg: "h-12 px-6 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export type CtaVariantProps = VariantProps<typeof ctaVariants>;
