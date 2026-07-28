import type { LucideIcon } from "lucide-react";

export type ModuleCardProps = {
  name: string;
  description: string;
  icon: LucideIcon;
};

/**
 * Card compacto e sem link, usado nas grades de módulos e de características,
 * onde cada item é conteúdo em si, não um destino de navegação.
 */
export function ModuleCard({ name, description, icon: Icon }: ModuleCardProps) {
  return (
    <article className="flex h-full flex-col gap-3 rounded-2xl border border-hairline bg-surface p-6">
      <span className="flex size-10 items-center justify-center rounded-xl bg-secondary text-link">
        <Icon aria-hidden="true" className="size-5" />
      </span>

      <h3 className="font-display text-lg font-medium text-ink">{name}</h3>

      <p className="text-sm leading-relaxed text-ink-soft text-pretty">
        {description}
      </p>
    </article>
  );
}
