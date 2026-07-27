import { Download } from "lucide-react";

import { supportDownload } from "@/lib/data/external-links";
import { ctaVariants, type CtaVariantProps } from "@/lib/cta";
import { cn } from "@/lib/utils";

type SuporteCtaProps = {
  className?: string;
  label?: string;
} & CtaVariantProps;

/**
 * Download do atendimento remoto (suporte.exe).
 *
 * Sai do site — o Content-Disposition do servidor original é quem transforma
 * a navegação em download, por isso não usamos `download` aqui.
 */
export function SuporteCta({
  className,
  label = "Suporte técnico",
  variant = "outline",
  size = "md",
}: SuporteCtaProps) {
  return (
    <a
      href={supportDownload.href}
      className={cn(ctaVariants({ variant, size }), className)}
    >
      <Download aria-hidden="true" />
      {label}
    </a>
  );
}
